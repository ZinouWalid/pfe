import React from 'react'
import Product from './Product'
import ImagesSlider from './ImagesSlider'
import { useStateValue } from '../React-Context-Api/context'

function Body({ products }) {
  const [{ filteredProducts }, dispatch] = useStateValue()

  return (
    <div>
      {/*Images Slider*/}
      <ImagesSlider/>

      {/* Products */}
      <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </div>
  )
}

export default Body
