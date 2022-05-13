import React, { useEffect, useState } from 'react'
import * as Realm from 'realm-web'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NotificationsPage from '../../components/client/NotificationsPage'
import Header from '../../components/Header'

const Notifications = () => {
  const { data: session, status } = useSession()
  const isUser = session?.user
  const router = useRouter()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {}, [status, session])

  //fetches the realm object from the server for the client notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new Realm.App({ id: REALM_APP_ID })
      const credentials = Realm.Credentials.anonymous()
      let notifs = []
      try {
        const user = await app.logIn(credentials)
        notifs = await user.functions.getClientNotifications(session?.user.id)

        setNotifications(notifs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNotifications()
  }, [status])

  console.log(session?.user.id, ' notifications : ', notifications)

  if (status === 'authenticated') {
    return (
      <div>
        <Header hideSearch={true} />
        <NotificationsPage notifications={notifications} />
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

export default Notifications
