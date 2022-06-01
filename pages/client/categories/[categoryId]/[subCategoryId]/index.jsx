import React, { useEffect, useState } from 'react'
import CategoriesFilter from '../../../../../components/CategoriesFilter'
import Header from '../../../../../components/Header'
import Body from '../../../../../components/HomeBody'
import Footer from '../../../../../components/Footer'
import * as Realm from 'realm-web'
import { motion } from 'framer-motion'
import ProductsCategories from '../../../../../components/ProductsCategories'
import ImagesSlider from '../../../../../components/ImagesSlider'

const CategoryId = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      //get the subcategory and category from the page url
      const categoryId = window.location.href.split('/')[5]
      const subCategoryId = window.location.href.split('/')[6]

      let category = {}
      let subCategory = {}
      let prods = []

      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new Realm.App({ id: REALM_APP_ID })
      const credentials = Realm.Credentials.anonymous()
      try {
        const user = await app.logIn(credentials)
        category = await user.functions
          .getCategoryById(categoryId)
          .then(async (category) => {
            //search the sub category in the category subCategories array
            subCategory = category.subCategories.filter(
              (subCategory) => subCategory.key === subCategoryId
            )
            console.log('subCategory : ', subCategory)
            setCategories(subCategory[0].subSubCategories)

            //check if we have only one sub sub category to display the productss
            if (subCategory[0].subSubCategories?.length === 1) {
              prods = await user.functions.getProductsByCategory({
                category: subCategoryId,
                page: 1,
              })
              setProducts(prods)
            }
            //if we have more than one sub sub category, we display the sub sub categories

            return category
          })
      } catch (error) {
        console.error(error)
      }
    }
    console.log('categories : ', categories)
    fetchCategoriesAndProducts()
  }, [])
  //console.log('products : ', products)

  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
      <div className='min-h-screen bg-gray-200 p-1'>
        <Header />
        <CategoriesFilter categories={categories} />
        <ImagesSlider />
        <ProductsCategories categories={categories} />
        {products?.length > 0 && <Body products={products} />}

        <Footer />
      </div>
    </motion.div>
  )
}

export default CategoryId

//export async function getStaticPaths() {
//  const response = await fetch(
//    `https://zino-products-api.herokuapp.com/categories`
//  )
//  const data = await response.json()
//  const paths = data.map((category) => {
//    return {
//      params: {
//        categoryId: category.key,
//      },
//    }
//  })
//  //data.map((category) => {
//  //  paths.push({
//  //    params: {
//  //      categoryId: category.key,
//  //    },
//  //  })
//  //  category.subCategories.map((subCategory) => {
//  //    paths.push({
//  //      params: {
//  //        categoryId: subCategory.key,
//  //      },
//  //    })
//  //    subCategory?.subSubCategories.map((subSubCategory) => {
//  //      paths.push({
//  //        params: {
//  //          categoryId: subSubCategory.key,
//  //        },
//  //      })
//  //    })
//  //  })
//  //})
//  //
//  //remove duplicates from paths
//  //const uniquePaths = paths.filter(
//  //  (path, index, self) =>
//  //    index ===
//  //    self.findIndex((t) => t.params.categoryId === path.params.categoryId)
//  //)
//
//  return {
//    paths,
//    fallback: false,
//  }
//}

//getting URL params
//export async function getServerSideProps(context) {
//  const { params } = context
//
//  let category = {}
//  let subCategory = {}
//  let products = []
//
//  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
//  const app = new Realm.App({ id: REALM_APP_ID })
//  const credentials = Realm.Credentials.anonymous()
//  try {
//    const user = await app.logIn(credentials)
//    category = await user.functions.getCategoryById(params.categoryId)
//
//    //search the sub category in the category subCategories array
//    subCategory = category.subCategories.filter(
//      (subCategory) => subCategory.key === params.subCategoryId
//    )
//
//    //check if we have only one sub sub category to display the products
//    if (subCategory.subSubCategories.length === 1) {
//      products = await user.functions.getProductsByCategory({
//        category: params.subCategoryId,
//        page: 1,
//      })
//      return {
//        props: {
//          categories: subCategory[0].subSubCategories,
//          products: products,
//        },
//      }
//    }
//  } catch (error) {
//    console.error(error)
//  }
//
//  //fetch the products API for categories
//  //const response = await fetch(
//  //  `https://zino-products-api.herokuapp.com/categories?key=${params.categoryId}`
//  //)
//  //categories = await response.json()
//  ////search the sub category in the category subCategories array
//  //
//  //const subCategory = categories[0].subCategories.filter(
//  //  (subCategory) => subCategory.key === params.subCategoryId
//  //)
//  //
//  ////check if we have only one sub sub category to display the products
//  //if (subCategory[0].subSubCategories.length === 1) {
//  //  let products = []
//  //  //fetch the products API for the sub category products
//  //  const response = await fetch(
//  //    `https://zino-products-api.herokuapp.com/products?category=${params.subCategoryId}`
//  //  )
//  //  products = await response.json()
//  //
//  //  return {
//  //    props: {
//  //      categories: subCategory[0].subSubCategories,
//  //      products: products,
//  //    },
//  //  }
//  //}
//
//  //if we have more than one sub sub category, we display the sub sub categories
//  return {
//    props: {
//      categories: subCategory.subSubCategories,
//      products: [],
//    },
//  }
//}
//
