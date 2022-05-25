import React, { useEffect, useState } from 'react'
import CategoriesFilter from '../../../components/CategoriesFilter'
import Header from '../../../components/Header'
import Body from '../../../components/HomeBody'
import Footer from '../../../components/Footer'
import * as Realm from 'realm-web'
import { motion } from 'framer-motion'

const CategoryId = ({ products }) => {


  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
      <div className='min-h-screen bg-gray-200 p-1'>
        <Header />
        <CategoriesFilter />
        <Body products={products} />

        <Footer />
      </div>
    </motion.div>
  )
}

export default CategoryId

export async function getStaticPaths() {
  const response = await fetch(
    `https://zino-products-api.herokuapp.com/categories`
  )
  const data = await response.json()
  const paths = data.map((category) => {
    return {
      params: {
        categoryId: category.key,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

//getting URL params
export async function getStaticProps(context) {
  const { params } = context

  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let products = []

  try {
    const user = await app.logIn(credentials)
    products = await user.functions.getProductsByCategory({
      category: params.categoryId,
      page: 1,
    })
  } catch (error) {
    console.error(error)
  }

  return {
    props: { products },
  }
}
