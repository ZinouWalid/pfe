import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const aide = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-screen max-h-fit py-24 px-4 '>
        <Header hideSearch={true} hideBasket={true} hideOptions={true} />
        <h1 className='text-3xl text-center mb-6'>Aide</h1>
        <div>
          <div>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-4 text-amber-500'>
                Annuler une commande
              </h2>
              <img
                src='https://cdn1.vectorstock.com/i/thumb-large/61/10/man-cancel-order-by-finger-on-smartphone-screen-vector-13476110.jpg'
                alt=''
              />
            </div>
            <h3 className='text-xl text-amber-500 mb-2'>
              Comment annuler ma commande
            </h3>
            <p className='font-semibold'>
              Est-ce que je peux annuler ma commande?
            </p>
            <p className='text-gray-700 w-5/6'>
              Oui l&apos;annulation est possible, mais seulement avant que votre
              commande soit « expédiée ». Une fois la commande « expédiée » nous
              ne pouvons plus l&apos;annuler, mais vous pouvez choisir de
              refuser la commande lors de la livraison.
            </p>
            <h3 className='text-xl text-amber-500 my-2'>
              Étapes pour annuler votre commande
            </h3>
            <div className='text-gray-700'>
              <p>
                <span className='font-semibold mr-1'>1.</span>De votre liste de
                commandes sur votre compte 9odyani, cliquez sur le bouton
                &quot;Annuler la commande&quot; en bas de la commande que vous
                désirez annuler.
              </p>
              <p>
                <span className='font-semibold mr-1'>2.</span>confirmer
                l&apos;annulation.
              </p>
            </div>
          </div>
          <div>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-4 text-amber-500'>
                Mode de paiement
              </h2>
              <img
                src='https://cdn1.vectorstock.com/i/thumb-large/56/30/payment-by-cash-for-express-delivery-vector-6535630.jpg'
                alt=''
              />
            </div>
            <div>
              <h3 className='text-xl text-amber-500 mb-2'>
                Paiement à la livraison
              </h3>
              <p className='text-gray-700 w-5/6'>
                Dès l&apos;arrivée du livreur et réception de vos colis, vous
                aurez la possibilité de payer en espèces. Si vous n&apos;êtes
                pas satisfait(e) de votre commande ou rencontrez un problème,
                vous pouvez toujours annuler votre commande dans les étapes
                expliquées ci-dessus.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default aide
