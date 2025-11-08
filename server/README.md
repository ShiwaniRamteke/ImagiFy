# AI Image Generator Server

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=4000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ai_image_generator

# Razorpay Configuration (Required for payment functionality)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Currency Configuration
CURRENCY=INR
```

### 3. Get Razorpay Credentials
To get your Razorpay credentials:
1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Settings > API Keys
3. Generate a new key pair
4. Copy the Key ID and Key Secret to your `.env` file

### 4. Start the Server
```bash
npm run server
```

## Notes
- The server will start even without Razorpay credentials, but payment functionality will not work
- Make sure MongoDB is running if you're using a local database
- For production, use a strong JWT_SECRET and secure MongoDB connection string 