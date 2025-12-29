import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'



const ChatBox = () => {
  const { selectedChat, theme } = useAppContext()
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
  }

  const messages = selectedChat?.messages || []
  const showLoader = messages.length > 0 && messages[messages.length - 1]?.role === 'user'
  const loading = showLoader
  return (
    <div className='flex flex-col flex-1 m-5 md:m-10 xl:mask-x-to-30% max-md:mt-14 2xl:pr-40'>
      {/* Chat Mesages */}
      <div className='flex-1 mb-5 overflow-y-auto'>
        {messages.length === 0 ? (
          <div className='h-full flex items-center justify-center flex-col gap-2 text-primary'>
            <img src={theme === "dark" ? assets.logo_full : assets.logo_full_dark} alt='' className='w-full max-w-56 sm:max-w-68'/>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-700 dark:text-white'>Ask me anything</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}
        {/* Three dots Loading */}
        {showLoader && (
          <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>

            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>

            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
        )}
      </div>
      {mode === 'image' && (
        <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs'>Publish Genrated Image to Community</p>
          <input type="checkbox" className='cursor-pointer' checked={isPublished}
           onChange={(e)=>setIsPublished(e.target.checked)}/>
        </label>

        
      )}
      {/* Input Box */}
      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-white/10 border border-primary dark:border-white/15 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center mt-auto sticky bottom-6 backdrop-blur-sm'>
        <select onChange={(e)=>setMode(e.target.value)} value={mode}  className='text-sm pl-3 pr-2 outline-none dark:bg-transparent dark:text-white'>
          <option className='dark:bg-[#1E1E1E]' value="text">Text</option>
          <option className='dark:bg-[#1E1E1E]'  value="image">Image</option>
          </select>
        <input onChange={(e)=>setPrompt(e.target.value)}  value={prompt} type='text' placeholder='Type your Prompt here...' className='flex-1 w-full text-sm outline-none dark:bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400' required/>
        <button disabled={loading} >
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt=''/>
        </button>
      </form>
    </div>
  )

}

export default ChatBox
