import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const ProfilePage = ({ rider }) => {
  return (
    <section className='pt-12 600'>
      <h1 className='text-4xl font-semibold leading-normal mb-2 capitalize text-left'>
        Mon Profile :
      </h1>
      <div className='w-full lg:w-4/12 px-4 mx-auto '>
        <div className='border relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-12'>
          <div className='px-6'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full px-4 flex justify-center'>
                <div className=''>
                  <AccountCircleIcon className='text-9xl text-gray-500' />
                </div>
              </div>
              <div className='w-full px-4 text-center mt-12'>
                <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block tracking-wide '>
                      {rider.orders?.length || 0}
                    </span>
                    <span className='text-sm'>Commandes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center mt-8'>
              <h3 className='text-xl font-semibold leading-normal mb-2 text-blueGray-700 capitalize'>
                {rider?.name}
              </h3>
              <div className='text-sm leading-normal mt-0 mb-2  font-bold uppercase'>
                <LocationOnIcon className='text-gray-500' />
                <i className='mr-2 text-lg '></i>
                Algérie, {rider.region.split(' - ')[1]}
              </div>
            </div>
            <div className='mt-10 py-10 border-t'>
              <div className='flex flex-wrap '>
                <div className='w-full lg:w-9/12 px-4'>
                  <h3 className='text-xl font-semibold leading-normal mb-4 capitalize text-left'>
                    contacts :
                  </h3>
                  <div className='text-sm leading-normal mt-0 mb-2 flex items-center'>
                    <EmailIcon className='text-gray-500' />{' '}
                    <i className='text-gray-500 mx-2 font-bold'> : </i>
                    {rider.email}
                  </div>
                  <div className='text-sm leading-normal mt-0 mb-2 flex items-center'>
                    <PhoneIcon className='text-gray-500' />{' '}
                    <i className='text-gray-500 mx-2 font-bold'> : </i>
                    {rider.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
            <button
              className='flex mx-auto mb-4 bg-red-200 text-red-500 p-2 rounded hover:bg-red-300 hover:border border-red-900 box-border uppercase'
              onClick={() => signOut({callbackUrl:'/rider/auth/signin'})}
            >
              déconnecter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
