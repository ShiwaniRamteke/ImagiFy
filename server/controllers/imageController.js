import User from "../models/userModel.js";
import FormData from 'form-data'
import axios from "axios"

// imageController.js:
// This file contains the logic for generating images using an external API. 
// When a user requests an image:
// It checks the user's ID and prompt (description for the image).
// It verifies the user exists and has enough credits.
// It sends the prompt to an external image generation API.
// It receives the generated image, converts it to a format the frontend can use, 
// and reduces the user's credits by one.
// It sends back the generated image and the updated credit balance.

export const generateImage=async(req,res)=>{
try {
    const {userId ,prompt}=req.body;

    const user=await User.findById(userId);
    if(!user || !prompt){
        return res.json({success:false, message:'Missing Details'})
    }
    if(user.creditBalance===0 || user.creditBalance <0){
        return res.json({success:false, message:'No Credit Balance', creditBalance:user.creditBalance})
    }
// niche ka code clipdrop website sai pura copy paste kiya h bs .env file
// sai api key copy ki h 
    const formData= new FormData()
    formData.append('prompt', prompt)
//     FormData is a built-in JavaScript object.
// It is used to create key–value pairs (like a small bag of data).
// new FormData() → creates an empty form data object.
// formData.append('prompt', prompt) → adds a key called 
// "prompt" and stores the value of the variable prompt in it.
// prompt = "whatever text is inside prompt"

    const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
        headers: {
        'x-api-key': process.env.CLIPDROP_API
        },
        responseType:'arraybuffer'
    })
    //THE above code from formdata to hear This code sends a prompt to the 
    // ClipDrop API, and gets back a generated image in binary format.

    const base64Image=Buffer.from(data,'binary').toString('base64')
    const resultImage=`data:image/png;base64,${base64Image}`
//     below is explaination of resultimage what it is doing 
//     Short answer: It builds a browser-friendly image URL from base64 data.
// base64Image is the raw image encoded as base64 text.
// The string ``data:image/png;base64,${base64Image}`` adds a data URL prefix:
// data: → data URL scheme
// image/png → MIME type
// base64 → encoding
// Result: resultImage can be directly used as an <img src={resultImage}>
//  without saving a file or hosting the image.

    await User.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

    res.json({success:true, message:"Image generated",
        creditBalance:user.creditBalance-1,
        resultImage
     })
} catch (error) {
    console.log(error.message);
    res.json({success:false, message:error.message})
}
}