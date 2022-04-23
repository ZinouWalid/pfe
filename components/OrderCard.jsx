import React, { useEffect, useState } from 'react'
import { removeFromBasket } from '../React-Context-Api/basketActions'
import { useStateValue } from '../React-Context-Api/context'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { getCookie } from '../lib/useCookie'
import Link from 'next/link'

const OrderCard = () => {
  const [{ basket }, dispatch] = useStateValue()
  const [myOrder, setMyOrder] = useState([])

  useEffect(() => {
    function updateBasket() {
      setMyOrder(getCookie('basket'))
    }
    updateBasket()
  }, [basket])

  return (
    <div className='flex flex-col items-center mx-auto max-h-96 h-fit bg-white border rounded py-5'>
      <h3 className='p-1 text-md'>
        <span className='uppercase'>votre commande</span> ({myOrder.length}{' '}
        articles)
      </h3>
      <div className='mx-auto w-full border-gray-300 border'></div>

      <div className='flex flex-col overflow-y-scroll p-2'>
        {myOrder.map(({ id, name, price, img, quantity }) => {
          return (
            <div className='flex flex-col items-start my-2' key={id}>
              {/* Image and Title + Name */}
              <div className='flex items-center'>
                <img src={img} alt='' className='h-8 object-contain mr-1' />
                <div>
                  <p className='title-font mb-1 text-xs text-gray-900 w-60'>
                    {name}
                  </p>
                  {/* Price */}
                  <p className='text-xs text-amber-500'>{price}</p>
                  {/* Delete Product and Quantity */}
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold text-xs'>Qté : {quantity}</p>
                    <button
                      className='rounded text-red-600 text-sm hover:border-red-700 hover:bg-gray-200 hover:rounded-full'
                      onClick={() => dispatch(removeFromBasket(id))}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className='mx-auto w-full border-gray-300 border'></div>

      <Link href={'/checkout'} passHref>
        <a className=' text-amber-400 uppercase my-2'>Retour au panier</a>
      </Link>
    </div>
  )
}

export default OrderCard
