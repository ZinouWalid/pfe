import React, { useEffect, useState } from 'react'
import Rider from '../../components/rider/Rider'
import Footer from '../../components/Footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { getCookie } from '../../lib/useCookie'

const RiderId = ({}) => {
  const { data: session, status } = useSession()
  const [riderSession, setRiderSession] = useState({})

  useEffect(() => {
    console.log('-------- / page --------')
    setRiderSession(getCookie('riderSession'))
    console.log('Rider Session : ', riderSession)
  }, [status, session])

  if (riderSession?.provider === 'rider-provider') {
    return (
      <div className='overflow-x-hidden'>
        <div>
          <Rider />
          <Footer />
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-between p-8 items-center h-screen'>
        <p className='text-4xl mb-2'>Loading...</p>
        <Link href='/rider/auth/signin' passHref>
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

export default RiderId

//export async function getStaticProps(context) {
//  const { params } = context
//  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
//  const app = new Realm.App({ id: REALM_APP_ID })
//  const credentials = Realm.Credentials.anonymous()
//
//  let rider = {}
//  let orders = []
//
//  try {
//    const user = await app.logIn(credentials)
//
//    //fetching the rider informations
//    rider = await user.functions.getSingleRider(params.riderId)
//
//    //fetching the orders that coresponds to the rider
//    orders = await user.functions.getAllOrders(rider?.region)
//  } catch (error) {
//    console.warn(error)
//  }
//
//  return {
//    props: { rider, orders },
//  }
//}
//
//export async function getStaticPaths() {
//  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
//  const app = new Realm.App({ id: REALM_APP_ID })
//  const credentials = Realm.Credentials.anonymous()
//  let riders = []
//  try {
//    const user = await app.logIn(credentials)
//    riders = await user.functions.getAllRiders()
//  } catch (error) {
//    console.error(error)
//  }
//
//  const paths = riders.map(({ id }) => {
//    return {
//      params: {
//        riderId: String(id),
//      },
//    }
//  })
//
//  return {
//    paths,
//    fallback: false,
//  }
//}
//
