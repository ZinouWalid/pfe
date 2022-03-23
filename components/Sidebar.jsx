import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Sidebar = ({}) => {
  const [categories, setCategories] = useState([])
  const [showSidebar, setShowSidebar] = useState(true)

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
    <div className="transition delay-1000 ease-in-out ">
      <button onClick={() => setShowSidebar(!showSidebar)}>X</button>
      {showSidebar && (
        <div className="top-16 left-0 z-10 flex h-fit w-1/4 flex-col justify-center rounded bg-cyan-900 text-sm">
          {categories.map((cat, index) => (
            <Link href={`/products/categories/${cat.key}`}>
              <a className="flex border-b border-black p-5">
                <p className="hover:cursor-pointer hover:font-bold hover:underline">
                  {cat.value}
                </p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Sidebar
