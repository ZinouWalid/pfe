import React, { useEffect, useState } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Header from '../components/Header'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from '../lib/useCookie'
import Footer from '../components/Footer'

function Welcome() {
  const { data: session, status } = useSession()
  const router = useRouter()
  //getting the client and rider session from cookies if they exists
  //const [clientSession, setClientSession] = useState({})
  const [riderSession, setRiderSession] = useState({})

  useEffect(() => {
    console.log('-------- / page --------')
    //setClientSession(getCookie('clientSession'))
    setRiderSession(getCookie('riderSession'))
    //console.log('Client Session : ', clientSession)
    console.log('Rider Session : ', riderSession)
  }, [status, session])

  return (
    <div className='Body'>
      <Header hideSearch={true} hideBasket={true} hideOptions={true} />
      <div className='mobile'>
        <nav className='navMobile'>
          <img
            className='gifMobile'
            src='../public/images/output-onlinegiftools.gif'
            alt=''
          />
          <div className='nameMobile'>
            <p>Boutique en ligne et livraison</p>
          </div>
        </nav>

        <img className='img' src='../public/images//tofForMobile.png' alt='' />

        <p>Continuez comme :</p>

        <div className='ButtonsDivMobile'>
          <Link href='/client' passHref>
            <a className='CustomerMobile'>
              Client
              <span className='mx-4'>
                <AddShoppingCartIcon />
              </span>
            </a>
          </Link>
          <Link href={riderSession ? 'rider' : '/rider/auth/signin'} passHref>
            <a className='Delivery_manMobile'>
              Livreur
              <span className='mx-4'>
                <LocalShippingIcon />
              </span>
            </a>
          </Link>
        </div>

        <footer className='footerMobile'>
          <a href=''>Services</a>
          <a href=''>À propos de nous</a>
          <a href=''>Contact</a>
          <a href=''>Aide</a>
          <div className='ContactMobile'>
            <img src='https://img.icons8.com/ios-glyphs/30/000000/facebook.png' />
            <img src='https://img.icons8.com/ios-glyphs/30/000000/google-logo--v1.png' />
            <img src='https://img.icons8.com/ios-glyphs/30/000000/linkedin.png' />
          </div>
        </footer>
      </div>
      <div className='computer'>
        <div className='main'>
          <div className='backgrounde'></div>
          <div className='absolute'>
            <div className='top'>
              <div className='OnlineMarket'>
                <span className='underline'>Boutique en ligne et </span>
                <p> &nbsp; livraison</p>
              </div>
              <h1 className='BetterProduct'>
                De meilleurs produits au juste prix
              </h1>
              <p className='talk'>
                Le trait d&apos;union fait un tutoriel détaillé étape par étape
                sur la façon de supprimer un arrière-plan/une seule couleur
                (comme un écran vert) dans Adobe Photoshop. Ce tutoriel simple
                et rapide vous montre comment supprimer un arrière-plan à
                l&apos;aide de l&apos;outil gamme de couleurs.
              </p>
              <div className='ButtonsDiv'>
                <Link href='client' passHref>
                  <a className='Customer'>
                    Client
                    <span className='mx-4'>
                      <AddShoppingCartIcon />
                    </span>
                  </a>
                </Link>
                <Link
                  href={riderSession ? 'rider' : '/rider/auth/signin'}
                  passHref
                >
                  <a className='Delivery_man'>
                    livreur
                    <span className='mx-4'>
                      <LocalShippingIcon />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Welcome
