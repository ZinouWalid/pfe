import React from 'react'
import CategoriesFilter from '../../../components/CategoriesFilter'
import Header from '../../../components/Header'
import Body from '../../../components/HomeBody'

const CategoryId = ({ products, categories }) => {
  return (
    <div className='min-h-screen bg-gray-200'>
      <Header />
      <CategoriesFilter />
      <Body products={products} />
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
  const response = await fetch(
    `https://zino-products-api.herokuapp.com/products?category=${params.categoryId}`
  )
  const products = await response.json()

  return {
    props: { products },
  }
}
