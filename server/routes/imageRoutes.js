import express from 'express'
import {generateImage} from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter=express.Router()

imageRouter.post('/generate-image',userAuth,generateImage);

export default imageRouter

// imageRoutes.js:
// This file defines the API route for image generation:
// It creates a POST route at /api/image/generate-image.
// It uses the auth middleware to make sure only logged-in users can access this route.
// When a request comes in, it calls the function in imageController.js to handle 
// the image generation process.