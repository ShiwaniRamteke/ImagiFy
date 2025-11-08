import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {

    const [state, setstate] = useState('Sign Up');
    const {setshowLogin,backendUrl,setToken,setUser,loadCreditsData}=useContext(AppContext);
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');

    const onSubmitHandler=async(e)=>{

        e.preventDefault();

        try {
            console.log('Backend URL:', backendUrl);
            if(state=='Login'){
              console.log('Attempting login with:', {email: Email, password: Password});
              const {data} = await axios.post(backendUrl+'/api/user/login', {email: Email, password: Password});
              if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token',data.token)
                setshowLogin(false)
                toast.success('Login successful!')
              }else{
                toast.error(data.message || 'Login failed')
              }
            }else{
                console.log('Attempting registration with:', {name: Name, email: Email, password: Password});
                const {data} = await axios.post(backendUrl+'/api/user/register', {name: Name, email: Email, password: Password});
              if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token',data.token)
                setshowLogin(false)
                toast.success('Account created successfully!')
              }else{
                toast.error(data.message || 'Registration failed')
              }
            }
        } catch (error) {
             console.error('API Error:', error);
             console.error('Error response:', error.response);
             toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

   useEffect(() => {
     document.body.style.overflow='hidden'
   
     return () => {
       document.body.style.overflow='unset';
     }
   }, [])
   

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

<motion.form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'
initial={{opacity:0.2,y:50}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.3}}>

   <h1 className=' text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
   <p className='text-sm text-center mt-2'>Welcome! please {state} to continue</p>
   
   {state !=='Login' && 
   <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
         <img className='w-6 h-6' src={assets.profile_icon} alt="" />
    <input onChange={e=>setName(e.target.value)} value={Name} type="text" className='outline-none text-sm ' placeholder='Full Name' required />
   </div>
 
   }

    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-6'>
         <img className='w-6' src={assets.email_icon} alt="" />
    <input onChange={e=>setEmail(e.target.value)} value={Email}  type="email" className='outline-none text-sm ' placeholder='Email Id' required />
   </div>

   <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-6'>
         <img className='w-6 h-5' src={assets.lock_icon} alt="" />
    <input  onChange={e=>setPassword(e.target.value)} value={Password} type="password" className='outline-none text-sm ' placeholder='Password' required />
   </div>

   <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
   <button className='bg-blue-600 text-white py-2 rounded-full w-full'>
    {state==='Login'? 'Login' :'Create Account'}</button>

{state ==='Login' ? <p className='mt-5 text-center'>Don't have an account?
    <span className='text-blue-600 cursor-pointer' onClick={()=>{
        setstate('Sign Up')
    }}>SignUp</span></p>

    : 

<p className='mt-5 text-center'>Already have an account?
    <span className='text-blue-600 cursor-pointer'
    onClick={()=>{
        setstate('Login')
    }}
    >Login</span></p>
 }

    <img onClick={()=>{
        setshowLogin(false)
    }} 
         src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
</motion.form>
    </div>
  )
}

export default Login