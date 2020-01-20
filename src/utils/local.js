import Cookies from 'js-cookie'

/**
 * 对于本地存储操作的封装
 */
export function getToken() {
  return Cookies.get("token")
}

export function setToken(token) {
  return Cookies.set("token",token)
}

export function removeToken() {
  return Cookies.remove("token")
}

export function getKey(Infor) {
  return sessionStorage.get(Infor)
}

export function setKey(key,value) {
  sessionStorage.key = value
}

export function removeKey(key) {
  return sessionStorage.remove(key)
}


