import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProductsCategories from '../../components/ProductsCategories'

export default function Home({}) {
  const { date: session, status } = useSession()
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
    console.log('-------- Client page --------')
    console.log('Session.user : ', session?.user)
    console.log('Status : ', status)
  }, [status, session])

  if (status === 'authenticated') {
    return (
      <div className='relative flex min-h-screen flex-col bg-gray-200'>
        <Header hideSearch={true} />
        <ProductsCategories categories={categories} />
        <Footer />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-between p-8 items-center h-screen'>
        <p className='text-4xl mb-2'>Loading...</p>
        <Link href='/client/auth/signin' passHref>
          <p>
            Vous devrez peut-être vous connecter à votre compte,
            <a className='text-amber-500 hover:underline hover:cursor-pointer'>
              S&apos;identifier?
            </a>
          </p>
        </Link>
      </div>
    )
  }
}
