import React, { useEffect, useRef } from 'react'
import OrderCard from '../../components/OrderCard'
import PayementForm from '../../components/forms/PayementForm'
import Header from '../../components/Header'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Delivery = () => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()

  useEffect(() => {
    console.log('delivery page')

    console.log('Session.user : ', session?.user)
    console.log('Status : ', status)
  }, [status, session])

  if (
    status === 'authenticated'  ) {
    return (
      <div className=' bg-gray-100 relative p-2 overflow-x-scroll'>
        <Header hideSearch={true} />
        <div className='mt-14 lg:mt-16 flex flex-col lg:flex-row'>
          <PayementForm />
          <OrderCard />
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-between p-8 items-center h-screen'>
        <p className='text-4xl mb-2'>Loading...</p>
        <Link href='/client/auth/signin' passHref>
          <p>
            Vous devrez peut-être vous connecter à votre compte,
            <a className='text-amber-500 hover:underline hover:cursor-pointer'>
              S&apos;identifier?
            </a>
          </p>
        </Link>
      </div>
    )
  }
}

export default Delivery
