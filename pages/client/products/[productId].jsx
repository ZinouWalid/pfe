import React from 'react'
import ProductInfo from '../../../components/ProductInfo'
import Header from '../../../components/Header'
import * as Realm from 'realm-web'
import Footer from '../../../components/Footer'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const ProductId = ({ product }) => {
  const router = useRouter()

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='relative flex min-h-screen flex-col bg-gray-100 '>
        <Header />
        <button
          className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        <ProductInfo key={product.id} product={product} />
        <Footer />
      </div>
    </motion.div>
  )
}

export default ProductId

export async function getServerSideProps(context) {
  const { params } = context

  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let product = {}
  try {
    const user = await app.logIn(credentials)
    product = await user.functions.getSingleProduct(params.productId)
    console.log('Product : ', product)
  } catch (error) {
    console.error(error)
  }
  return {
    props: { product },
  }
}
//
//export async function getStaticPaths() {
//  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
//  const app = new Realm.App({ id: REALM_APP_ID })
//  const credentials = Realm.Credentials.anonymous()
//  let products = []
// try {
//   const user = await app.logIn(credentials)
//   products = await user.functions.getAllProducts()
// } catch (error) {
//   console.error(error)
// }
//
//
//  const paths = products.map((product) => {
//    return {
//      params: {
//        productId: product.id,
//      },
//    }
//  })
//
//  return {
//    paths,
//    fallback: false,
//  }
//}
