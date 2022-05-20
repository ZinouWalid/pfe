import React from 'react'
import Link from 'next/link'

const ProductsCategories = ({ categories }) => {
  return (
    <div className='mt-24 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4'>
      {categories.map((cat) => (
        <div
          className='flex rounded bg-white p-5 shadow-xl transition duration-300 hover:scale-95 hover:bg-gray-100 md:flex-col md:justify-evenly'
          key={cat.key}
        >
          {cat.key == 'all' ? (
            <Link href={`/client/pages/page_1`} passHref>
              <a>
                <img
                  src={cat.imgs[0]}
                  alt=''
                  className='mr-2 h-80 object-contain hover:cursor-pointer'
                />
              </a>
            </Link>
          ) : (
            <Link href={`/client/categories/${cat.key}`} passHref>
              <a>
                <img
                  //select a random image from the array
                  src={cat.imgs[Math.floor(Math.random() * cat.imgs.length)]}
                  alt=''
                  className='mr-2 h-80 object-contain hover:cursor-pointer'
                />
              </a>
            </Link>
          )}

          <div>
            <p>{cat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsCategories
