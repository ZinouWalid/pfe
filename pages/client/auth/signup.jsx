import React from 'react'
import SignUp from '../../../components/Login/client/SignUp'
import { motion } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

const Signup = () => {
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
      <SignUp />
    </motion.div>
  )
}

export default Signup
