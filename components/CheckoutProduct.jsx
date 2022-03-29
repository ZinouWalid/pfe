import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import { removeFromBasket } from '../React-Context-Api/basketActions'
import { useStateValue } from '../React-Context-Api/context'

function CheckoutProduct({ product }) {
  const { id, img, name, price, rating, quantity } = { ...product }

  const [{}, dispatch] = useStateValue()

  return (
    <div className="flex w-screen rounded bg-white p-5">
      <img
        src={img}
        alt=""
        className="h-40 object-contain hover:cursor-pointer sm:h-60"
      />
      <div className="ml-3">
        <p>{name}</p>
        <Rating
          name="read-only"
          value={rating?.split(' ')[0] || 2.5}
          precision={0.5}
          readOnly
        />
        <p>{price}</p>
        <p className='font-semibold my-4'>Quantité : {quantity}</p>
        <button
          className="mt-5 rounded border-2 border-red-500 bg-amber-300 p-2 text-sm hover:border-red-700 hover:bg-amber-500"
          onClick={() => dispatch(removeFromBasket(id))}
        >
          Retirer du Panier
        </button>
      </div>
    </div>
  )
}

export default CheckoutProduct
