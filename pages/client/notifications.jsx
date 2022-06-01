import React, { useEffect, useState } from 'react'
import { App, Credentials } from 'realm-web'
import { useRouter } from 'next/router'
import Link from 'next/link'
const NotificationsPage = dynamic(() =>
  import('../../components/client/NotificationsPage')
)
const Header = dynamic(() => import('../../components/Header'))
import { useStateValue } from '../../React-Context-Api/context'
import { getCookie } from '../../lib/useCookie'
import dynamic from 'next/dynamic'

const Notifications = () => {
  const [user, setUser] = useState({})
  const [{ client }, dispatch] = useStateValue()

  const router = useRouter()
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    console.log('-------- client notifications page --------')
    setUser(getCookie('clientSession'))
  }, [client])
  //getting the user notifications

  useEffect(() => {
    //fetches the realm object from the server for the client notifications
    const fetchNotifications = async () => {
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new App({ id: REALM_APP_ID })
      const credentials = Credentials.anonymous()
      let notifs = []
      try {
        const realm = await app.logIn(credentials)
        notifs = await realm.functions.getClientNotifications(user?.id)
        setNotifications(notifs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNotifications()
  }, [user])

  if (user.provider == 'client-provider') {
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
