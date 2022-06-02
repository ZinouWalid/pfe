import React, { useEffect, useState } from 'react'
import Header from '../Header'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import OrdersPage from './OrdersPage'
import ProfilePage from './ProfilePage'
import DeliveriesPage from './DeliveriesPage'
import { App, Credentials } from 'realm-web'
import { getCookie } from '../../lib/useCookie'

const Rider = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showDeliveries, setShowDeliveries] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  const [rider, setRider] = useState(getCookie('riderSession'))
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new App({ id: REALM_APP_ID })
      const credentials = Credentials.anonymous()

      try {
        const user = await app.logIn(credentials)

        //fetching the myRider informations
        await user.functions.getSingleRider(rider.id).then(async (rider) => {
          setRider(rider)
        })

        //fetching the orders that coresponds to the rider region
        await user.functions.getAllOrders(rider?.region).then((orders) => {
          setOrders(orders)
        })
      } catch (error) {
        console.warn(error)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className='w-screen p-2 overflow-x-hidden'>
      <Header hideSearch={true} hideBasket={true} hideOptions={true} />

      <nav className='bg-white '>
        <div className='flex justify-around items-center h-20 rounded bg-gray-200 mb-4 transition duration-300 ease-in-out mt-14 lg:mt-16'>
          {/* -------------Notifications----------- */}
          <button
            className={`mx-auto relative border-b-2 border-transparent h-full text-gray-800 hover:text-gray-400 hover:bg-gray-300 transition duration-200 ease-in-out  ${
              showNotifications && 'border-slate-800'
            }`}
            title='Notifications'
            onClick={() => {
              setShowProfile(false)
              setShowDeliveries(false)
              setShowNotifications(true)
            }}
          >
            <NotificationsIcon className='text-gray-500 text-4xl hover:cursor-pointer hover:bg-slate-300 rounded-full p-1' />
            {orders?.length > 0 && (
              <span className='absolute text-center inset-y-2 inset-x-3 object-right-top -mr-6 '>
                <div className='items-center mx-auto px-1 py-0.5 border-2 border-white rounded-full text-xs font-semibold bg-red-500 text-white'>
                  {orders?.length}
                </div>
              </span>
            )}
          </button>

          <div className='my-auto h-full border border-gray-300'></div>

          {/* -------------Orders----------- */}
          <button
            className={`mx-auto h-full border-b-2  border-transparent hover:bg-gray-300 transition duration-200 ease-in-out ${
              showDeliveries && 'border-slate-800'
            }`}
            onClick={() => {
              setShowNotifications(false)
              setShowProfile(false)
              setShowDeliveries(true)
            }}
            title='Profile'
          >
            <InventoryIcon
              className='text-gray-500 text-4xl p-1  hover:cursor-pointer hover:bg-slate-300 rounded-full  hover:scale-105'
              titleAccess='Mes commandes'
            />
          </button>

          <div className='my-auto h-full border border-gray-300'></div>

          {/* ------------Profile----------- */}
          <button
            className={`mx-auto h-full border-b-2  border-transparent hover:bg-gray-300 transition duration-200 ease-in-out ${
              showProfile && 'border-slate-800'
            }`}
            onClick={() => {
              setShowNotifications(false)
              setShowDeliveries(false)
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
      {showNotifications && <OrdersPage rider={rider} orders={orders} />}
      {showProfile && <ProfilePage rider={rider} />}
      {showDeliveries && (
        <DeliveriesPage rider={rider} deliveries={rider?.orders} />
      )}
    </div>
  )
}

export default Rider
