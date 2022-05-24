import React from 'react'
import Product from './Product'
import ImagesSlider from './ImagesSlider'
import { useStateValue } from '../React-Context-Api/context'
import { motion } from 'framer-motion'

function Body({ products }) {
  const [{ filteredProducts }, dispatch] = useStateValue()
  
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
      {/*Images Slider*/}
      <ImagesSlider products={products.slice(0, 5)} />

      {/* Products */}
      <motion.div
        variants={stagger}
        className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 transition ease-in-out duration-500'
      >
        {filteredProducts?.length > 0
          ? filteredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUP}>
                <Product key={product.id} product={product} />
              </motion.div>
            ))
          : products.map((product) => (
              <motion.div key={product.id} variants={fadeInUP}>
                <Product key={product.id} product={product} />
              </motion.div>
            ))}
      </motion.div>
    </motion.div>
  )
}

export default Body
