import React, { useEffect } from 'react'
import * as Realm from 'realm-web'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Notifications = () => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()

  useEffect(() => {
    //redirect the user if he's not authenticated to the signin page
    const redirectIfNotAuthenticated = () => {
      if (!isUser) router.push('/client/auth/signin')
    }
    redirectIfNotAuthenticated()
  }, [isUser])

  return <div>Notifications</div>
}

export default Notifications

export async function getStaticProps(context) {
  //getting URL params
  const session = await getSession(context)
  //fetching products by category
  //const response = await fetch(
  //  `https://zino-products-api.herokuapp.com/products?category=${params.categoryId}`
  //)
  //const products = await response.json()
  console.log('Notification Session : ', session)
  const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let notifications = []
  try {
    const user = await app.logIn(credentials)
    notifications = await user.functions.getClientNotifications(session.user.id)
  } catch (error) {
    console.error(error)
  }

  return {
    props: { notifications },
  }
}
