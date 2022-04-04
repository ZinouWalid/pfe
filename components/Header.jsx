import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useStateValue } from '../React-Context-Api/context'
import { filterProducts } from '../React-Context-Api/productsActions'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { getCookie } from '../lib/useCookie'
import Suggestions from './Suggestions'
import Sidebar from './Sidebar'
import * as Realm from 'realm-web'

function Header() {
  const [suggestions, setSuggestions] = useState([])
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [localBasket, setLocalBasket] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)

  //filter products after we search
  let filteredProducts = []

  useEffect(() => {
    function updateBasket() {
      setLocalBasket(getCookie('basket'))
    }
    updateBasket()
  }, [localBasket])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/products'
      )

      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit Search Form')
    products.map((product) => {
      searchTerm.split(' ').map((word) => {
        if (product.tags.join('').includes(word)) {
          filteredProducts.push(product)
        }
      })
    })
    //Check if we found any matches
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

  const fetchSuggestions = async () => {
    const REALM_APP_ID = 'pfe-etnhz'
    const app = new Realm.App({ id: REALM_APP_ID })
    const credentials = Realm.Credentials.anonymous()
    let allSuggestions = []
    try {
      console.log('Fetching suggestions')
      const user = await app.logIn(credentials)
      allSuggestions = await user.functions.searchProductsAutoComplete(
        searchTerm
      )
      //setProducts(() => allSuggestions)
      console.log('SUGGESTIONS  : ', allSuggestions)
      setSuggestions(allSuggestions)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
    console.log('CHANGEEE !!', searchTerm)
  }

  useEffect(async () => {
    searchTerm.length > 2 ? await fetchSuggestions() : setSuggestions([])
  }, [searchTerm])

  return (
    <nav className='fixed top-0 left-0 right-0 flex justify-between h-14 w-full items-center bg-slate-900 text-white lg:h-16 z-30' onClick={()=>setSuggestions([])}>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className='lg:hidden ml-2 md:mx-4 text-amber-500 hover:bg-gray-800 hover:rounded-full p-1 md:scale-125 z-20 cursor-pointer '
      >
        <p className='font-bold text-2xl hover:text-3xl'>
          <MenuIcon />
        </p>
      </button>
      {showSidebar && <Sidebar showSidebar={showSidebar} />}
      {/* Logo and title */}
      <Link href={'/products'} passHref>
        <a className='flex items-center '>
          <img
            src='https://e7.pngegg.com/pngimages/644/743/png-clipart-a-o-t-wings-of-freedom-eren-yeager-bertholdt-hoover-attack-on-titan-logo-others-angle-emblem.png'
            alt=''
            className='mx-2 h-6 rounded-full md:h-12 hover:bg-gray-800'
          />
          <h2 className='flex font-bold mr-2'>
            AOT <span className='ml-1 hidden md:block'>Commerce</span>
          </h2>
        </a>
      </Link>

      <form
        className='my-auto mx-auto flex max-w-3xl flex-1 items-stretch text-slate-900'
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <input
          type='text'
          className='w-5/6 rounded-l border-none px-2 outline-none h-6 md:h-10'
          placeholder='Cherchez un produit, une marque ou une catégorie'
          onChange={handleChange}
          //value={searchTerm||''}
        />

        <button
          className='border-1 h-6 rounded-r border-black bg-amber-400 px-1 hover:bg-amber-500 md:px-2 md:h-10 lg:px-3 '
          type='submit'
        >
          <SearchOutlinedIcon />
        </button>
      </form>
      <div
        className={`fixed z-40 top-14 left-60 right-60 ${
          !suggestions && 'hidden'
        }`}
      >
        <ul className='flex overflow-scroll  flex-col rounded'>
          {suggestions.map(({ id, name, img }) => (
            <li>
              <Link href={`/products/${id}`} passHref>
                <a className='flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer bg-white'>
                  <p className='text-gray-600'>{name}</p>
                  <img src={img} alt='' className='h-12 object-contain' />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Basket */}
      <div className='mx-2 hidden md:block'>
        <Link href={'/checkout'} passHref>
          <a className='hover:cursor-pointer'>
            <ShoppingCartIcon className='h-5 md:h-12' />
            <span className='text-amber-600 ml-0 mr-1 font-bold md:ml-2 md:mr-3'>
              {localBasket.length || 0}
            </span>
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
