import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'
import Loading from './Loading'
import { assets } from '../assets/assets'

const Community = () => {
  const { axios, token } = useAppContext()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPublishedImages = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user/published', {
        headers: { Authorization: token }
      })
      if (data.success) {
        setImages(data.images)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchPublishedImages()
    }
  }, [token])

  if (loading) return <Loading />

  return (
    <div className='flex flex-col min-h-screen p-5 md:p-10 overflow-hidden'>
      <div className='flex-1 flex flex-col justify-start w-full max-w-full overflow-y-auto'>
        <div className='flex items-center justify-between mb-8 mt-10 md:mt-0'>
          <h1 className='text-3xl font-bold dark:text-white tracking-tight'>Community <span className='bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent'>Gallery</span></h1>
          <button onClick={fetchPublishedImages} className='p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors flex items-center gap-2 text-sm text-gray-500'>
            <span className='hidden sm:inline'>Refresh</span>
            <img src={assets.refresh_icon || assets.search_icon} className='w-5 dark:invert opacity-70' alt="Refresh" />
          </button>
        </div>

        {images.length === 0 ? (
          <div className='flex-1 flex flex-col items-center justify-center gap-4 opacity-60'>
            <img src={assets.gallery_icon} className='w-20 dark:invert opacity-20' alt="" />
            <p className='text-gray-500 text-lg font-medium'>No images published yet.</p>
            <p className='text-sm text-gray-400'>Generated images will appear here if "Publish" is checked.</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full pb-10'>
            {images.map((item, idx) => (
              <div
                key={idx}
                className='group relative rounded-2xl overflow-hidden border not-dark:border-gray-200 dark:border-white/10 bg-white dark:bg-[#1E1E1E] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2'
              >
                <div className='relative aspect-square w-full overflow-hidden'>
                  <img
                    src={item.imageUrl}
                    alt={item.prompt || 'Community image'}
                    className='w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110'
                  />

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] text-white font-bold'>
                        {item.userName.charAt(0).toUpperCase()}
                      </div>
                      <p className='text-white font-semibold text-sm truncate'>@{item.userName}</p>
                    </div>

                    <p className='text-gray-200 text-xs line-clamp-3 italic leading-relaxed'>
                      "{item.prompt || "AI Generated Masterpiece"}"
                    </p>

                    <div className='mt-3 flex justify-between items-center opacity-60'>
                      <span className='text-[9px] text-gray-400'>SigmaGPT AI</span>
                      <img src={assets.logo} className='w-3 opacity-50 invert' alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Community
