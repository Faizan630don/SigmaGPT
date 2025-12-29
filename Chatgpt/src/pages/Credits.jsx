import React, { useState, useEffect } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading';

const Credits = () => {

  const [ plans, setPlans] = useState([])
  const [ loading, setLoading ] = useState(true)

  const fetchPlans = async () => {
    setPlans(dummyPlans)
    setLoading(false)
  }
  useEffect(() => {  
    fetchPlans()
  },[])

  if(loading) return <Loading/>
  return (
    <div className='maz-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6
    lg:px-8 py-12'>
      <h2 className='mt-20 text-3xl font-semibold text-center mb-10xl:mt-30
      text-gray-800 dark:text-white'>Credit Plans</h2>
      <div className='flex flex-wrap justify-center gap-8 mt-10'>
        {plans.map((plan)=>(
          <div key={plan._id} className={`border border-gray-200
          dark:border-purple-700 rounded-lg shadow hover-shadow-lg 
          transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === "pro" ?
            "bg-purple-50 dark:bg-purple-900" : "bg-white dark:bg-transparent " }`}>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white
                mb-2'>{plan.name}</h3>
                <p className='text-2xl font-bold text-purple-600 dark:text-purple-300
                mb-4'>${plan.price }
                <span className='text-base font-normal text-gray-600
                dark:text-purple-200'>{' '}/ {plan.credits} credits</span>
                </p>
                <ul className='list-disc list-inside space-y-1 text-sm text-gray-700
                dark:text-purple-200 '>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
            </div>
            <button className='w-full bg-purple-600 text-white py-2.5 rounded-md mt-5
            hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500
            transition duration-300 ease-in-out transform active:scale-95 disabled:bg-gray-400
            disabled:hover:bg-gray-400 disabled:focus:ring-gray-400' onClick={()=>{}}>Buy Now</button>
        
      </div>
    
  ))}
  </div>
  </div>
)}
export default Credits;
