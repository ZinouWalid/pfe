import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../React-Context-Api/reducer'
//node package for countries and cities to get user address
import { Country, State, City } from 'country-state-city'
import { clearBasket } from '../../React-Context-Api/basketActions'
import { useStateValue } from '../../React-Context-Api/context'

const AdresseForm = () => {
  const [{}, dispatch] = useStateValue()

  //we use an object that contains all variables as a global state instead of declaring each variable individualy which a better approach
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    region: '',
    city: '',
  }
  const [values, setValues] = useState(initialValues)

  const [basket, setBasket] = useState([])

  useEffect(() => {
    setBasket(JSON.parse(sessionStorage.getItem('basket')))
  }, [basket])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(),
        ...values,
        totalAmount: parseInt(getBasketTotal(basket) || 0) + 20,
      }),
    })
    //clear the basket after validating the Order
    dispatch(clearBasket)

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
    <div className="mx-auto mt-4 flex w-4/6 flex-col items-center">
      <h1 className="mt-2 mb-4 border-b border-gray-500 text-xl font-bold">
        ADRESSE
      </h1>
      <form
        action="/checkout/delivery"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="flex justify-between">
          <div className="my-4 flex flex-col" key={"1"}>
            <label htmlFor="f_name">first name * </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="f_name"
              name="firstName"
              placeholder="First Name"
              className="border border-gray-400 p-1 outline-none"
              value={values.firstName}
              required
            />
          </div>
          <div className="my-4 flex flex-col" key={"2"}>
            <label htmlFor="l_name">last name *</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="l_name"
              name="lastName"
              placeholder="Last Name"
              className="border border-gray-400 p-1 outline-none"
              value={values.lastName}
              required
            />
          </div>
        </div>
        <div className="my-4 flex flex-col" key={"3"}>
          <label htmlFor="phone">phone number *</label>
          <div className="flex">
            <p className="border border-gray-400 p-1">+213</p>
            <input
              onChange={handleInputChange}
              type="tel"
              id="phone"
              name="phoneNumber"
              placeholder="0000 000 000"
              className="flex-1 border border-gray-400 p-1 outline-none"
              value={values.phoneNumber}
              required
            />
          </div>
        </div>
        <div className="my-4 flex flex-col" key={"4y"}>
          <label htmlFor="address">address *</label>
          <textarea
            onChange={handleInputChange}
            type="text"
            id="address"
            placeholder="Address"
            name="address"
            className="border border-gray-400 p-1 outline-none"
            value={values.address}
            rows="4"
            cols="50"
            required
          />
        </div>
        <div className="my-4 flex flex-col" key={"5"}>
          <label>region *</label>
          <select
            name="region"
            className="p-2 outline-none"
            onChange={handleInputChange}
            value={values.region}
            required
          >
            <option value="">Choose a region</option>

            {City.getCitiesOfCountry('DZ').map((region) => (
              <option value={region.stateCode}>
                {region.stateCode + ' - ' + region.name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4 flex flex-col" key={"6"}>
          <label>city *</label>
          <select
            name="city"
            className="p-2 outline-none"
            value={values.city}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose a city</option>

            {City.getCitiesOfState('DZ', values.region).map((city) => (
              <option value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
        <p className="text-left text-red-500">* Champs requis</p>
        {/* --------------PAYEMENT-------------- */}
        <div className="mx-auto my-6 w-full border border-amber-500"></div>

        <div className="mx-auto mb-4 mt-2 flex w-3/4 flex-col items-center" key={"7"}>
          <h1 className="mt-2 mb-4 border-b border-gray-500 text-xl font-bold">
            PAYEMENT
          </h1>

          <div className="mb-6 flex flex-col items-center justify-between">
            <div className="flex items-center justify-center">
              <input
                onChange={(e) => {
                  handleInputChange(e)
                }}
                type="radio"
                name="payement"
                id="payement"
                checked
              />
              <img
                src="https://static.jumia.dz/cms/Icons/payment_logo/i-service-cash.png"
                alt=""
                className="mx-4"
              />
              <p>Cash on delivery</p>
            </div>
            <p className="my-6 w-fit text-sm text-gray-600">
              Pay for your order on delivery: <br />
              <strong>.</strong> In cash, be sure to have the exact amount of
              payment. Our deliverers do not have change. <br />
              <strong>.</strong> Payment will be made directly to the delivery
              provider.
            </p>
            <div>
              <CurrencyFormat
                renderText={(value) => (
                  <div className=" flex flex-col justify-between">
                    <div className="flex w-full flex-1 justify-between">
                      <div> Total of Articles</div>
                      <div className="font-bold"> {value} DA</div>
                    </div>
                    <p>
                      Delivery Amount<strong>20DA</strong>
                    </p>
                    <p>
                      Total
                      <i className="font-bold text-green-600">
                        {parseInt(value) + 20}DA
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
            <button
              type="submit"
              className="mt-5 w-1/2 rounded border border-amber-500 bg-amber-300 p-1 font-bold hover:border-amber-600 hover:bg-amber-500"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdresseForm
