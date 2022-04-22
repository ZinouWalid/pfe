import React, { useEffect, useState } from 'react'
import Subtotal from '../../components/Subtotal'
import CheckoutProduct from '../../components/CheckoutProduct'
import { getCookie } from '../../lib/useCookie'
import Header from '../../components/Header'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Checkout = () => {
  const [basket, setBasket] = useState([])
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()

  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      if (!isUser) router.push('/client/auth/signin')
    }
    redirectIfNotAuthenticated()
  }, [isUser])

  //Update our basket when ever the client make changes to the basket
  useEffect(() => {
    setBasket(getCookie('basket'))
    //--------------------------------------------------------------
  }, [basket])

  return (
    <div className='flex flex-col'>
      <Header hideSearch={true} />
      <div className='flex items-center justify-between mt-14 lg:mt-16 p-5 text-slate-900 sm:flex-row'>
        {/* Shoping cart */}
        <div className='m-3 flex h-32 w-3/5 flex-col justify-between'>
          <h1 className='text-xl font-semibold md:text-3xl'>Panier</h1>
          <div className='border-b border-gray-300'></div>
        </div>
        <Subtotal />
      </div>
      {basket?.map((product) => (
        <CheckoutProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Checkout
