import React from 'react'
import SignIn from '../../../components/Login/client/SignIn'
import { getCsrfToken } from 'next-auth/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const Signin = ({ csrfToken }) => {
  const router = useRouter()
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-2  min-h-screen min-w-screen bg-register-background  bg-no-repeat bg-cover'
    >
      <button
        className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </button>
      <SignIn csrfToken={csrfToken} />
    </motion.div>
  )
}

export default Signin

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
