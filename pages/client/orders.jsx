import React, { useEffect, useState } from 'react'
import * as Realm from 'realm-web'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OrdersPage from '../../components/client/OrdersPage'
import { getCookie } from '../../lib/useCookie'
import { useStateValue } from '../../React-Context-Api/context'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState({})
  const [{ client }, dispatch] = useStateValue()

  useEffect(() => {
    console.log('-------- client orders page --------')
    setUser(getCookie('clientSession'))
  }, [client])
  
  console.log('client orders  : ', user)
  
  //fetches the realm object from the server for the client orders
  useEffect(() => {
    const fetchOrders = async () => {
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new Realm.App({ id: REALM_APP_ID })
      const credentials = Realm.Credentials.anonymous()
      let ords = []
      try {
        const realm = await app.logIn(credentials)

        //You can pass the user id here instead of the session.user.email
        ords = await realm.functions.getClientOrders(user.id)
        setOrders(ords)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrders()
    console.log(user.name + ' orders : ' + orders)
  }, [user])

  console.log('orders : ', orders)

  if (user.provider == 'client-provider') {
    return (
      <div>
        <Header hideSearch={true} />
        <OrdersPage orders={orders} />
        <Footer />
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

export default Orders
