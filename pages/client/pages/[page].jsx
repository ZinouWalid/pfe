import React, { useEffect, useState } from 'react'
import Body from '../../../components/HomeBody'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import CategoriesFilter from '../../../components/CategoriesFilter'
import Pagination from '../../../components/Pagination'
import * as Realm from 'realm-web'
import { motion } from 'framer-motion'

const Page = ({ products, currentPage, pages }) => {
  //const [pages, setPages] = useState([])
  //
  ////Fetch the pages
  //useEffect(() => {
  //  const fetchPages = async () => {
  //    const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  //    const app = new Realm.App({ id: REALM_APP_ID })
  //    const credentials = Realm.Credentials.anonymous()
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

  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate' className='relative flex min-h-screen flex-col bg-gray-200'>
      <Header />
      <CategoriesFilter />
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
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let products = {}
  let pages = []
  try {
    // Get the prducts of each page
    const user = await app.logIn(credentials)
    products = await user.functions.getPageProducts({
      pageNumber: params.page.split('_')[1],
      nPerPage: 30,
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
  return {
    props: { products, currentPage: params.page.split('_')[1], pages },
  }
}

export async function getStaticPaths() {
  const paths = []
  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
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
