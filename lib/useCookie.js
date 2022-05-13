import Cookies from 'js-cookie'

export function getCookie(key) {
  let result = []
  if (key) {
    if (localStorage.getItem(key) !== 'undefined') {
      console.log('getCookie : ', JSON.parse(localStorage.getItem('basket')))
      setCookie(key, JSON.parse(localStorage.getItem(key)))
    }
    const localData = Cookies.get(key)
    // console.log('My cookie : ', Cookies.get(key))
    if (localData && localData !== 'undefined') {
      //console.log('My cookie : ', Cookies.get('riderSession'))

      result = JSON.parse(localData)
    }
  }
  if (result) return result
  return null
}

export function setCookie(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  Cookies.set(key, JSON.stringify(value))
}

export function removeCookie(key) {
  localStorage.removeItem(key)
  Cookies.remove(key)
}
