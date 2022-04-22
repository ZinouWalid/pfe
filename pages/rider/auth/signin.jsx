import { getCsrfToken } from 'next-auth/react'
import React from 'react'
import SignIn from '../../../components/Login/rider/SignIn'

const signin = ({ csrfToken }) => {
  return (
    <div className='py-2 bg-gray-100 min-h-screen min-w-screen bg-register-background  bg-no-repeat bg-cover'>
      <SignIn csrfToken={csrfToken} />
    </div>
  )
}

export default signin

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
