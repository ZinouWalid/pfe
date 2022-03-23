import React, { useEffect } from 'react'

function Welcome() {
  return (
    <div>
      <div className='mobile'>
        <nav className='navMobile'>
          <img
            className='gifMobile'
            src='../public/images/output-onlinegiftools.gif'
            alt=''
          />
          <div className='nameMobile'>
            <h1 className='WebsiteName'>WZ-S H O P</h1>
            <p>Online Market Store & Delivery</p>
          </div>
        </nav>

        <img className='img' src='../public/images//tofForMobile.png' alt='' />

        <p>Keep Going As :</p>

        <div className='ButtonsDivMobile'>
          <button
            className='CustomerMobile'
            type=''
            onClick={() => {
              window.location.assign('/products')
            }}
          >
            Customer
          </button>
          <button
            className='Delivery_manMobile'
            type=''
            onClick={() => {
              window.location.assign('/rider/register/signin')
            }}
          >
            Delivery man
          </button>
        </div>

        <footer className='footerMobile'>
          <a href=''>Services</a>
          <a href=''>About us</a>
          <a href=''>Contact</a>
          <a href=''>help</a>
          <div className='ContactMobile'>
            <img src='https://img.icons8.com/ios-glyphs/30/000000/facebook.png' />
            <img src='https://img.icons8.com/ios-glyphs/30/000000/google-logo--v1.png' />{' '}
            <img src='https://img.icons8.com/ios-glyphs/30/000000/linkedin.png' />{' '}
          </div>{' '}
        </footer>
      </div>
      <div className='computer'>
        <nav className='nav'>
          <img
            className='gif'
            src='../public/images/output-onlinegiftools.gif'
            alt=''
          />
          <h1 className='WebsiteName'>WZ-S H O P</h1>
        </nav>
        <div className='main'>
          <div className='backgrounde'></div>{' '}
          <div className='absolute'>
            <div className='top'>
              <div className='OnlineMarket'>
                <span className='underline'>Online Market Store & </span>{' '}
                <p> &nbsp; Delivery</p>
              </div>
              <h1 className='BetterProduct'>
                Better Products at the Right Price
              </h1>
              <p className='talk'>
                The Hyphenate does a detailed stop by step tutorial on how to
                remove a background/single color (such as a green screen) in
                Adobe Photoshop. This quick and easy tutorial shows you how to
                delete a background using the color range tool.
              </p>
              <div className='ButtonsDiv'>
                <a className='Customer' href={'/products'}>
                  Customer
                </a>
                <button
                  className='Delivery_man'
                  type=''
                  onClick={() => {
                    window.location.assign('/rider/register/signin')
                  }}
                >
                  Delivery man
                </button>
              </div>
            </div>
            <div className='bottom'>
              <h6 className='copytights'>Copyright © All rights reserved</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
