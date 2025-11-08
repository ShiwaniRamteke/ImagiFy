import mongoose, { mongo } from "mongoose";

// userModel.js
// Job: Defines what a user looks like in the database
// What it does: Creates a "template" for user data (name, email, password, credits)
// Location: server/models/userModel.js

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,  
    },
    creditBalance:{
        type:Number,
        default:5,
    }
})

const User=mongoose.models.User || mongoose.model("User",userSchema);

export default User;