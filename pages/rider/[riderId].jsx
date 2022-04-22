import React, { useEffect } from 'react'
import * as Realm from 'realm-web'
import Rider from '../../components/rider/Rider'
import Footer from '../../components/Footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const RiderId = ({ rider, orders }) => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()
  
  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      if (!isUser) router.push('/rider/auth/signin')
    }
    redirectIfNotAuthenticated()
  }, [isUser])

  return (
    <div className='overflow-x-hidden'>
      <div>
        <Rider rider={rider} orders={orders} />
        <Footer />
      </div>
    </div>
  )
}

export default RiderId

export async function getStaticProps(context) {
  const { params } = context
  // const response = await fetch(
  //   `https://zino-products-api.herokuapp.com/products/${params.productId}`
  // )
  // const data = await response.json()

  const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()

  let rider = {}
  let orders = []

  try {
    const user = await app.logIn(credentials)

    //fetching the rider informations
    rider = await user.functions.getSingleRider(params.riderId)

    //fetching the orders that coresponds to the rider
    orders = await user.functions.getOrdersByRegion(rider.region)
  } catch (error) {
    console.warn(error)
  }

  return {
    props: { rider, orders },
  }
}

export async function getStaticPaths() {
  const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let riders = []
  try {
    const user = await app.logIn(credentials)
    riders = await user.functions.getAllRiders()
  } catch (error) {
    console.error(error)
  }

  //const response = await fetch(
  //  `https://zino-products-api.herokuapp.com/products`
  //)
  //const data = await response.json()
  const paths = riders.map(({ id }) => {
    return {
      params: {
        riderId: String(id),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
