import mongoose, { mongo } from "mongoose";

// userModel.js
// Job: Defines what a transion model looks like in the database
// What it does: Creates a "template" for user data (name, email, password, credits)
// Location: server/models/userModel.js

const transactionSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    plan:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    payment:{
        type:Boolean,
        default:false
    },
    date:{
        type:Number,
        
    },


})

const Transaction=mongoose.models.Transaction || mongoose.model("Transaction",transactionSchema);

export default Transaction;