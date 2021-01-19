const token = 'token'
const isAuth = 'isAuth'

export const setToken = value => {
  localStorage.setItem(token, value)
}
export const getToken = () => {
  return localStorage.getItem(token)
}

export const setAuth = value => {
  localStorage.setItem(isAuth, value)
}
export const getAuth = () => {
  return localStorage.getItem(isAuth)
}