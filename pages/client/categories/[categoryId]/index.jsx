import React from 'react'
const CategoriesFilter = dynamic(() =>
  import('../../../../components/CategoriesFilter')
)
const Header = dynamic(() => import('../../../../components/Header'))
const Footer = dynamic(() => import('../../../../components/Footer'))
const ProductsCategories = dynamic(() =>
  import('../../../../components/ProductsCategories')
)
const ImagesSlider = dynamic(() =>
  import('../../../../components/ImagesSlider')
)
import { App, Credentials } from 'realm-web'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const CategoryId = ({ products, categories }) => {
  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
      <div className='min-h-screen bg-gray-200 p-1'>
        <Header />
        <ImagesSlider />
        <CategoriesFilter categories={categories} />
        <ProductsCategories categories={categories} />
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
  //data.map((category) => {
  //  paths.push({
  //    params: {
  //      categoryId: category.key,
  //    },
  //  })
  //  category.subCategories.map((subCategory) => {
  //    paths.push({
  //      params: {
  //        categoryId: subCategory.key,
  //      },
  //    })
  //    subCategory?.subSubCategories.map((subSubCategory) => {
  //      paths.push({
  //        params: {
  //          categoryId: subSubCategory.key,
  //        },
  //      })
  //    })
  //  })
  //})
  //
  //remove duplicates from paths
  //const uniquePaths = paths.filter(
  //  (path, index, self) =>
  //    index ===
  //    self.findIndex((t) => t.params.categoryId === path.params.categoryId)
  //)

  return {
    paths,
    fallback: false,
  }
}

//getting URL params
export async function getStaticProps(context) {
  const { params } = context

  let category = {}
  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  const app = new App({ id: REALM_APP_ID })
  const credentials = Credentials.anonymous()
  try {
    const user = await app.logIn(credentials)
    category = await user.functions.getCategoryById(params.categoryId)
  } catch (error) {
    console.error(error)
  }

  //fetch the products API for categories
  //const response = await fetch(
  //  `https://zino-products-api.herokuapp.com/categories?key=${params.categoryId}`
  //)
  //categories = await response.json()

  return {
    props: {
      categories: category.subCategories,
    },
  }
}
