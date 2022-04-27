import React, { useEffect, useState } from 'react'
import * as Realm from 'realm-web'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OrdersPage from '../../components/client/OrdersPage'

const Notifications = () => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()
  const [orders, setOrders] = useState([])

  //redirect the user if he's not authenticated to the signin page
  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      if (!isUser) router.push('/client/auth/signin')
    }
    redirectIfNotAuthenticated()
  }, [])

  //fetches the realm object from the server for the client orders
  useEffect(() => {
    const fetchOrders = async () => {
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new Realm.App({ id: REALM_APP_ID })
      const credentials = Realm.Credentials.anonymous()
      let ords = []
      try {
        const user = await app.logIn(credentials)
        ords = await user.functions.getClientOrders(
          //You can pass the user id here instead of the session.user.email
          session?.user.id
        )

        setOrders(ords)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrders()
    console.log(session?.user.name + ' orders : ' + orders)
  }, [])

  return (
    <div>
      <Header hideSearch={true} />
      <OrdersPage orders={orders} />
      <Footer />
    </div>
  )
}

export default Notifications

//export async function getStaticProps(context) {
//  //getting URL params
//  //fetching products by category
//  //const response = await fetch(
//  //  `https://zino-products-api.herokuapp.com/products?category=${params.categoryId}`
//  //)
//  //const products = await response.json()
//  console.log('Notification Session : ', session)
//  const REALM_APP_ID = process.env.REALM_APP_ID
//  const app = new Realm.App({ id: REALM_APP_ID })
//  const credentials = Realm.Credentials.anonymous()
//  let notifications = []
//  try {
//    const user = await app.logIn(credentials)
//    notifications = await user.functions.getClientNotifications(session.user.id)
//  } catch (error) {
//    console.error(error)
//  }
//
//  return {
//    props: { notifications },
//  }
//}
//
