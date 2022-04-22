import React, { useEffect, useState } from 'react'
import { useStateValue } from '../React-Context-Api/context'
import Rating from '@mui/material/Rating'
import {
  removeFromBasket,
  addToBasket,
} from '../React-Context-Api/basketActions'
import { updateQuantity } from '../React-Context-Api/productsActions'

const ProductInfo = ({ product }) => {
  const [{}, dispatch] = useStateValue()
  const { id, img, name, price, rating,productQuantity } = { ...product }
  const [showButton, setShowButton] = useState(true)
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
      setShowButton(false)
      setShowQuantity(true)
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
    <section className='min-h-screen overflow-hidden bg-gray-100 text-gray-700'>
      <div className='container mx-auto px-5 py-20'>
        <div className='mx-auto flex flex-wrap lg:w-4/5'>
          <img
            alt='ecommerce'
            className='w-full rounded border border-gray-200 object-cover object-center lg:w-1/2'
            src={img}
          />
          <div className='mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10'>
            <h2 className='title-font text-sm tracking-widest text-gray-500'>
              {name?.split(' ')[0]}
            </h2>
            <h1 className='title-font mb-1 text-3xl font-medium text-gray-900'>
              {name}
            </h1>
            <div className='mb-4 flex'>
              <span className='flex items-center'>
                <Rating
                  name='read-only'
                  value={rating?.split(' ')[0] || 2.5}
                  precision={0.5}
                  readOnly
                />
                <span className='ml-3 text-gray-600'>{rating}</span>
              </span>
              <span className='ml-3 flex border-l-2 border-gray-200 py-2 pl-3'>
                <a
                  className='text-gray-500 hover:cursor-pointer'
                  title='facebook'
                >
                  <svg
                    fill='currentColor'
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                  </svg>
                </a>
                <a
                  className='ml-2 text-gray-500 hover:cursor-pointer'
                  title='twitter'
                >
                  <svg
                    fill='currentColor'
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                  </svg>
                </a>
                <a
                  className='ml-2 text-gray-500 hover:cursor-pointer'
                  title='whatsapp'
                >
                  <svg
                    fill='currentColor'
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className='leading-relaxed'>
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <div className='mt-6 mb-5 border-b-2 border-gray-200'></div>
            <div className='flex justify-between items-center'>
              <span className='title-font text-2xl font-medium text-gray-900'>
                {price}
              </span>

              {/* Add to basket button */}
              {showButton && (
                <button
                  className='ml-auto flex rounded border-0 bg-amber-500 py-2 px-6 text-white hover:bg-amber-600 focus:outline-none'
                  onClick={() => {
                    setShowQuantity(true)
                    setShowButton(false)
                    dispatch(addToBasket(product))
                  }}
                >
                  Ajouter au panier
                </button>
              )}

              {/* Quantity */}
              {showQuantity && (
                <div className='mt-6 h-10 w-32'>
                  <div className='relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent'>
                    {/* DEcrease Button */}
                    <button
                      className='h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-amber-500 hover:text-gray-700'
                      onClick={decreaseQuantity}
                    >
                      <span className='m-auto text-2xl font-thin'>−</span>
                    </button>
                    <input
                      type='number'
                      className='text-md flex w-full items-center bg-gray-300 p-2 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none'
                      value={productQuantity || quantity}
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
        </div>
      </div>
    </section>
  )
}

export default ProductInfo
