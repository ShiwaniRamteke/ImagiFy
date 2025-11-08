
import React, { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
export const AppContext = createContext();
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const [token,setToken]=useState(localStorage.getItem('token'));
  const [credit, setcredit] = useState(0)
  const navigate=useNavigate();

//   why all the data and function are stored in 
//   react context api what is its reason tell in very short 
//   Avoid prop drilling: Share user, token, credit, and actions across 
//   many components without passing props down multiple levels.
// Single source of truth: Central place to manage auth state, credits,
//  and API calls.
// Consistency + reuse: Same functions (loadCreditsData, generateImage,
//    logout) used anywhere, keeping logic DRY.


  const loadCreditsData =async ()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/credits',{
        headers: {token}
      })

      if(data.success){
        setcredit(data.credits);
        setUser(data.user)
        console.log('Credits loaded:', data.credits);
        // If credits are 0, navigate to buy page
        if(data.credits === 0){
          console.log('Credits are 0, navigating to buy page');
          navigate('/buy')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
      setToken(null)
      setUser(null)
    }
  }  

  const generateImage=async(prompt)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/image/generate-image',{prompt},{
        headers: {token}
      })
      if(data.success){
        loadCreditsData();
        return data.resultImage
      }else{
        toast.error(data.message)
        console.log('Image generation failed:', data);
        // Check if it's a credit balance issue and navigate to buy page
        if(data.creditBalance === 0){
          console.log('Credit balance is 0, navigating to buy page');
          navigate('/buy')
        }
        return null
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(error.response?.data?.message || error.message)
      loadCreditsData();
      if(error.response?.data?.creditBalance===0){
        navigate('/buy')
      }
      return null
    }
  }
  useEffect (()=>{
    if(token){
      loadCreditsData();
    }
  },[token])

  const logout=()=>{
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setcredit(0);
  }

  const value={
    user,setUser,showLogin,setshowLogin,backendUrl,
    token,setToken,credit, setcredit,loadCreditsData,logout,generateImage
  } // or false

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;