import React from 'react'
import ProductInfo from '../../components/ProductInfo'

const productId = ({ product }) => {

  return <ProductInfo product={product} />
}

export default productId

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `https://zino-products-api.herokuapp.com/products/${params.productId}`
  )
  const data = await response.json()

  return {
    props: { product: data },
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
