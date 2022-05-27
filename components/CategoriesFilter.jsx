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
      setCategories(
        data.map((cat) => {
          return {
            ...cat,
            selected:
              cat.key == window.location.href.split('/')[5] //If the category is selected
                ? true
                : cat.key == 'all' &&
                  window?.location.href?.split('/')[5].includes('page_')
                ? true
                : false,
          }
        })
      )
    }
    fetchCategories()
    console.log('category : ', window.location.href.split('/')[5])
  }, [])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  return (
    <div className='hidden lg:block '>
      <div className='transition duration-500 fixed top-16 z-10 flex h-10 w-full items-center justify-around bg-gray-200 text-sm shadow-xl '>
        {categories.map((cat, index) =>
          cat.key == 'all' ? (
            <div
              key={index}
              className={`${
                cat.selected && 'border-b-[3px] border-amber-500'
              } relative w-[calc(100vw/8)] h-full flex justify-center items-center`}
            >
              <Link href={`/client/pages/page_1`} passHref>
                <a className={`flex  hover:cursor-pointer`}>
                  <p className=' hover:underline'>{truncate(cat.value, 20)}</p>
                </a>
              </Link>
            </div>
          ) : (
            <div
              key={index}
              className={`${
                cat.selected && 'border-b-[3px] border-amber-500'
              } relative w-[calc(100vw/8)] h-full flex justify-center items-center`}
            >
              <Link href={`/client/categories/${cat.key}`} passHref>
                <a className={`flex hover:cursor-pointer `}>
                  <p className='hover:underline'>{truncate(cat.value, 20)}</p>
                </a>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default CategoriesFilter
