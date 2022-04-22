import React, { useState } from 'react'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import CurrencyFormat from 'react-currency-format'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const OrdersPage = ({ orders }) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className='w-full max-w-screen p-4 text-gray-800 bg-white rounded-lg shadow dark:bg-gray-100 dark:text-gray-800'
          role='alert'
        >
          <div className='flex'>
            <PersonPinCircleIcon className='w-8 h-8 rounded-full shadow-lg' />

            <div className='ml-3 text-sm font-normal'>
              {/* -----------Nom et Prénom----------- */}
              <span className='text-sm font-semibold text-gray-900 dark:text-gray-800'>
                <p className='capitalize mb-2'>
                  {order.firstName} {order.lastName}
                </p>
              </span>
              {/* -----------Adresse----------- */}
              <p className='mb-1 text-sm font-normal'>
                Adresse : {order.address}
              </p>

              {/* -----------Cité----------- */}
              <p className='mb-1 text-sm font-normal'>Cité : {order.city}</p>

              {/* -----------Num telephone----------- */}
              <p className='mb-1 text-sm font-normal'>
                Numéro de téléphone : {'0' + order.phoneNumber}
              </p>

              {/* -----------Montant----------- */}
              <p className='mb-1 text-sm font-normal'>
                <CurrencyFormat
                  renderText={(value) => (
                    <div className=' flex flex-col'>
                      <p className='mb-1 text-sm font-normal text-red-600'>
                        Montant : {value} DA
                      </p>
                    </div>
                  )}
                  decimalScale={2}
                  value={order.totalAmount - 20 || 0} // Part of the homework
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </p>

              {/* -----------Votre paiment----------- */}
              <p className='mb-1 text-sm font-normal text-green-600'>
                Coûts de livraison : 20 DA
              </p>

              {/* -----------Produits----------- */}

              <button
                className='flex items-center  py-1.5 text-sm font-normal text-center text-gray-900 transition duration-200 ease-in-out '
                onClick={() => setShowMore(!showMore)}
              >
                Produits
                <p className='ml-4 hover:bg-gray-300 rounded-full'>
                  {showMore ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )}
                </p>
              </button>

              {showMore && (
                <div className='flex flex-col items-center mx-auto max-h-96 h-fit py-5'>
                  <div className='flex flex-col overflow-y-scroll p-2'>
                    {order.products?.map(
                      ({ id, name, price, img, quantity }) => {
                        return (
                          <div
                            className='flex flex-col items-start my-2'
                            key={id}
                          >
                            {/* Image and Title + Name */}
                            <div className='flex items-center'>
                              <img
                                src={img}
                                alt=''
                                className='h-8 object-contain mr-1'
                              />
                              <div>
                                <p className='title-font mb-1 text-xs text-gray-900 w-60'>
                                  {name}
                                </p>
                                {/* Price */}
                                <p className='text-xs text-amber-500'>
                                  {price}
                                </p>
                                {/* Delete Product and Quantity */}
                                <div className='flex items-center justify-between'>
                                  <p className='font-semibold text-xs'>
                                    Qté : {quantity}
                                  </p>
                                  <CurrencyFormat
                                    renderText={(value) => (
                                      <div className=' flex flex-col'>
                                        <p className='mb-1 text-sm font-normal'>
                                          ( Total :{value} DA )
                                        </p>
                                      </div>
                                    )}
                                    decimalScale={2}
                                    value={
                                      parseInt(quantity) * parseInt(price) || 0
                                    } // Part of the homework
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                  <p></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              )}
              <button className='mt-4 py-1.5 text-base bg-green-400 p-2 rounded-lg font-normal text-center text-gray-900 uppercase hover:bg-green-500 '>
                accepter la commande
              </button>
            </div>
            <button
              type='button'
              className='ml-auto text-gray-400 rounded-full p-1 hover:bg-gray-300 h-8 w-8 '
              title='Fermer'
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersPage
