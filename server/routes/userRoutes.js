import express from 'express'
import {registerUser,LoginUser, userCredits, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

// userRoutes.js
// Job: Creates the web addresses (URLs) for user actions
// What it does:
// /api/user/register → goes to registration function
// /api/user/login → goes to login function
// Location: server/routes/userRoutes.js

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
userRouter.post('/verify-razor',verifyRazorpay)



export default userRouter;

//http://localhost:4000/api/user/registerUser
//localhost : 4000/api/user/LoginUser



