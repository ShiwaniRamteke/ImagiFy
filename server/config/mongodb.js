import mongoose from "mongoose";
import config from "./config.js";

// mongodb.js
// Job: Connects your app to the database
// What it does: Like a phone call to MongoDB Atlas (your cloud database)
// Location: server/config/mongodb.js

const connectDB=async()=>{
    try {
        const mongoURI = config.MONGODB_URI;
        
        if (!mongoURI) {
            console.log("MONGODB_URI not found in environment variables");
            console.log("Server will continue without database connection");
            return;
        }

        mongoose.connection.on('connected',()=>{
            console.log("database connected")
        })

        await mongoose.connect(mongoURI)
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
        console.log("Server will continue without database connection")
    }
}
export default connectDB;

// const connectDB = async () => {
//     try {
//         mongoose.connection.once('connected', () => {
//             console.log("Database connected");
//         });

//         const mongoURI = process.env.MONGODB_URI ;
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     } catch (error) {
//         console.error("MongoDB connection error:", error.message);
//         process.exit(1);
//     }
// };

// export default connectDB;