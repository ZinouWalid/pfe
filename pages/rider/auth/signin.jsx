import { getCsrfToken } from 'next-auth/react'
import React from 'react'
import SignIn from '../../../components/Login/rider/SignIn'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Signin = ({ csrfToken }) => {
  const router = useRouter()

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-2 bg-gray-100 min-h-screen min-w-screen bg-register-background  bg-no-repeat bg-cover'
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

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
