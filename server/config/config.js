import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ quiet: true });

const config = {
    // Server Configuration
    PORT: process.env.PORT || 4000,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    
    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    
    // MongoDB Configuration
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_image_generator',
    
    // Razorpay Configuration
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    
    // Currency Configuration
    CURRENCY: process.env.CURRENCY || 'INR'
};

export default config; 