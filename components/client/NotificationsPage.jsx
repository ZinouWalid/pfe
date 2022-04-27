import React, { useState } from 'react'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import CurrencyFormat from 'react-currency-format'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const NotificationsPage = ({ notifications }) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className='bg-gray-100 p-1 min-h-screen mt-16'>
      {notifications.map((notification, idx) => (
        <div
          key={idx}
          className='bg-white px-4 py-3 rounded-lg shadow-md max-w-full'
        >
          <div className='flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer'>
            <div className='flex flex-shrink-0 items-end'>
              <img
                className='h-16 w-16 rounded-full'
                src='https://drive.google.com/uc?id=1mNQj7dO9Y_2pe8HEljojHm9iLmt6iHvh'
              />
              <img
                className='w-6 h-6 -ml-5'
                src='https://drive.google.com/uc?id=1jAh9mzCA6TIsDj06NMMxcVjqvwEshlvu'
                alt=''
              />
            </div>
            <div className='ml-3'>
              <span className='font-semibold text-sm'>John Doe</span>
              <p className='text-sm'>Jean a accepté de livrer votre commande</p>
              <span className='text-sm text-blue-600 font-semibold'>
                a few seconds ago
              </span>
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
