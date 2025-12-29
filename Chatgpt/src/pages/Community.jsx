import React from 'react'
import { dummyPublishedImages } from '../assets/assets'

const Community = () => {
  return (
    <div className='flex flex-col min-h-screen p-5 md:p-10 overflow-hidden'>
      <div className='flex-1 flex flex-col justify-end w-full max-w-full'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
          {dummyPublishedImages.map((item, idx) => (
            <div 
              key={idx} 
              className='group relative rounded-md overflow-hidden border not-dark:border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 dark:hover:border-primary/30'
            >
              <div className='relative w-full h-40 overflow-hidden'>
                <img 
                  src={item.imageUrl} 
                  alt={item.userName || 'Community image'} 
                  className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                  <p className='text-xs text-white font-medium'>{item.userName}</p>
                </div>
              </div>
              <div className='p-2 text-xs text-gray-600 dark:text-[#B1A6C0] group-hover:hidden transition-opacity duration-300'>
                {item.userName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
