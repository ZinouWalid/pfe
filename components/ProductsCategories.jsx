import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ProductsCategories = ({ categories }) => {
  const [myCategories, setMyCategories] = useState(categories)

  useEffect(() => {
    setMyCategories(categories)
  }, [categories])

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

  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
      <motion.div
        variants={stagger}
        className={`mt-2 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4`}
      >
        {myCategories.map((cat) => (
          <motion.div
            variants={fadeInUP}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.5 }}
            className='flex rounded bg-white p-5 shadow-xl transition duration-300 hover:scale-95 md:flex-col md:justify-evenly'
            key={cat.key}
          >
            <p className='font-medium text-nxl text-center capitalize'>
              {cat.value}
            </p>

            {cat.category == 'all' ? (
              <Link href={`/client/pages/page_1`} passHref>
                <a>
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    src={cat.img}
                    alt=''
                    className='mr-2 max-h-80 object-contain hover:cursor-pointer'
                  />
                </a>
              </Link>
            ) : (
              <Link href={`/client/categories${cat.url}`} passHref>
                <a>
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    src={cat.img}
                    alt=''
                    className='mr-2 max-h-80 object-contain hover:cursor-pointer'
                  />
                </a>
              </Link>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProductsCategories
