import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import razorpay from 'razorpay'
import Transaction from "../models/transactionModels.js";
import config from "../config/config.js";
// userController.js
// Job: Handles user actions (register, login)
// What it does:
// When someone registers: saves their info to database
// When someone logs in: checks if their password is correct
// Location: server/controllers/userController.js

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:'Missing Details'})
        }

        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return res.json({success:false, message:'Database not connected. Please try again later.'})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword
        }

        const newUser=new User(userData);
        const user=await newUser.save();

        const token =jwt.sign({id:user._id}, config.JWT_SECRET)
        res.json({success:true, token, user : {name:user.name}})
    }
    catch(error){

        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const LoginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.json({success:false, message:'User Does not exist'})
        }

        const isMatch= await bcrypt.compare(password,user.password)

        if(isMatch){
             const token =jwt.sign({id:user._id}, config.JWT_SECRET)
             res.json({success:true, token, user : {name:user.name}})
        }else{
            return res.json({success:false, message:'Invalid Credentials'})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// This function receives a userId in the request body, finds the user in the database,
//  and returns the user's credit balance and name. It is used to check how many credits
//  a user has left.->userCredits function below one 
const userCredits=async(req,res)=>{
    try {
        const {userId}=req.body;
        const user=await User.findById(userId)
        res.json({success:true, credits:user.creditBalance, user:{name:user.name}})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// Create Razorpay instance only when needed
const getRazorpayInstance = () => {
    if (!config.RAZORPAY_KEY_ID || !config.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file');
    }
    return new razorpay({
        key_id: config.RAZORPAY_KEY_ID,
        key_secret: config.RAZORPAY_KEY_SECRET
    });
};

const paymentRazorpay= async(req,res)=>{
    try {
        const {userId,planId}=req.body;
        const userData=await User.findById(userId)
        if(!userData || !planId){
            return res.json({success:false,message:'Missing Details'})
        }
        let credits,plan,amount,date  

        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;
        
            default:
                return res.json({success:false,message:'plan not found'});
        } 
        
        date=Date.now();

        const transactionData={
            userId,plan,amount,credits,date
        }
        const newTransaction =await Transaction.create(transactionData)


        // Ensure currency is a valid 3-letter ISO code; default to INR
        let currency = (config.CURRENCY || 'INR').toString().trim().toUpperCase();
        if (!/^[A-Z]{3}$/.test(currency)) {
            console.warn('Invalid currency in config.CURRENCY:', config.CURRENCY, '→ falling back to INR');
            currency = 'INR';
        }

        const options={
            amount: amount*100,
            currency,
            receipt: newTransaction._id,

        }
        const razorpayInstance = getRazorpayInstance();
        await razorpayInstance.orders.create(options , (error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error})
            }
            res.json({success:true, order})
    }) // working of above function razorpayinstance.orders.create
//         It asks Razorpay to create an order using options
//          (amount, currency, receipt).
// If Razorpay returns an error:
// Logs the error and sends { success: false, message: error }
//  back to the frontend.
// If it succeeds:
// Sends { success: true, order } (which includes order.id,
// amount, currency) back to the frontend so the Checkout 
// can open.

//==why order is created 
// To lock payment details: The order fixes amount and currency 
// on Razorpay’s side (can’t be tampered with by the client).
// It gives Razorpay a fixed amount and currency for this purchase.
// It returns an order.id needed to open the Razorpay payment popup.
// It links the payment to your DB record via receipt, so you can 
// verify and credit the right user after payment.

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay=async(req,res)=>{
    try {
        const {razorpay_order_id}=req.body;

        const razorpayInstance = getRazorpayInstance();
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status==='paid'){
            const transactionData=await Transaction.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false,message:'Payment Failed'})
            }
            
            const userData=await User.findById(transactionData.userId)

            const creditBalance=userData.creditBalance+transactionData.credits

            await User.findByIdAndUpdate(userData._id,{creditBalance})
            await Transaction.findByIdAndUpdate(transactionData._id,{payment:true})

            res.json({success:true, message:"Credits Added"})
        }else{
            res.json({success:false, message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {registerUser, LoginUser, userCredits, paymentRazorpay, verifyRazorpay}