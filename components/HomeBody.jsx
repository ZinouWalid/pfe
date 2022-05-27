import React, { useEffect, useState } from 'react'
import Product from './Product'
import ImagesSlider from './ImagesSlider'
import { useStateValue } from '../React-Context-Api/context'
import { motion } from 'framer-motion'
import * as Realm from 'realm-web'
import InfiniteScroll from 'react-infinite-scroll-component'

function Body({ products }) {
  const [{ filteredProducts }, dispatch] = useStateValue()

  //implement infinite scroll
  const [myProducts, setMyProducts] = useState(products)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  //track changes on products
  useEffect(() => {
    setMyProducts(products)
  }, [products])

  const getMoreProducts = async () => {
    const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
    const app = new Realm.App({ id: REALM_APP_ID })
    const credentials = Realm.Credentials.anonymous()
    let newProducts = []

    try {
      const user = await app.logIn(credentials)
      newProducts = await user.functions.getProductsByCategory({
        category: products[0].category,
        page: page + 1,
      })
      setMyProducts([...myProducts, ...newProducts])
      setPage(page + 1)
      newProducts.length < 20 && setHasMore(false)
    } catch (error) {
      console.error(error)
    }
  }
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
      <InfiniteScroll
        dataLength={myProducts.length}
        next={getMoreProducts}
        hasMore={hasMore}
        loader={
          hasMore && (
            <h3 className='text-amber-500 flex justify-center items-center mt-3'>
              Loading...
            </h3>
          )
        }
        endMessage={
          <div className='mx-auto my-2 w-3/6 border border-amber-500'></div>
        }
      >
        <motion.div
          variants={stagger}
          className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 transition ease-in-out duration-500'
        >
          {filteredProducts?.length > 0
            ? filteredProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUP}>
                  <Product key={product.id} product={product} />
                </motion.div>
              ))
            : myProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUP}>
                  <Product key={product.id} product={product} />
                </motion.div>
              ))}
        </motion.div>
      </InfiniteScroll>
    </motion.div>
  )
}

export default Body
