import Cookies from 'js-cookie'

export function getCookie(key) {
  let result = []
  if (key) {
    if (localStorage.getItem(key)?.length > 0) {
      setCookie(key, JSON.parse(localStorage.getItem(key)))
    }
    const localData = Cookies.get(key)
    if (localData && localData.length > 0) {
      result = JSON.parse(localData)
    }
  }

  return result
}

export function setCookie(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  Cookies.set(key, JSON.stringify(value))
}

export function removeCookie(key) {
  localStorage.removeItem(key)
  Cookies.remove(key)
}
