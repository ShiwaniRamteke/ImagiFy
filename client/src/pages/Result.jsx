import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react';
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext';

const Result = () => {

const [image,Setimage] = useState(assets.sample_img_1);
const [isImageLoaded, setisImageLoaded] = useState(false);
const [loading, setloading] =useState(false);
const [input, setinput] = useState('');
const {generateImage}= useContext(AppContext);

const onSubmitHandler=async (e)=>{
e.preventDefault()
setloading(true)
if(input){
  const image=await generateImage(input)
  if(image){
    setisImageLoaded(true)
    Setimage(image)
  }
  // If no image returned, it could be due to error or no credits
  // The navigation to buy page will happen automatically in the context
}
setloading(false)
}

  return (
    <motion.form  onSubmit= {onSubmitHandler} 
    className='flex flex-col min-h-[90vh] justify-center items-center'
    initial={{opacity:0,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
    <div>
      <div className='relative'>
        <img className='max-w-sm rounded mb-4' src={image} alt="" />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
        ${loading ? 'w-full transition-all duration-[10s]': 'w-0'}`}></span>
      </div>
       <p className={!loading ? 'hidden' : ''}>Loading....</p>
    </div>


{!isImageLoaded && 
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 rounded-full'>

      <input
      onChange={e=>{
        setinput(e.target.value);
      }} value={input}
       type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none
      ml-8 max-sm:w-20 placeholder-color' />
      <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white ' 
      type='submit'>Generate</button>
    </div>
 }
 { isImageLoaded &&

    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-5 rounded-full'>
      <p onClick={()=>{
        setisImageLoaded(false)
      }} className='bg-transparent border borderzinc-900 text-black 
      px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a  href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
 }
    </motion.form>
  )
}

export default Result