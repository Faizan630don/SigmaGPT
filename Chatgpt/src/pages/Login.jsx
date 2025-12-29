import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { dummyUserData } from '../assets/assets'

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useAppContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoadingSocial, setIsLoadingSocial] = useState(false)

  const handleSocialLogin = async (provider) => {
    setError('')
    setIsLoadingSocial(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In a real app, this would redirect to OAuth provider or use their SDK
      // For demo purposes, we'll create a user with social provider info
      const socialUser = {
        _id: Date.now().toString(),
        name: provider === 'google' ? 'Google User' : provider === 'twitter' ? 'Twitter User' : 'Facebook User',
        email: `${provider}@example.com`,
        provider: provider,
        credits: 200,
      }

      setUser(socialUser)
      localStorage.setItem('user', JSON.stringify(socialUser))
      navigate('/')
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`)
      setIsLoadingSocial(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Simulate API call - In a real app, this would be an API request
    // For now, we'll use dummyUserData for demo purposes
    // In production, you'd validate against a backend API
    
    // Simple validation (for demo - email should match dummyUserData.email)
    // In real app, password would be hashed and compared on backend
    if (email === dummyUserData.email) {
      // Success - set user and navigate
      const loggedInUser = {
        ...dummyUserData,
        name: name.trim() || dummyUserData.name
      }
      setUser(loggedInUser)
      
      // Save to localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(loggedInUser))
      }
      
      navigate('/')
    } else {
      // For demo purposes, accept any name/email/password combination
      // In production, this would be validated against backend
      const loggedInUser = {
        _id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password, // In production, this would be hashed
        credits: 200,
      }
      setUser(loggedInUser)
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(loggedInUser))
      }
      
      navigate('/')
    }
  }
     
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center max-w-96">
            <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>
            <p className="mt-3 text-sm text-gray-500/90">Welcome back! Please sign in to continue</p>
            <div className="mt-10 mb-2 grid w-full grid-cols-3 gap-6">
                <button 
                  type="button" 
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoadingSocial}
                  className="flex items-center justify-center rounded-full border border-gray-200 dark:border-white/20 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 focus:border-gray-300 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sign in with Google"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_8755_1278)">
                            <path d="M12 9.81836V14.4656H18.4582C18.1746 15.9602 17.3236 17.2257 16.0472 18.0766L19.9417 21.0984C22.2108 19.0039 23.5199 15.9276 23.5199 12.273C23.5199 11.4221 23.4436 10.6039 23.3017 9.81849L12 9.81836Z" fill="#4285F4" />
                            <path d="M5.27657 14.2842L4.3982 14.9566L1.28906 17.3783C3.2636 21.2947 7.31058 24.0002 12.0014 24.0002C15.2414 24.0002 17.9577 22.9311 19.9432 21.0984L16.0487 18.0765C14.9796 18.7965 13.6159 19.2329 12.0014 19.2329C8.88146 19.2329 6.23063 17.1275 5.28147 14.2911L5.27657 14.2842Z" fill="#34A853" />
                            <path d="M1.28718 6.62207C0.469042 8.23655 0 10.0584 0 12.0002C0 13.942 0.469042 15.7638 1.28718 17.3783C1.28718 17.3891 5.27997 14.2801 5.27997 14.2801C5.03998 13.5601 4.89812 12.7965 4.89812 12.0001C4.89812 11.2036 5.03998 10.44 5.27997 9.72L1.28718 6.62207Z" fill="#FBBC05" />
                            <path d="M12.0017 4.77818C13.769 4.77818 15.3399 5.38907 16.5944 6.56727L20.0307 3.13095C17.9471 1.18917 15.2417 0 12.0017 0C7.31082 0 3.2636 2.69454 1.28906 6.62183L5.28174 9.72001C6.23077 6.88362 8.88171 4.77818 12.0017 4.77818Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_8755_1278">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <button 
                  type="button" 
                  onClick={() => handleSocialLogin('twitter')}
                  disabled={isLoadingSocial}
                  className="flex items-center justify-center rounded-full border border-gray-200 dark:border-white/20 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 focus:border-gray-300 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sign in with Twitter/X"
                >
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_8755_1275)">
                            <path d="M16.7855 1.9043H19.8757L13.1245 10.3278L21.0667 21.7903H14.848L9.9773 14.8383L4.40409 21.7903H1.31202L8.53308 12.7804L0.914062 1.9043H7.29065L11.6934 8.25863L16.7855 1.9043ZM15.7009 19.7711H17.4132L6.36022 3.81743H4.52273L15.7009 19.7711Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_8755_1275">
                                <rect width="21.9847" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <button 
                  type="button" 
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoadingSocial}
                  className="flex items-center justify-center rounded-full border border-gray-200 dark:border-white/20 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 focus:border-gray-300 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sign in with Facebook"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_8755_1272)">
                            <path d="M24 12C24 5.37264 18.6274 0 12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12H24Z" fill="#0866FF" />
                            <path d="M16.6988 15.6672L17.3722 12H13.4525V10.703C13.4525 8.76526 14.2128 8.01982 16.1804 8.01982C16.7914 8.01982 17.2834 8.0347 17.5666 8.06446V4.74046C17.03 4.59118 15.7181 4.44238 14.9578 4.44238C10.9479 4.44238 9.0994 6.3355 9.0994 10.4198V12H6.625V15.6672H9.0994V23.6467C10.0277 23.8771 10.9988 24 11.9981 24C12.4901 24 12.9754 23.9697 13.452 23.9121V15.6672H16.6983H16.6988Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_8755_1272">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
            <div className="my-5 flex w-full items-center gap-4">
                <div className="h-px w-full bg-purple-600 dark:bg-purple-400"></div>
                <p className="w-full text-sm text-nowrap text-gray-500/90 dark:text-gray-400">or sign in with email</p>
                <div className="h-px w-full bg-purple-600 dark:bg-purple-400"></div>
            </div>
            {isLoadingSocial && (
              <div className="w-full p-3 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-md">
                Signing in with social provider...
              </div>
            )}
            {/* Name Input */}
            <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-200 dark:border-white/20 bg-transparent pl-5 focus-within:border-gray-300 dark:focus-within:border-white/40 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-gray-400" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                    placeholder="Full Name"
                    className="h-full w-full bg-transparent text-sm placeholder-gray-400 dark:placeholder-gray-500 dark:text-white outline-none"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            {/* Email Input */}
            <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-200 dark:border-white/20 bg-transparent pl-5 focus-within:border-gray-300 dark:focus-within:border-white/40 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-gray-400" aria-hidden="true" >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
                <input
                    placeholder="Email id"
                    className="h-full w-full bg-transparent text-sm placeholder-gray-400 dark:placeholder-gray-500 dark:text-white outline-none"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {/* Password Input */}
            <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-200 dark:border-white/20 bg-transparent pl-5 focus-within:border-gray-300 dark:focus-within:border-white/40 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock text-gray-400" aria-hidden="true" >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                    placeholder="Password"
                    className="h-full w-full bg-transparent text-sm placeholder-gray-400 dark:placeholder-gray-500 dark:text-white outline-none"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mt-8 flex w-full items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                    <input 
                        className="peer hidden" 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="relative flex size-4.5 items-center justify-center rounded border border-slate-300 peer-checked:border-gray-800 peer-checked:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check size-3 text-white" aria-hidden="true" >
                            <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                    </span>
                    <span className="text-gray-500 select-none">Remember me</span>
                </label>
                <Link to="#" className="text-gray-800 underline">
                    Forgot password?
                </Link>
            </div>
            {error && (
                <div className="mt-4 w-full p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md">
                    {error}
                </div>
            )}
            <button type="submit" className="mt-8 h-11 w-full cursor-pointer rounded-full bg-linear-to-b from-purple-600 to-purple-800 text-white transition hover:from-gray-700 hover:to-gray-900" >
                Login
            </button>
            <p className="mt-4 text-gray-500/90">
                Don't have an account?
                <Link to="/signup" className="text-gray-800 underline ml-1">
                    Sign up
                </Link>
            </p>
        </form>
  )
}

export default Login
