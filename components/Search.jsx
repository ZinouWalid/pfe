import React, { useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
//import './Search.css'

function Search() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/products'
      )
      const data = await response.json()
      setItems(data)
    }
    fetchItems()
  }, [])

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log('Hover :', result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log('Select :', item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <div className='flex justify-between z-10 bg-white'>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.name.toLowerCase()}
        </span>
        <img src={item.img} alt='' className='w-10 object-contain' />
      </div>
    )
  }

  return (
    <div>
      <header className='z-10 mt-40'>
        <div style={{ width: 600 }}>
          <ReactSearchAutocomplete
            items={items}
            resultStringKeyName={'tags'}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            placeholder='Cherchez un produit, une marque ou une catégorie'
            formatResult={formatResult}
            maxResults={5}
          />
        </div>
      </header>
    </div>
  )
}

export default Search
