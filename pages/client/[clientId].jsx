import React, { useEffect } from 'react'
import * as Realm from 'realm-web'
import Client from '../../components/client/Client'
import Footer from '../../components/Footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const CiderId = ({ rider, orders }) => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()

  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      if (!isUser) router.push('/client/auth/signin')
    }
    redirectIfNotAuthenticated()
  }, [isUser])

  return (
    <div className='overflow-x-hidden'>
      <div>
        <Client rider={rider} orders={orders} />
        <Footer />
      </div>
    </div>
  )
}

export default CiderId

export async function getStaticProps(context) {
  const { params } = context
  // const response = await fetch(
  //   `https://zino-products-api.herokuapp.com/products/${params.productId}`
  // )
  // const data = await response.json()

  const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()

  let client = {}
  let orders = []
  let notifications = []

  try {
    const user = await app.logIn(credentials)

    //fetching the client informations
    client = await user.functions.getSingleClient(params.clientId)

    //fetching the orders that coresponds to the client
    orders = await user.functions.getClientOrders(params.clientId)

    //fetching the notifications that coresponds to the client
    notifications = await user.functions.getClientNotifications(params.clientId)
  } catch (error) {
    console.warn(error)
  }

  return {
    props: { client, orders, notifications },
  }
}

export async function getStaticPaths() {
  const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let clients = []
  try {
    const user = await app.logIn(credentials)
    clients = await user.functions.getAllClients()
    console.log('clients : ', clients)
  } catch (error) {
    console.error(error)
  }

  //const response = await fetch(
  //  `https://zino-products-api.herokuapp.com/products`
  //)
  //const data = await response.json()
  const paths = clients.map(({ id }) => {
    return {
      params: {
        clientId: String(id),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
