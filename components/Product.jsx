import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import { useStateValue } from '../React-Context-Api/context'
import {
  addToBasket,
  removeFromBasket,
} from '../React-Context-Api/Actions/basketActions'
import Link from 'next/link'
import { updateQuantity } from '../React-Context-Api/Actions/productsActions'
import CurrencyFormat from 'react-currency-format'

function Product({ product }) {
  const { id, img, name, price, rating, promotion } = { ...product }
  const [{}, dispatch] = useStateValue()
  const [showButton, setShowButton] = useState(false)
  const [showQuantity, setShowQuantity] = useState(false)
  const [quantity, setQuantity] = useState(1)

  //increase quantity function
  function increaseQuantity() {
    setQuantity(quantity + 1)
  }

  //increase quantity function
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    } else {
      setQuantity(0)
      setShowQuantity(false)
      setShowButton(true)
      return dispatch(removeFromBasket(id))
    }
  }
  //Update the product quantity when it changes
  useEffect(() => {
    dispatch(updateQuantity({ ...product, tags: [], quantity }))
  }, [quantity])

  return (
    <div
      className='hover:scale-101 box-border flex rounded bg-white p-5 shadow-xl transition duration-300 hover:bg-gray-100 md:flex-col md:justify-evenly'
      onMouseEnter={(e) => {
        !showQuantity && setShowButton(true)
      }}
      onMouseLeave={(e) => {
        setShowButton(false)
      }}
    >
      <Link href={`/client/products/${id}`} passHref>
        <a>
          <img
            src={img}
            alt=''
            className='mr-2 h-80 object-contain hover:cursor-pointer'
          />
        </a>
      </Link>
      <div className='flex flex-col'>
        <p>{name}</p>
        <Rating
          name='read-only'
          value={parseInt(rating?.split(' ')[0]) || 2.5}
          precision={0.1}
          readOnly
        />
        {/* <p className='text-gray-700'>{price}</p> */}
        {promotion?.split('%')[0] <= 0 ? (
          <CurrencyFormat
            renderText={(value) => (
              <span className='text-gray-700 mt-2'>{value + ' '}DA</span>
            )}
            decimalScale={2}
            value={price}
            displayType={'text'}
            thousandSeparator={true}
          />
        ) : (
          // <span className='text-gray-700 mt-2'>{price}</span>
          <div className='flex flex-col '>
            <CurrencyFormat
              renderText={(value) => (
                <span className='font-medium text-gray-900 '>
                  {value + ' '}DA
                </span>
              )}
              decimalScale={2}
              value={
                parseInt(price) -
                (parseInt(price) * parseInt(promotion?.split('%')[0])) / 100
              }
              displayType={'text'}
              thousandSeparator={true}
            />

            <span className='flex items-center font-medium text-xs mt-2'>
              <p className='text-gray-500 line-through  '>{price}</p>
              <p className='bg-amber-300 rounded font-bold ml-2 py-[2px] px-[3px] text-amber-700'>
                - {promotion}
              </p>
            </span>
          </div>
        )}

        {/* show the button if the quantity is 0 or showButton = true */}
        {showButton && (
          <button
            className='mt-5 rounded border border-amber-500 bg-amber-300 p-1 text-sm hover:border-amber-600 hover:bg-amber-500'
            onClick={() => {
              setShowQuantity(true)
              dispatch(addToBasket({ ...product, tags: [], quantity }))
            }}
          >
            Ajouter au Panier
          </button>
        )}
        {showQuantity && (
          <div className='mt-6 h-10 w-32'>
            <div className='relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent'>
              {/* Decrease Button */}
              <button
                className='h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-amber-500 hover:text-gray-700'
                onClick={decreaseQuantity}
              >
                <span className='m-auto text-2xl font-thin'>−</span>
              </button>
              <input
                type='number'
                className='text-md flex w-full items-center bg-gray-300 p-2 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
              {/* Increase Button */}
              <button
                className='h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-amber-500 hover:text-gray-700'
                onClick={increaseQuantity}
              >
                <span className='m-auto text-2xl font-thin'>+</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
