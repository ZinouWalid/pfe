import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CategoriesFilter = ({}) => {
  const [categories, setCategories] = useState([])

  //Fetch the categories
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
    <div className="fixed top-16 z-10 flex h-10 w-full items-center justify-around bg-gray-200 text-sm shadow-xl">
      {categories.map((cat, index) =>
        cat.key == 'all' ? (
          <Link href={`/products/pages/page_1`} passHref>
            <a className="flex ">
              <p className="hover:cursor-pointer hover:underline">
                {cat.value}
              </p>
            </a>
          </Link>
        ) : (
          <Link href={`/products/categories/${cat.key}`} passHref>
            <a className="flex ">
              <p className="hover:cursor-pointer hover:underline">
                {cat.value}
              </p>
            </a>
          </Link>
        )
      )}
    </div>
  )
}

export default CategoriesFilter
