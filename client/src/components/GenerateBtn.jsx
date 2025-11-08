import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
  const {user,setshowLogin}=useContext(AppContext);

  const navigate=useNavigate();
  const onClickHandler=()=>{
    if(user){
      navigate('/result');
   }else{
    setshowLogin(true);
   }

  }

  return (
    <motion.div className='pb-16 text-center'
    initial={{opacity:0,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 *
        font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>

        <motion.button className='inline-flex items-center gap-2 px-12 mt-0
        py-3 rounded-full bg-black text-white m-auto hover:scale-105 
        transition-all duration-500 cursor-pointer'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        animate={{opacity:1}}
        transition={{default:{duration:0.5},
        opacity:{
          delay:0.8,duration:1
        }}} onClick={onClickHandler}>Generate Images
            <img  className='h-6' src={assets.star_group} alt="" />
        </motion.button>
    </motion.div>
  )
}

export default GenerateBtn