import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useStateValue } from '../React-Context-Api/context'
import { motion } from 'framer-motion'

function Body({}) {
  const [{ filteredProducts }, dispatch] = useStateValue()
  //implement infinite scroll
  const [myProducts, setMyProducts] = useState(filteredProducts)

  //track changes on page url to unfilter the searched products

  //track changes on products
  useEffect(() => {
    setMyProducts(filteredProducts)
  }, [filteredProducts])

  const easing = [0.6, -0.05, 0.01, 1]
  const fadeInUP = {
    initial: {
      opacity: 0,
      y: 60,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  }
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1, //0.1 is the delay between each child animation
      },
    },
  }
  if (myProducts.length > 0) {
    return (
      <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
        {/* Products */}

        <motion.div
          variants={stagger}
          className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 transition ease-in-out duration-500'
        >
         {/* Display only first 20 products of the search result */}
          {myProducts.slice[(0, 20)]?.map((product) => {
            if (product?.units > 0)
              return (
                <motion.div key={product.id} variants={fadeInUP}>
                  <Product key={product.id} product={product} />
                </motion.div>
              )
          })}{' '}
        </motion.div>
        <div className='mx-auto my-2 w-3/6 border border-amber-500'></div>
      </motion.div>
    )
  } else return null
}

export default Body
