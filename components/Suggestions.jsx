import Link from 'next/link'
import React from 'react'
import { useStateValue } from '../React-Context-Api/context'

const Suggestions = () => {
  const [{ suggestions }, dispatch] = useStateValue()

  return (
    <div className='w-4/5 fixed top-32 mx-auto'>
      <ul className='flex z-30 flex-col w-full rounded-xl list-none'>
        {suggestions.map((sugg) => (
          <li>{sugg}</li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions
