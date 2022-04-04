import React from 'react'
import ProductInfo from '../../components/ProductInfo'
import * as Realm from 'realm-web'

const productId = ({ product }) => {
  return <ProductInfo key={product.id} product={product} />
}

export default productId

export async function getStaticProps(context) {
 const { params } = context
 // const response = await fetch(
 //   `https://zino-products-api.herokuapp.com/products/${params.productId}`
 // )
 // const data = await response.json()

 const REALM_APP_ID = process.env.REALM_APP_ID
  const app = new Realm.App({ id: REALM_APP_ID })
  const credentials = Realm.Credentials.anonymous()
  let product = {}
  try {
    const user = await app.logIn(credentials)
    product = await user.functions.getSingleProduct(params.productId)
    console.log("Product : ",product)
  } catch (error) {
    console.error(error)
  }
  return {
    props: { product },
  }
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://zino-products-api.herokuapp.com/products`
  )
  const data = await response.json()
  const paths = data.map((product) => {
    return {
      params: {
        productId: product.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
