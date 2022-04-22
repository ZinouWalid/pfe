import React from 'react'
import CategoriesFilter from '../../../components/CategoriesFilter'
import Header from '../../../components/Header'
import Body from '../../../components/HomeBody'
import Footer from '../../../components/Footer'
import * as Realm from 'realm-web'

const CategoryId = ({ products }) => {
  return (
    <div className='min-h-screen bg-gray-200 p-1'>
      <Header />
      <CategoriesFilter/>
      <Body products={products} />
      <Footer />
    </div>
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

export async function getStaticProps(context) {
  //getting URL params
  const { params } = context

  //fetching products by category
  //const response = await fetch(
  //  `https://zino-products-api.herokuapp.com/products?category=${params.categoryId}`
  //)
  //const products = await response.json()
  
  const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let products = []
  try {
    const user = await app.logIn(credentials)
    products = await user.functions.getProductsByCategory(params.categoryId)
  } catch (error) {
    console.error(error)
  }
  
 
  return {
    props: { products},
  }
}
