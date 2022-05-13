import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import InventoryIcon from '@mui/icons-material/Inventory'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { filterProducts } from '../React-Context-Api/Actions/productsActions'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { getCookie, removeCookie } from '../lib/useCookie'
import Sidebar from './Sidebar'
import * as Realm from 'realm-web'
import { useStateValue } from '../React-Context-Api/context'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

function Header({ hideSearch, hideBasket, hideOptions }) {
  const { data: session, status } = useSession()
  const [suggestions, setSuggestions] = useState([])
  const [products, setProducts] = useState([])
  const [{ basket, client }, dispatch] = useStateValue()
  const [searchTerm, setSearchTerm] = useState('')
  //logged user session
  const [user, setUser] = useState({})
  const [localBasket, setLocalBasket] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  //filter products after we search
  let filteredProducts = []

  //Get the updated Basket
  useEffect(() => {
    function updateBasketAndClient() {
      setLocalBasket(getCookie('basket'))
      setUser(getCookie('clientSession'))
    }
    updateBasketAndClient()
  }, [basket,client])

  //fetching the products to use them in filtering the user search
  useEffect(() => {
    console.log('Session.user : ', session?.user, ' status : ', status)
    const fetchProducts = async () => {
      const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
      const app = new Realm.App({ id: REALM_APP_ID })
      const credentials = Realm.Credentials.anonymous()
      let dbProducts = {}
      try {
        const user = await app.logIn(credentials)
        dbProducts = await user.functions.getAllProducts()
      } catch (error) {
        console.error(error)
      }

      setProducts(dbProducts)
    }
    fetchProducts()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuggestions([]) //hide the suggestions bar
    console.log('Submit Search Form')
    products.map((product) => {
      searchTerm.split(' ').map((word) => {
        if (product.tags.join('').includes(word)) {
          filteredProducts.push(product)
        }
      })
    })
    //Check if we found any matches
    filteredProducts?.length > 0
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

      console.log('SUGGESTIONS  : ', allSuggestions)
      setSuggestions(allSuggestions)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = async (e) => {
    setSearchTerm(e.target.value.toLowerCase())
    console.log('CHANGEEE !!', searchTerm)
    searchTerm?.length > 2 ? await fetchSuggestions() : setSuggestions([])
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  const handleSignOut = () => {
    //deleting the rider session cookie
    removeCookie('clientSession')

    signOut({ callbackUrl: 'http://localhost:3000' })
  }

  return (
    <nav
      className='fixed top-0 left-0 right-0 flex justify-between h-14 w-full items-center bg-slate-900 text-white lg:h-16 z-30'
      onClick={() => setSuggestions([])}
    >
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className='lg:hidden ml-2 md:mx-4 text-amber-500 hover:bg-gray-800 hover:rounded-full p-1 md:scale-125 z-20 cursor-pointer '
      >
        <p className='font-bold text-2xl hover:text-3xl'>
          <MenuIcon />
        </p>
      </button>
      {showSidebar && (
        <Sidebar showSidebar={showSidebar} hideFilters={hideSearch} />
      )}
      {/* Logo and title */}
      <Link href={'/'} passHref>
        <a className='flex items-center p-1 mr-auto'>
          <Image
            src='https://w7.pngwing.com/pngs/49/257/png-transparent-grocery-store-shopping-bags-trolleys-supermarket-grocery-miscellaneous-food-photography.png'
            alt=''
            width='45'
            height='45'
            priority
            objectFit='cover'
            className='rounded-full'
          />
          <h2 className='flex font-semibold mr-2 hover:bg-gray-800 rounded-full p-1 uppercase text-xl'>
            9odyani
          </h2>
        </a>
      </Link>

      {!hideSearch && (
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
            value={searchTerm}
            onChange={handleChange}
          />

          <button
            className='border-1 h-6 rounded-r border-black bg-amber-400 px-1 hover:bg-amber-500 md:px-2 md:h-10 lg:px-3 '
            type='submit'
          >
            <SearchOutlinedIcon />
          </button>
        </form>
      )}
      <div
        className={`fixed z-40 top-14 left-60 right-60 ${
          !suggestions && 'hidden'
        }`}
      >
        {suggestions?.length > 2 && (
          <ul className='flex overflow-hidden flex-col rounded border border-slate-700'>
            {suggestions.map(({ id, name, img }) => (
              <li key={id}>
                <Link href={`/client/products/${id}`} passHref>
                  <a className='flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer bg-white'>
                    <p className='text-gray-600'>{truncate(name, 100)}</p>
                    <Image src={img} alt={name} height={40} width={35} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ----------Authentication + Options------------ */}
      {!hideOptions && (
        <div className='relative ml-auto'>
          <div className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg group hover:text-amber-500 '>
            {user ? (
              <p className='text-white'>
                Bonjour,
                <span className='font-semibold'> {user.name}</span>
              </p>
            ) : (
              <div>
                <Link href='/client/auth/signin' passHref>
                  <a
                    className={
                      'text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                    }
                  >
                    S&apos;identifier
                  </a>
                </Link>
              </div>
            )}
            <button
              className='text-white text-xs ml-2 p-1 rounded-full hover:bg-gray-800 '
              onClick={() => setShowOptions(!showOptions)}
            >
              {showOptions ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
          </div>

          {/* Notifications */}
          {showOptions && (
            <ul className='fixed bg-white text-slate-700 rounded top-12 w-fit border border-slate-600'>
              <li className='flex justify-between items-center hover:bg-gray-100 '>
                <Link
                  href={user ? '/client/notifications' : '/client/auth/signin'}
                  passHref
                >
                  <a className='capitalize text-sm p-3'>
                    <span className='mr-2'>
                      <NotificationsIcon />
                    </span>
                    notifications
                  </a>
                </Link>
              </li>

              {/* Orders */}
              <li className='flex justify-between items-center hover:bg-gray-100 '>
                <Link
                  href={user ? '/client/orders' : '/client/auth/signin'}
                  passHref
                >
                  <a className='capitalize text-sm p-3'>
                    <span className='mr-2'>
                      <InventoryIcon />
                    </span>
                    mes commandes
                  </a>
                </Link>

                {/* Deconnécte */}
              </li>
              {user && (
                <li
                  className='flex justify-between items-center hover:bg-gray-100 
                '
                >
                  <Link href='' passHref>
                    <button
                      className='capitalize text-sm p-3'
                      onClick={() => handleSignOut()}
                    >
                      <span className='mr-2'>
                        <LogoutIcon />
                      </span>
                      déconnecter
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* Basket */}
      {!hideBasket && (
        <div className='mx-2 hidden md:block '>
          <Link href={'/checkout'} passHref>
            <a className='hover:cursor-pointer'>
              <ShoppingCartIcon className='h-5 text-3xl md:h-12 hover:bg-slate-800 hover:text-amber-400 rounded-full p-1' />
              <span className='text-amber-600 ml-0 mr-1 font-bold md:ml-2 md:mr-3'>
                {localBasket?.length || 0}
              </span>
            </a>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Header
