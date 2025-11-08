import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

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
    <motion.div className='flex flex-col justify-center items-center text-center my-10'
    initial={{opacity:0.2 ,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>

        <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-whitw px-6 py-1 rounded-full
        border border-neutral-500'
        initial={{opacity:0.2 ,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.8,delay:0.2}}>
            <p className='text-xl'>Best text to image generator</p>
            <img src={assets.star_icon}/>
        </motion.div>

        <motion.h1 className='text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] 
        mx-auto mt-4 text-center'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4,duration:2}}>
        Turn text to <span className='text-blue-600'>image</span>, in seconds.</motion.h1>

        <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.6,duration:0.8}}>Unleash your creativity with AI.Turn your imagination 
                into visual art in seconds- and watch the magic happen. </motion.p>

        <motion.button className='sm:text-lg text-white bg-black w-auto mt-6 px-6 py-1 flex 
        items-center gap-2 rounded-full cursor-pointer'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        animate={{opacity:1}}
        transition={{default:{duration:0.5},
        opacity:{
          delay:0.8,duration:1
        }}}  onClick={onClickHandler}>Generate Images
          <img className='w-10' src={assets.star_group}/>
        </motion.button>

        {/*//genrate images button k nichhe jo images h vo iske vajh sai dikh raha h 8 */}

        <motion.div className='flex flex-wrap justify-center mt-10 gap-3'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1, duration:1}}>  
       {Array(6).fill("").map((items,index)=>(
        <motion.img className='rounded hoever:scale-105 transition-all duration-300 cursor-pointer max-sm:w-15'
        whileHover={{scale:1.05,duration:0.1}}
        src={index%2 ===0 ? assets.sample_img_2 : assets.sample_img_1} alt="" key={index} width={70}/>
       ))}
        </motion.div>
       
       <motion.p className='mt-4 text-neutral-600'
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{delay:1.2,duration:0.8}}>Genrated images from IamagiFy</motion.p>
    </motion.div>
  )
}
export default Header;