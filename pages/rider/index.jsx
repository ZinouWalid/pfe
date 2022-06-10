import React, { useEffect, useState } from 'react'
const Rider = dynamic(() => import('../../components/rider/Rider'))
const Footer = dynamic(() => import('../../components/Footer'))
import Link from 'next/link'
import { getCookie } from '../../lib/useCookie'
import { useStateValue } from '../../React-Context-Api/context'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const RiderId = ({}) => {
  const [riderSession, setRiderSession] = useState({})
  //getting the rider session from redux
  const [{ rider }, dispatch] = useStateValue()

  useEffect(() => {
    console.log('-------- /rider page --------')
    setRiderSession(getCookie('riderSession'))
  }, [rider])

  if (riderSession?.provider === 'rider-provider') {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='overflow-x-hidden '
      >
        <div>
          <Rider />
          <Footer />
        </div>
      </motion.div>
    )
  } else {
    return (
      <div className='flex flex-col justify-between p-8 items-center h-screen'>
        <p className='text-4xl mb-2'>
          Vous n&apos;êtes pas authentifié avec succès.
        </p>
        <Link href='/rider/auth/signin' passHref>
          <p>
            Veuillez vous authentifier à nouveau,
            <a className='text-amber-500 hover:underline hover:cursor-pointer ml-[4px]'>
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
