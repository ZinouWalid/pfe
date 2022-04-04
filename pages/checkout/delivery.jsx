import axios from 'axios'
import React from 'react'
import OrderCard from '../../components/OrderCard'
import PayementForm from '../../components/forms/PayementForm'

const delivery = ({ cities }) => {
  return (
    <div className='flex items-center'>
      <PayementForm />
      <OrderCard/>
    </div>
  )
}

export default delivery
