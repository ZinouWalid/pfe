import React, { useEffect } from 'react'
import * as Realm from 'realm-web'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Orders = () => {
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
  return <div>Orders</div>
}

export default Orders
