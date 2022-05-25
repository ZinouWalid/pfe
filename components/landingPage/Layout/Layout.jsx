import React from "react";
import Header from '../../Header'
import Footer from '../../Footer'

const Layout = ({ children }) => {
  return (
    <div className='bg-white'>
      <Header hideSearch={true} hideBasket={true} hideOptions={true} />
      {children}
      <Footer />
    </div>
  )
};

export default Layout;
