import React, { useState } from 'react'
import Header from '../Header'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsPage from './NotificationsPage'
import ProfilePage from './ProfilePage'
const Rider = ({ rider, orders }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  return (
    <div className='w-screen p-2'>
      <Header hideSearch={true} hideBasket={true} />
      <nav className='bg-white '>
        {/* <Navbar orders={orders} /> */}
        <div className='flex justify-around items-center h-20 rounded bg-gray-200 mb-4 transition duration-300 ease-in-out mt-14 lg:mt-16'>

          {/* -------------Notifications----------- */}
          <button
            className={`mx-auto relative border-b-2 border-transparent h-full text-gray-800 hover:text-gray-400 hover:bg-gray-300 transition duration-200 ease-in-out  ${
              showNotifications && 'border-slate-800'
            }`}
            title='Notifications'
            onClick={() => {
              setShowProfile(false)
              setShowNotifications(true)
            }}
          >
            <NotificationsIcon className='text-gray-500 text-4xl hover:cursor-pointer hover:bg-slate-300 rounded-full p-1' />
            {orders.length >= 0 && (
              <span className='absolute text-center inset-y-2 inset-x-3 object-right-top -mr-6 '>
                <div className='items-center mx-auto px-1 py-0.5 border-2 border-white rounded-full text-xs font-semibold bg-red-500 text-white'>
                  {orders.length}
                </div>
              </span>
            )}
          </button>

          <div className='my-auto h-full border border-gray-300'></div>

          {/* ------------Profile----------- */}
          <button
            className={`mx-auto h-full border-b-2  border-transparent hover:bg-gray-300 transition duration-200 ease-in-out ${
              showProfile && 'border-slate-800'
            }`}
            onClick={() => {
              setShowNotifications(false)
              setShowProfile(true)
            }}
            title='Profile'
          >
            <AccountCircleIcon
              className='text-gray-500 text-4xl p-1  hover:cursor-pointer hover:bg-slate-300 rounded-full  hover:scale-105'
              titleAccess='Profile'
            />
          </button>
        </div>
      </nav>
      {showNotifications && <NotificationsPage orders={orders} />}
      {showProfile && <ProfilePage rider={rider} />}
    </div>
  )
}

export default Rider
