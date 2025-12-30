import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext.js'
import moment from 'moment'
import { toast } from 'react-hot-toast'
const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {


  const { chats, setSelectedChat, theme, toggleTheme, createNewChat, user, axios, token, navigate, setUser, setChats, fetchUsersChats, setToken, } = useAppContext()
  const [search, setSearch] = useState('')

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()
      const confirm = window.confirm('Are you sure you want to delete this chat?')
      if (!confirm) return
      const { data } = await axios.post('/api/chat/delete', { chatId }, {
        headers: { Authorization: token }
      })
      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId))
        await fetchUsersChats()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleLogout = () => {

    localStorage.removeItem('token')
    navigate('/login')
    setUser(null)
    toast.success("Logged Out Successfully")
  }
  return (

    <div className={`fixed md:static top-0 left-0 h-screen w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 not-dark:bg-white/85 border-r not-dark:border-gray-200 border-[#80609F]/30 backdrop-blur-3xl transform transition-transform duration-300 z-20 flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer group'>
        <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-[#A456F7] to-[#3D81F6] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300'>
          <img src={assets.logo} alt="logo" className='w-6 invert' />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold dark:text-white leading-none tracking-tight'>SigmaGPT</h1>
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium mt-1'>Intelligent AI Assistant</p>
        </div>
      </div>

      {/* {New CHat Button  } */}
      <button onClick={createNewChat} className='flex items-center justify-center mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md w-full py-2 font-semibold cursor-pointer hover:scale-105 transition-transform duration-300'>
        <span className='mr-2 text-xl'>+</span>New Chat
      </button>
      {/* {Search Option} */}

      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
        <img src={assets.search_icon} className='w-4 not-dark:invert' alt='' />
        <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} className='bg-transparent outline-none' />
      </div>

      {/* {Chats List} */}
      {Array.isArray(chats) && chats.length > 0 && <p className='mt-4 text-sm font-semibold'> Recent Chats</p>}
      <div className='flex-1 overflow-y-auto mt-3 text-sm space-y-3 pr-2 scrollbar-thin'>
        {
          (Array.isArray(chats) ? chats : []).
            filter((chat) => {
              if (!search.trim()) return true
              const first = chat?.messages?.[0]?.content
              return first ? first.toLowerCase().includes(search.toLowerCase()) : false
            }).
            map((chat) => (
              <div onClick={() => { navigate('/'); setSelectedChat(chat); setIsMenuOpen(false) }} key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'>
                <div className='min-w-0'>
                  <p className='truncate w-full font-medium'>
                    {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                    {(() => {
                      const ts = chat.updatedAt || chat.createdAt || chat?.messages?.[chat.messages.length - 1]?.timestamp
                      return ts ? moment(ts).fromNow() : ''
                    })()}
                  </p>
                </div>
                <img onClick={(e) => deleteChat(e, chat._id)} src={assets.bin_icon} className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' alt="" />
              </div>
            ))
        }
      </div>

      {/* {Bottom Actions Container} */}
      <div className='mt-auto pt-4 space-y-3'>
        {/* {Communiity images} */}
        <div onClick={() => { navigate('/community'); setIsMenuOpen(false) }} className='flex items-center gap-2 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:scale-105'>
          <img src={assets.gallery_icon} className='w-4.5 not-dark:invert' alt='' />
          <div className='flex flex-col text-sm'>
            <p>Community Images</p>
          </div>
        </div>

        {/* {Credit Purchase Option} */}
        <div onClick={() => { navigate('/credit'); setIsMenuOpen(false) }} className='flex items-center gap-2 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:scale-105'>
          <img src={assets.diamond_icon} className='w-4.5 not-dark:invert' alt='' />
          <div className='flex flex-col text-sm'>
            <p>Credits : {user?.credits}</p>
            <p className='text-xs text-gray-500'>Purchase credits to use SigmaGPT</p>
          </div>
        </div>

        {/* {DArk Mode Toggle} */}
        <div className='flex items-center gap-2 p-3 border border-gray-400 dark:border-white/20 rounded-md justify-between'>
          <div className='flex items-center gap-2 text-sm'>
            <img src={assets.theme_icon} className='w-4 not-dark:invert' alt='' />
            <p>Dark Mode</p>
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input type='checkbox' className='sr-only peer' checked={theme === 'dark'} onChange={toggleTheme} />
            <div className='relative w-12 h-6 rounded-full bg-gray-500/40 dark:bg-white/10 border border-white/10 transition-colors peer-checked:bg-gray-700/60'>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-[#EDE9F8] shadow-md transition-transform duration-300 ring-1 ring-transparent ${theme === 'dark' ? 'translate-x-6 ring-purple-500' : ''}`}></span>
            </div>
          </label>
        </div>

        {/* User Account */}
        <div
          onClick={() => {
            if (user) {
              handleLogout()
            } else {
              navigate('/login')
              setIsMenuOpen(false)
            }
          }}
          className='flex items-center gap-2 p-3 border border-gray-300 dark:border-white/20 rounded-md cursor-pointer group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors'
        >
          <img src={assets.user_icon} className='w-7 rounded-full' alt='' />
          <p className='flex-1 text-sm dark:text-primary truncate font-medium'>
            {user ? user.name : 'Login your account'}
          </p>
          {user && (
            <img onClick={handleLogout}
              src={assets.logout_icon}
              className='h-5 cursor-pointer hidden group-hover:block not-dark:invert dark:invert-0'
              alt='Logout'
              title="Logout"
            />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <img
          src={assets.close_icon}
          className='absolute right-3 w-5 h-5 top-6 md:hidden cursor-pointer not-dark:invert'
          alt=''
          onClick={() => { setIsMenuOpen(false) }}
        />
      )}
    </div>


  )
}

export default Sidebar
