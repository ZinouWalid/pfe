import { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HelpIcon from '@mui/icons-material/Help'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Link from 'next/link'
import { getCookie } from '../lib/useCookie'
import { useStateValue } from '../React-Context-Api/context'

const Sidebar = ({ showSidebar, hideFilters }) => {
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState([])
  const [localBasket, setLocalBasket] = useState([])
  const [{ basket }, dispatch] = useStateValue()

  //filter products after we search
  let filteredProducts = []

  useEffect(() => {
    function updateBasket() {
      setLocalBasket(getCookie('basket'))
    }
    updateBasket()
  }, [basket])

  //Fetch the categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/categories'
      )
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])
  return (
    <aside
      className={` md:w-60 max-w-xs z-30 absolute top-14 lg:top-16 left-0 flex items-start  h-full py-4  rounded-r bg-slate-900 opacity-95 overflow-y-scroll
         ${showSidebar ? 'translate-x-0 ' : '-translate-x-full'}`}
    >
      <ul className=''>
        <li>
          <Link href='/' passHref>
            <a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <HomeIcon className='text-gray-200' />
              <span className='ml-3'>Home</span>
            </a>
          </Link>
        </li>
        {!hideFilters && (
          <li className=''>
            <button
              className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              onClick={() => setShowFilters(!showFilters)}
            >
              <p className='text-gray-400'>
                <FilterAltIcon />
              </p>
              <span
                className='flex-1 ml-3 text-left whitespace-nowrap'
                sidebar-toggle-item
              >
                Filtrer
              </span>
              <p className='text-white '>
                {showFilters ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </p>
            </button>
            <ul
              id='dropdown-example'
              className={`${showFilters && 'hidden'} py-2 space-y-2`}
            >
              {categories.map((cat, index) =>
                cat.key == 'all' ? (
                  <li className='box-border '>
                    <Link href={`/products/pages/page_1`} passHref>
                      <a className='flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
                        <p className='hover:cursor-pointer'>{cat.value}</p>
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li className='box-border'>
                    <Link href={`/products/categories/${cat.key}`} passHref>
                      <a
                        className='flex items-center p-2 pl-11 w-full text-base  font-normal text-gray-900 rounded-lg transition duration-75 
                        group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                      >
                        <p className='hover:cursor-pointer'>{cat.value}</p>
                      </a>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </li>
        )}
        <li>
          <Link href='#' passHref>
            <a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <p className='text-gray-400'>
                <NotificationsIcon />
              </p>
              <span className='flex-1 ml-3 whitespace-nowrap'>
                Notification
              </span>
              <span className='inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-amber-600 dark:text-blue-200'>
                3
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='/checkout' passHref>
            <a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <p className='text-gray-400'>
                <ShoppingCartIcon />
              </p>
              <span className='flex-1 ml-3 whitespace-nowrap'>Panier</span>
              <span className='inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-amber-600  dark:text-blue-200'>
                {localBasket?.length}
              </span>
            </a>
          </Link>
        </li>
        {/* //-------------------------------------------------- */}
        <div className='border-gray-500 border'></div>
        <li>
          <Link href='#' passHref>
            <a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Sign In</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='#' passHref>
            <a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Sign Up</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='#' passHref>
            <a className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <p className='text-gray-400'>
                <HelpIcon />
              </p>
              <span className='flex-1 ml-3 whitespace-nowrap'>Aide</span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
