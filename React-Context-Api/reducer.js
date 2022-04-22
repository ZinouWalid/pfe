import {
  ADD_TO_BASKET,
  CLEAR_BASKET,
  REMOVE_FROM_BASKET,
} from './basketActions'
import {
  FILTER_PRODUCTS,
  SEARCH_PRODUCTS,
  UPDATE_QUANTITY,
} from './productsActions'
import { setCookie, removeCookie } from '../lib/useCookie'

//Basket empty
export const initialState = {
  basket: [],
  products: [],
  filteredProducts: [],
}

//Selector
//0 is initial value of amount
export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) =>
      parseInt(item.price?.split(' ')[0]) * parseInt(item.quantity) + amount,
    0
  )

//The reducer is always listening and when we dispatch an action t's gonna get manipulated by the reducer and do some actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      console.log('ADD_TO_BASKET : ')

      //check if the product is already in the basket
      const isProductInBasket = state.basket.find(
        (product) => product.id == action.payload.id
      )
      //if the product is already in the basket we break
      if (isProductInBasket) {
        break
      }

      //remove old basket and add the new one to the cookie
      removeCookie('basket')
      setCookie('basket', [...state.basket, action.payload])
      console.log(
        'Reducer Basket : ',
        JSON.stringify([...state.basket, action.payload])
      )
      return { ...state, basket: [...state.basket, action.payload] }

    case REMOVE_FROM_BASKET:
      console.log('REMOVE_FROM_BASKET')
      //"findIndex" will find only the first item that match the id and it's going to return it
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )

      let newBasket = [...state.basket]
      if (index >= 0) {
        //we found it, and remove it

        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Can't remove the product (id: ${action.id}) as it's not in your basket.`
        )
      }

      //remove old basket and add the new one to the cookie
      removeCookie('basket')
      setCookie('basket', newBasket)

      console.log('Reducer Basket : ', JSON.stringify(newBasket))
      return { ...state, basket: newBasket }

    case UPDATE_QUANTITY:
      const basket = state.basket.map((product) =>
        product.id === action.payload.id && product.name === action.payload.name
          ? action.payload
          : product
      )
      console.log('UPDATE_QUANTITY : ', basket)

      //remove old basket and add the new one to the cookie
      removeCookie('basket')
      setCookie('basket', basket)
      return {
        ...state,
        basket: basket,
      }

    case CLEAR_BASKET:
      //remove the basket from localStorage after we validate the order
      //localStorage.removeItem('basket')
      removeCookie('basket')
      return { ...state, basket: [] }

    case SEARCH_PRODUCTS:
      console.log('Reducer data : ', action.payload)
      return { ...state, products: action.payload }

    case FILTER_PRODUCTS:
      return { ...state, filteredProducts: action.payload }

    default:
      return state
  }
}

export default reducer
