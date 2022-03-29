import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useStateValue } from '../../React-Context-Api/context'
import { searchProducts } from '../../React-Context-Api/productsActions'
import ProductsCategories from '../../components/ProductsCategories'

export default function Home({}) {
  const [{ basket }, dispatch] = useStateValue()
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState([])
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

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/products'
      )

      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className='relative flex min-h-screen flex-col bg-gray-200'>
      <Header />
      <ProductsCategories categories={categories} />
      <Footer />
    </div>
  )
}
