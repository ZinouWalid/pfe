import React from 'react'
import OrderCard from '../../components/OrderCard'
import PayementForm from '../../components/forms/PayementForm'
import Header from '../../components/Header'

const delivery = () => {
  return (
    <div className=' bg-gray-100 relative p-2 overflow-x-scroll'>
      <Header hideSearch={true} />
      <div className='mt-14 lg:mt-16 flex flex-col lg:flex-row'>
        <PayementForm />
        <OrderCard />
      </div>
    </div>
  )
}

export default delivery
