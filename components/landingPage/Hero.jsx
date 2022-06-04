import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/images/Hero_img.jpg'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from '../../lib/useCookie'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const Hero = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  //getting the rider session from cookies if they exists
  const [riderSession, setRiderSession] = useState({})

  useEffect(() => {
    console.log('-------- / page --------')
    setRiderSession(getCookie('riderSession'))
    console.log('Rider Session : ', riderSession)
  }, [status, session])

  return (
    <div className='max-w-screen-xl mt-22 px-8 xl:px-10 mx-auto' id='about'>
      <div className='grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-20 '>
        <div className=' flex flex-col justify-center items-start row-start-2 sm:row-start-1'>
          <h1 className='text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal'>
            Vous souhaitez que vos achats soient faciles et que la livraison
            soit rapide ?
          </h1>
          <p className='text-black-500 mt-4 mb-6'>
            avec <strong>9odyani</strong>, nous vous garantissons les meilleurs
            prix, vos achats seront faciles et la livraison rapide.
          </p>
          {/* ---Client and rider buttons */}
          <div className='mt-8 flex items-center justify-evenly w-full '>
            <Link href='/client' passHref>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.5 }}
                className='rounded bg-amber-400 px-6 py-3 text-slate-900 font-bold hover:bg-amber-500 '
              >
                Client
                <span className='mx-4'>
                  <AddShoppingCartIcon />
                </span>
              </motion.a>
            </Link>

            {/* we check if the rider is authenticated to see if we send him to the authentication page or directly to his profile */}
            <Link
              href={riderSession ? '/rider' : '/rider/auth/signin'}
              passHref
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.5 }}
                className='rounded bg-amber-400 px-6 py-3 text-slate-900 font-bold hover:bg-amber-500 '
              >
                livreur
                <span className='mx-4'>
                  <LocalShippingIcon />
                </span>
              </motion.a>
            </Link>
          </div>
        </div>
        <div className='flex w-full'>
          <div className='h-full w-full'>
            <Image
              src={HeroImg}
              alt='VPN Illustrasi'
              quality={100}
              width={612}
              height={583}
              layout='responsive'
              className='rounded'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
