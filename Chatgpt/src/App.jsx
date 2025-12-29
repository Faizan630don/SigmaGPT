import React, { useState } from 'react'
import { Routes, Route} from 'react-router-dom';
import { assets } from './assets/assets';
import ChatBox from './components/ChatBox'; 
import Sidebar from './components/Sidebar';
import Signup from './pages/Signup';
import Credits from './pages/Credits';
import Community from './pages/Community';
import Login from './pages/Login';
import './assets/prism.css';
import path from 'path';
import Loading from './pages/Loading';
import {useLocation} from 'react-router-dom';
import { useAppContext } from './context/AppContext';

const App = () => {

  const {user} = useAppContext();



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} = useLocation()

  if(pathname === '/loading')
    return <Loading/>

  return (
    <>
    {!isMenuOpen && (
      <img
        src={assets.menu_icon}
        className='fixed top-5 left-3 cursor-pointer w-8 h-8 md:hidden not-dark:invert z-30'
        alt='Open menu'
        onClick={()=> setIsMenuOpen(true)}
      />
    )}

    {user ? (
       <div  className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white not-dark:bg-gradient-to-b not-dark:from-[#f5f7ff] not-dark:to-white not-dark:text-gray-900'>
       <div  className='flex h-screen w-screen'>
       <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
       {isMenuOpen && (
         <div
           className='fixed inset-0 bg-black/40 md:hidden z-10'
           onClick={()=> setIsMenuOpen(false)}
           aria-hidden='true'
         />
       )}
       <Routes>
           <Route path='/' element={<ChatBox/>} />
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/credit' element={<Credits/>}/>
           <Route path='/community' element={<Community/>}/>
 
       </Routes>
     </div>
     </div>
    ) : (
      <div className='bg-gradient-to-b from-[#242124] to-[#000000] text-white flex justify-center items-center h-screen w-screen'>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='*' element={<Login/>}/>
        </Routes>
      </div>
    )}
   
    
    </>
  )
}

export default App
