import React from 'react'
import SignIn from '../../../components/Login/client/SignIn'
import { getCsrfToken, signOut, useSession } from 'next-auth/react'
import Header from '../../../components/Header'

const signin = ({ csrfToken }) => {
  return (
    <div className='py-2 bg-gray-100 min-h-screen min-w-screen bg-register-background  bg-no-repeat bg-cover'>
      <SignIn csrfToken={csrfToken} />
    </div>
  )
}

export default signin

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
