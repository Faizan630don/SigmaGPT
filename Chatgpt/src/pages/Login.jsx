import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const { setToken, axios } = useAppContext()
  const [state, setState] = useState("login")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = state === "login" ? '/api/user/login' : '/api/user/register'
    const payload = state === "login" ? { email, password } : { name, email, password }

    try {
      const { data } = await axios.post(url, payload)

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        navigate('/')
      } else {
        toast.error(data.message || "Something went wrong")
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Network Error"
      toast.error(errorMsg)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
      <p className="text-2xl font-medium m-auto">
        <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
      </p>
      <p className="text-sm m-auto mb-4">{state === "login" ? "Welcome back! Please login to continue" : "Create an account to get started"}</p>

      {state === 'Sign Up' && (
        <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-200 bg-transparent pl-5 focus-within:border-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-gray-400">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <input
            placeholder="Full Name"
            className="h-full w-full bg-transparent text-sm placeholder-gray-400 outline-none text-gray-700"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-200 bg-transparent pl-5 focus-within:border-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-gray-400">
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        </svg>
        <input
          placeholder="Email id"
          className="h-full w-full bg-transparent text-sm placeholder-gray-400 outline-none text-gray-700"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-200 bg-transparent pl-5 focus-within:border-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock text-gray-400">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <input
          placeholder="Password"
          className="h-full w-full bg-transparent text-sm placeholder-gray-400 outline-none text-gray-700"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>



      <button type="submit" className="mt-4 h-11 w-full cursor-pointer rounded-full bg-linear-to-b from-purple-600 to-purple-800 text-white transition hover:from-gray-700 hover:to-gray-900">
        {state === "login" ? "Login" : "Create account"}
      </button>

      {state === "login" ? (
        <p className="mt-4 text-center text-sm">
          Don't have an account? <span onClick={() => setState('Sign Up')} className="text-purple-700 cursor-pointer underline">Sign up</span>
        </p>
      ) : (
        <p className="mt-4 text-center text-sm">
          Already have an account? <span onClick={() => setState('login')} className="text-purple-700 cursor-pointer underline">Login</span>
        </p>
      )}
    </form>
  )
}

export default Login
