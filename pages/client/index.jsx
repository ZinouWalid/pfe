import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProductsCategories from '../../components/ProductsCategories'
import { getCookie } from '../../lib/useCookie'
import { useStateValue } from '../../React-Context-Api/context'

export default function Home({}) {
  //const { data: session, status } = useSession()
  const [categories, setCategories] = useState([])
  //const [{ client }, dispatch] = useStateValue()
  //const [user, setUser] = useState(getCookie('clientSession') || {})

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
