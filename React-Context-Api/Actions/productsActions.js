export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS'
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
export const UNFILTER_PRODUCTS = 'UNFILTER_PRODUCTS'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'


export const searchProducts = function (products) {
  return {
    type: SEARCH_PRODUCTS,
    payload: products,
  }
}

export const filterProducts = function (products) {
  return {
    type: FILTER_PRODUCTS,
    payload: products,
  }
}

export const unfilterProducts = function () {
  return {
    type: UNFILTER_PRODUCTS,
  }
}

export const updateQuantity = function (product) {
  return {
    type: UPDATE_QUANTITY,
    payload: product,
  }
}