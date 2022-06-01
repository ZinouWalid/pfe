import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import * as Realm from 'realm-web'
import Link from 'next/link'

function ImagesSlider({ products }) {
  const [sliderProducts, setSliderProducts] = useState([])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  useEffect(() => {
    const fetchAds = async () => {
      //setSliderProducts(products?.map((product) => product.img))
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new Realm.App({ id: REALM_APP_ID })
      const credentials = Realm.Credentials.anonymous()
      let ads = []

      try {
        const user = await app.logIn(credentials)
        ads = await user.functions.getAllActiveAds()
        setSliderProducts(ads)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAds()
  }, [])

  return (
    <div className='overflow-hidden lg:mt-12 flex h-[80vh] w-full items-center justify-center rounded bg-gradient-to-b from-white to-gray-200 '>
      {/*Images Slider*/}

      <Slider {...settings} className=' w-5/6 overflow-hidden'>
        {sliderProducts?.map((product, index) => (
          <Link key={index} href={product?.adLink} passHref>
            <a className='flex hover:cursor-pointer '>
              <img
                src={product?.img}
                className='h-[80vh] mb-8 mt-6 rounded object-contain w-full '
              />
            </a>
          </Link>
        ))}
      </Slider>
      <div className='h-14 bg-gradient-to-b from-cyan-500 to-blue-500'></div>
    </div>
  )
}

export default ImagesSlider
