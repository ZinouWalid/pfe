import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { getCookie } from '../lib/useCookie'
import { getBasketTotal } from '../React-Context-Api/reducer'

function Subtotal() {
  const [basket, setBasket] = useState([])

  useEffect(() => {
    setBasket(getCookie('basket'))
    //--------------------------------------------------------------
  }, [basket])

  return (
    <div className="flex h-32 w-full max-w-xl flex-col justify-between rounded border border-gray-300 bg-gray-100 p-2 md:p-5">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket?.length || 0} items):
              <strong> {value} DA</strong>
            </p>
            <small className="subtotal__gift">
              <p>Delivery costs not included at this stage</p>
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket) || 0} // Part of the homework
        displayType={'text'}
        thousandSeparator={true}
      />
      <Link href="/checkout/delivery">
        <button
          disabled={basket.length == 0}
          className="h-8 w-full rounded-sm border border-amber-500 bg-amber-400 hover:bg-amber-500"
        >
          Proceed to Checkout
        </button>
      </Link>
    </div>
  )
}

export default Subtotal
