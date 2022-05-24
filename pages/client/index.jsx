import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProductsCategories from '../../components/ProductsCategories'
import { useTransition, animated } from 'react-spring'

export default function Home({}) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/categories'
      )
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])


  return (
    <div className='relative flex min-h-screen flex-col bg-gray-200'>
      <Header hideSearch={true} />
     
      <ProductsCategories categories={categories} />
      <Footer />
    </div>
  )
}
