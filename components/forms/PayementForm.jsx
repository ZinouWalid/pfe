import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useStateValue } from '../../React-Context-Api/context'
import { Country, State, City } from 'country-state-city'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../React-Context-Api/reducer'
import { clearBasket } from '../../React-Context-Api/basketActions'

export default function Login() {
  const [{}, dispatch] = useStateValue()

  //we use an object that contains all variables as a global state instead of declaring each variable individualy which a better approach
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    region: '',
    city: '',
  }
  const [values, setValues] = useState(initialValues)

  const [basket, setBasket] = useState([])

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem('basket')))
  }, [])
  console.log("Payement basket : ",basket);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(),
        ...values,
        products: basket,
        totalAmount: parseInt(getBasketTotal(basket) || 0) + 20,
      }),
    })
    //clear the basket after validating the Order
    //dispatch(clearBasket)

    console.log('Order Validated')
    //return to page 01
    window.location.href = '/products/pages/page_1'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <div className="flex bg-gray-100 p-2">
      <div className="border-primaryBorder shadow-default m-auto w-full max-w-xl rounded-lg border bg-white px-1">
        <div className="text-primary m-6">
          <div className="mt-3 flex items-center justify-center">
            <h1 className="text-primary mt-4 mb-2 text-2xl font-medium">
              Validate your order
            </h1>
          </div>
          <form
            action="/checkout/delivery"
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            {/* ----Nom----- */}
            <label className="text-left">
              Quel est votre nom? <i className="text-red-500">*</i>
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="f_name"
              name="firstName"
              placeholder="First Name"
              value={values.firstName}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />

            {/* ----Prénom----- */}
            <label className="text-left">
              Quel est votre prénom? <i className="text-red-500">*</i>
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="l_name"
              name="lastName"
              placeholder="Last Name"
              value={values.lastName}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />

            {/* ----Telephone----- */}
            <label>
              Quel est votre numéro de téléphone?{' '}
              <i className="text-red-500">*</i>
            </label>
            <div className="flex">
              <p
                className={
                  'text-primary mb-4 rounded-md border p-2 text-sm outline-none'
                }
              >
                +213
              </p>
              <input
                name="phoneNumber"
                type="tel"
                value={values.password}
                onChange={handleInputChange}
                placeholder="0000 000 000"
                className={
                  'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
                }
              />
            </div>

            {/* -----Email------ */}
            <label className="text-left">
              Quel est votre adresse mail? <i className="text-red-500">*</i>
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              id="email"
              placeholder="E-mail"
              name="email"
              value={values.email}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />

            {/* ----Adresse----- */}
            <label className="text-left">
              Quel est votre adresse? <i className="text-red-500">*</i>
            </label>
            <textarea
              onChange={handleInputChange}
              type="text"
              id="address"
              placeholder="Address"
              name="address"
              value={values.address}
              rows="4"
              cols="50"
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />

            {/* ----Region----- */}
            <label className="text-left">
              région <i className="text-red-500">*</i>
            </label>
            <select
              name="region"
              value={values.region}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              {City.getCitiesOfCountry('DZ').map((region) => (
                <option value={region.stateCode}>
                  {region.stateCode + ' - ' + region.name}
                </option>
              ))}
            </select>

            {/* ----Cité----- */}
            <label className="text-left">
              cité <i className="text-red-500">*</i>
            </label>
            <select
              name="city"
              value={values.city}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              {City.getCitiesOfState('DZ', values.region).map((city) => (
                <option value={city.name}>{city.name}</option>
              ))}
            </select>

            {/* --------------PAYEMENT-------------- */}
            <div className="mx-auto my-2 w-full border border-amber-500"></div>

            <div className="mx-auto mb-4 mt-2 flex w-full flex-col items-center">
              <h1 className="mt-2 mb-4 border-b border-gray-500 text-xl font-bold">
                PAYEMENT
              </h1>

              <div className="mb-6 flex flex-col items-center justify-between">
                <div className="flex items-center justify-center">
                  <input type="radio" name="payement" id="payement" checked />
                  <img
                    src="https://static.jumia.dz/cms/Icons/payment_logo/i-service-cash.png"
                    alt=""
                    className="mx-4"
                  />
                  <p>Cash on delivery</p>
                </div>
                <p className="my-6 w-10/12 text-sm text-gray-600">
                  Pay for your order on delivery: <br />
                  <strong>.</strong> In cash, be sure to have the exact amount
                  of payment. Our deliverers do not have change. <br />
                  <strong>.</strong> Payment will be made directly to the
                  delivery provider.
                </p>
                <div className="w-8/12">
                  <CurrencyFormat
                    renderText={(value) => (
                      <div className=" flex flex-col">
                        <div className="flex justify-between">
                          <div> Total of Articles</div>
                          <div className="font-bold"> {value} DA</div>
                        </div>
                        <p className="flex justify-between">
                          Delivery Amount<strong>20 DA</strong>
                        </p>
                        <div className="mx-auto my-2 w-full border border-gray-500"></div>
                        <p className="flex justify-between">
                          Total
                          <i className="font-bold text-green-600">
                            {parseInt(value) + 20} DA
                          </i>
                        </p>
                      </div>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket) || 0} // Part of the homework
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <button
                    className={
                      'text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                    }
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
