import React, { useEffect, useState } from 'react'
import Body from '../../../components/HomeBody'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import CategoriesFilter from '../../../components/CategoriesFilter'
import Pagination from '../../../components/Pagination'

const Page = ({ products, currentPage }) => {
  const [pages, setPages] = useState([])

  //Fetch the pages
  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/products'
      )

      //const data = await response.json()
      const data = await response.json().then((data) => {
        for (let index = 0; index < Math.floor(data.length / 30) + 1; index++) {
          setPages((pages) => [
            ...pages,
            {
              page: '/products/pages/page_' + (index + 1),
              value: index + 1,
            },
          ])
        }
        return data
      })
    }
    fetchPages()
  }, [])

 
  return (
    <div className='relative flex min-h-screen flex-col bg-gray-200'>
      <Header />
      <CategoriesFilter/>
      <Body products={products} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        numberOfPages={pages.length}
      />
      <Footer />
    </div>
  )
}

export default Page

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `https://zino-products-api.herokuapp.com/products?_page=${
      params.page.split('_')[1]
    }&_limit=30`
  )
  const data = await response.json()

  return {
    props: { products: data, currentPage: params.page.split('_')[1] },
  }
}

export async function getStaticPaths() {
  const paths = []
  const response = await fetch(
    `https://zino-products-api.herokuapp.com/products`
  )
  const data = await response.json().then((data) => {
    for (let index = 0; index < Math.floor(data.length / 30) + 1; index++) {
      paths.push({ params: { page: 'page_' + (index + 1) } })
    }
    return data
  })

  return {
    paths,
    fallback: false,
  }
}
