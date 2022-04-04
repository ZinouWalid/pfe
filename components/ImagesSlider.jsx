import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function ImagesSlider({ category }) {
  const [sliderProducts, setSliderProducts] = useState([
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/40/8972/2.jpg?4674',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/26/1943/1.jpg?3356',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/11/0482/1.jpg?9952',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/89/9702/1.jpg?0766',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/62/9903/1.jpg?8975',
  ])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  //Setting the slider images
  console.log('category', category)
  useEffect(() => {
    const fetchSliderProducts = async (category) => {
      console.log('Slider category: ', category)
      const response = await fetch(
        `https://zino-products-api.herokuapp.com/products?category=${category}`
      )
      const data = await response.json()
      setSliderProducts(data.slice(0, 5).map((product) => product.img))
    }
    if (category) fetchSliderProducts(category)
  }, [])

  return (
    <div className='mt-12 lg:mt-24 flex h-3/6 w-full items-center justify-center rounded bg-white shadow-lg'>
      {/*Images Slider*/}

      <ChevronLeftIcon />
      <Slider {...settings} className='w-5/6 overflow-x-visible'>
        {sliderProducts.map((product, index) => (
          <div key={index} className='flex'>
            <img src={product} className='h-full rounded ' />
          </div>
        ))}
      </Slider>
      <ChevronRightIcon />
    </div>
  )
}

export default ImagesSlider
