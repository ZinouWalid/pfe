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
            <p>Boutique en ligne et livraison</p>
          </div>
        </nav>

        <img className='img' src='../public/images//tofForMobile.png' alt='' />

        <p>Continuez comme :</p>

        <div className='ButtonsDivMobile'>
          <button
            className='CustomerMobile'
            type=''
            onClick={() => {
              window.location.assign('/products')
            }}
          >
            Consomateur
          </button>
          <button
            className='Delivery_manMobile'
            type=''
            onClick={() => {
              window.location.assign('/rider/register/signin')
            }}
          >
            Livreur
          </button>
        </div>

        <footer className='footerMobile'>
          <a href=''>Services</a>
          <a href=''>À propos de nous</a>
          <a href=''>Contact</a>
          <a href=''>Aide</a>
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
                <span className='underline'>Boutique en ligne et </span>{' '}
                <p> &nbsp; livraison</p>
              </div>
              <h1 className='BetterProduct'>
                De meilleurs produits au juste prix
              </h1>
              <p className='talk'>
                Le trait d'union fait un tutoriel détaillé étape par étape sur
                la façon de supprimer un arrière-plan/une seule couleur (comme
                un écran vert) dans Adobe Photoshop. Ce tutoriel simple et
                rapide vous montre comment supprimer un arrière-plan à l'aide de
                l'outil gamme de couleurs.
              </p>
              <div className='ButtonsDiv'>
                <a className='Customer' href={'/products'}>
                  Consomateur
                </a>
                <button
                  className='Delivery_man'
                  type=''
                  onClick={() => {
                    window.location.assign('/rider/register/signin')
                  }}
                >
                  livreur
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
