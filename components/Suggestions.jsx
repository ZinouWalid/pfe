import Link from 'next/link'
import React from 'react'

const Suggestions = ({ suggestions }) => {
  return (
    <ul className='flex z-30 flex-col w-full rounded-xl list-none'>
      {suggestions.map((sugg) => (
        <Link href={`/products/${sugg.id}`} passHref>
          <a className='flex justify-between items-center border p-2 hover:bg-gray-100 cursor-pointer bg-white'>
            <p className='text-gray-600'>{sugg.name}</p>
            <img src={sugg.img} alt='' className='h-12 object-contain' />
          </a>
        </Link>
      ))}
    </ul>
  )
}

export default Suggestions
