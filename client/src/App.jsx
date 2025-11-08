import React, { useContext } from 'react'
import './index.css'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';




const App = () => {

  const {showLogin}=useContext(AppContext);
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-5- to-orange-50'>
      <ToastContainer position='bottom-right'/>
<NavBar/>
 {showLogin && <Login/> } 
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/result" element={<Result/>}/>
  <Route path="/buy" element={<BuyCredit/>}/>
</Routes>
<Footer/>
    </div>
  )
}

export default App