import React from 'react'
import SignUp from '../../../components/Login/client/SignUp'
import Header from '../../../components/Header'
const signup = () => {
  return (
    <div className='py-2 bg-gray-100 min-h-screen min-w-screen bg-register-background  bg-no-repeat bg-cover'>
      <Header hideSearch={true} hideBasket={true} hideOptions={true} />

      <SignUp />
    </div>
  )
}

export default signup
