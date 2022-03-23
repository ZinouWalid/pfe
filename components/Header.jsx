import React, { useEffect, useState } from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useStateValue } from '../React-Context-Api/context'
import { filterProducts } from '../React-Context-Api/productsActions'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { getCookie } from '../lib/useCookie'

function Header() {
  const [{ products }, dispatch] = useStateValue()
  const [searchTerm, setSearchTerm] = useState('')
  const [localBasket, setLocalBasket] = useState([])
  //filter products after we search
  let filteredProducts = []

  useEffect(() => {
    setLocalBasket(getCookie('basket'))
    //--------------------------------------------------------------
  }, [localBasket])

  const handleSubmit = (e) => {
    e.preventDefault()
    products.filter((product) =>
      searchTerm.split(' ').map((word) => {
        if (
          product.tags.join('').includes(word) ||
          product.name.includes(word) ||
          product.category.includes(word)
        ) {
          filteredProducts.push(product)
        }
      })
    )
    filteredProducts.length > 0
      ? dispatch(filterProducts(filteredProducts))
      : dispatch(
          filterProducts([
            {
              id: '1000',
              img: 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300',
            },
          ])
        )
    setSearchTerm('')
  }

  return (
    <nav className="fixed top-0 z-10 flex h-14 w-full items-center bg-slate-900 text-white lg:h-16">
      {/* Logo and title */}
      <Link href={'/products'} passHref>
        <a className="flex items-center ">
          <img
            src="https://e7.pngegg.com/pngimages/644/743/png-clipart-a-o-t-wings-of-freedom-eren-yeager-bertholdt-hoover-attack-on-titan-logo-others-angle-emblem.png"
            alt=""
            className="mx-2 h-10 rounded-full md:h-12"
          />
          <h2 className="flex font-bold">
            AOT <span className="ml-1 hidden md:block">Commerce</span>
          </h2>
        </a>
      </Link>

      {/* searchTerm and input */}
      <form
        className="my-auto mx-auto flex max-w-3xl flex-1 items-center text-slate-900"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <input
          type="text"
          className="flex-1 rounded-l border-none px-2 outline-none lg:h-10"
          placeholder="Cherchez un produit, une marque ou une catégorie"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value.toLowerCase())
            console.log(e.target.value.toLowerCase())
          }}
        />
        <button
          className="border-1 h-6 rounded-r border-black bg-amber-400 px-1 hover:bg-amber-500 md:px-2 lg:h-10 lg:px-3"
          type="submit"
        >
          <SearchOutlinedIcon />
        </button>
      </form>

      {/* Sign in and Up */}
      {/* <div className="flex hidden items-center font-bold sm:block md:mx-5">
        <button className="hover:underline">Sign in</button>
        <button className="border-1 mx-2 h-8 rounded border border-black bg-amber-400 px-3 text-slate-900 hover:bg-amber-500 lg:h-12">
          Sign up
        </button>
      </div> */}

      {/* Basket */}
      <div>
        <Link href={'/checkout'} passHref>
          <a className="hover:cursor-pointer">
            <ShoppingBasketIcon className="h-5 md:h-12" />
            <span className="ml-0 mr-1 font-bold md:ml-2 md:mr-3">
              {localBasket.length || 0}
            </span>
          </a>
        </Link>
      </div>

      {/* Burger button */}
      <button className="sm:hidden">
        <MenuIcon className="mx-1 h-10 transition duration-200 hover:rotate-90  hover:scale-x-110 hover:ease-in md:mx-3" />
      </button>
    </nav>
  )
}

export default Header
