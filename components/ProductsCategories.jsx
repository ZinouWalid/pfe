import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ProductsCategories = ({ categories }) => {
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
        variants={stagger} className='mt-24 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4'>
        {categories.map((cat) => (
          <motion.div
            variants={fadeInUP}
            className='flex rounded bg-white p-5 shadow-xl transition duration-300 hover:scale-95 hover:bg-gray-100 md:flex-col md:justify-evenly'
            key={cat.key}
          >
            {cat.key == 'all' ? (
              <Link href={`/client/pages/page_1`} passHref>
                <a>
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    src={cat.imgs[0]}
                    alt=''
                    className='mr-2 h-80 object-contain hover:cursor-pointer'
                  />
                </a>
              </Link>
            ) : (
              <Link href={`/client/categories/${cat.key}`} passHref>
                <a>
                  <img
                    //select a random image from the array
                    src={cat.imgs[Math.floor(Math.random() * cat.imgs.length)]}
                    alt=''
                    className='mr-2 h-80 object-contain hover:cursor-pointer'
                  />
                </a>
              </Link>
            )}

            <div>
              <p>{cat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProductsCategories
