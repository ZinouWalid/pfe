import React, { useEffect, useState } from 'react'
const Body = dynamic(() => import('../../../components/HomeBody'))
const Header = dynamic(() => import('../../../components/Header'))
const Footer = dynamic(() => import('../../../components/Footer'))
const CategoriesFilter = dynamic(() => import('../../../components/CategoriesFilter'))
const Pagination = dynamic(() => import('../../../components/Pagination'))
import { App, Credentials } from 'realm-web'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Page = ({ products, currentPage, pages }) => {
  //const [pages, setPages] = useState([])
  //
  ////Fetch the pages
  //useEffect(() => {
  //  const fetchPages = async () => {
  //    const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  //    const app = new  App({ id: REALM_APP_ID })
  //    const credentials =  Credentials.anonymous()
  //    let pages = {}
  //    try {
  //      const user = await app.logIn(credentials)
  //      pages = await user.functions.getAllProducts().then((data) => {
  //        for (
  //          let index = 0;
  //          index < Math.floor(data?.length / 32) + 1;
  //          index++
  //        ) {
  //          setPages((pages) => [
  //            ...pages,
  //            {
  //              page: '/client/pages/page_' + (index + 1),
  //              value: index + 1,
  //            },
  //          ])
  //        }
  //        return data
  //      })
  //    } catch (error) {
  //      console.error(error)
  //    }
  //  }
  //  fetchPages()
  //}, [])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'http://zino-products-api.herokuapp.com/categories'
      )
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'
      className='relative flex min-h-screen flex-col bg-gray-200'
    >
      <Header />
      <CategoriesFilter categories={categories} />
      <Body products={products} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        numberOfPages={pages?.length}
      />
      <Footer />
    </motion.div>
  )
}

export default Page

export async function getStaticProps(context) {
  const { params } = context

  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  const app = new App({ id: REALM_APP_ID })
  const credentials = Credentials.anonymous()
  let products = {}
  let pages = []
  try {
    // Get the prducts of each page
    const user = await app.logIn(credentials)
    products = await user.functions.getPageProducts({
      pageNumber: params.page.split('_')[1],
      nPerPage: 10,
    })

    //Fetch the pages
    await user.functions.getAllProducts().then((data) => {
      for (let index = 0; index < Math.floor(data?.length / 30) + 1; index++) {
        pages = [
          ...pages,
          {
            page: '/client/pages/page_' + (index + 1),
            value: index + 1,
          },
        ]
      }
    })
  } catch (error) {
    console.error(error)
  }
  //send first 10 products

  return {
    props: { products, currentPage: params.page.split('_')[1], pages },
  }
}

export async function getStaticPaths() {
  const paths = []
  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  const app = new App({ id: REALM_APP_ID })
  const credentials = Credentials.anonymous()
  let products = []
  try {
    const user = await app.logIn(credentials)
    products = await user.functions.getAllProducts()
  } catch (error) {
    console.error(error)
  }

  for (let index = 0; index < Math.floor(products?.length / 30) + 1; index++) {
    paths.push({ params: { page: 'page_' + (index + 1) } })
  }

  return {
    paths,
    fallback: false,
  }
}
