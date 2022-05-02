import React, { useEffect, useState } from 'react'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import CurrencyFormat from 'react-currency-format'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'

const NotificationsPage = ({ notifications }) => {
  const [myNotifications, setMyNotifications] = useState(notifications)

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
    const seconds = delta % 60

    return days + '-' + hours + '-' + minutes + '-' + seconds
  }

  return (
    <div className='bg-gray-100 p-1 min-h-screen mt-16'>
      <h1 className='font-semibold text-3xl'>Notifications :</h1>
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
              <p className='text-sm text-blue-600 font-semibold'>
                {/* {new Date(notification?.date)} */}
              </p>
            </div>
            <div className='text-blue-600'>
              <svg
                viewBox='0 0 8 8'
                fill='currentColor'
                className='h-4 w-4 text-blue'
              >
                <circle cx='4' cy='4' r='3'></circle>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationsPage
