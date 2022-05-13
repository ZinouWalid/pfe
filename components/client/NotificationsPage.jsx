import React, { useEffect, useState } from 'react'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

const NotificationsPage = ({ notifications }) => {
  const [myNotifications, setMyNotifications] = useState(notifications)
  const router = useRouter()

  useEffect(() => {
    console.log('Notifications : ', notifications)
    setMyNotifications(notifications)
  }, [notifications])

  const timeDiff = (date) => {
    const MS_PER_DAY = 1000 * 3600 * 24
    const date_now = new Date().getTime()
    const date_order = new Date(date).getTime()
    // get total seconds between the times
    let delta = Math.abs(date_now - date_order) / 1000

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400)
    delta -= days * 86400

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60
    delta -= minutes * 60

    // what's left is seconds
    const seconds = Math.floor(delta % 60)
    if (days) return 'il ya ' + days + ' jours'
    if (hours) return 'il ya ' + hours + ' heures'
    if (minutes) return 'il ya ' + minutes + ' minutes'
    return days + '-' + hours + '-' + minutes + '-' + seconds
  }

  return (
    <div className='bg-gray-100 p-1 min-h-screen mt-16'>
      <button
        className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </button>
      <h1 className='font-semibold text-3xl mt-14 mb-2 ml-4'>
        Notifications :
      </h1>
      {myNotifications.map((notification, idx) => (
        <div
          key={notification.id || idx}
          className='bg-white px-4 py-3 rounded-lg shadow-md max-w-full'
        >
          <div className='flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer'>
            <div className='flex items-center'>
              <DeliveryDiningIcon className='h-24 w-24 rounded-full' />
            </div>
            <div className='ml-3'>
              <span className='font-semibold text-sm capitalize'>
                {notification?.riderName}
              </span>
              <p className='text-sm'>
                {notification?.riderName} a accepté de livrer votre commande
              </p>
              <p className='text-xs text-gray-500'>
                {timeDiff(notification.date)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationsPage
