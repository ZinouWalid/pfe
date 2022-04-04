import React from 'react'
import { useStateValue } from '../React-Context-Api/context'

const OrderCard = () => {
  const [{ basket }, dispatch] = useStateValue()
  return (
    <div className='w-1/5'>
     <h1>{console.log(basket)}</h1>
      {basket.map((item) => {
        return (
          <div className='flex flex-col items-center'>
            <p className=''>{item.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default OrderCard
