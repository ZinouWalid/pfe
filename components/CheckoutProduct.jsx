import React from 'react'
import Rating from '@mui/material/Rating'
import { removeFromBasket } from '../React-Context-Api/Actions/basketActions'
import { useStateValue } from '../React-Context-Api/context'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { motion } from 'framer-motion'

function CheckoutProduct({ product }) {
  const { id, img, name, price, rating, quantity, promotion } = { ...product }

  const [{}, dispatch] = useStateValue()

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {quantity && (
        <div className='flex w-screen rounded p-5'>
          <motion.img
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            src={img}
            alt=''
            className='h-40 object-contain hover:cursor-pointer sm:h-60'
          />
          <div className='ml-3'>
            <p>{name}</p>
            <Rating
              name='read-only'
              value={rating?.split(' ')[0] || 2.5}
              precision={0.5}
              readOnly
            />
            <p>
              {promotion !== '0%'
                ? Math.floor(
                    parseInt(price?.split(' ')[0]) -
                      (parseInt(price?.split(' ')[0]) *
                        parseInt(promotion?.split('%')[0])) /
                        100
                  )
                : price.split('-')[0]}
            </p>
            <p className='font-semibold my-4'>Quantité : {quantity}</p>
            <button
              className='mt-5 rounded border-2 border-red-500 bg-amber-300 p-2 text-sm hover:border-red-700 hover:bg-amber-500'
              onClick={() => dispatch(removeFromBasket(id))}
            >
              <DeleteOutlineIcon /> Retirer du Panier
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default CheckoutProduct
