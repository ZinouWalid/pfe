import React, { useEffect, useRef } from 'react'
import OrderCard from '../../components/OrderCard'
import PayementForm from '../../components/forms/PayementForm'
import Header from '../../components/Header'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Delivery = () => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()

  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      if (!session?.user) router.push('/client/auth/signin')
    }
    redirectIfNotAuthenticated()
    // //cleanup function
    
  }, [isUser])

  return (
    <div className=' bg-gray-100 relative p-2 overflow-x-scroll'>
      <Header hideSearch={true} />
      <div className='mt-14 lg:mt-16 flex flex-col lg:flex-row'>
        <PayementForm />
        <OrderCard />
      </div>
    </div>
  )
}

export default Delivery
