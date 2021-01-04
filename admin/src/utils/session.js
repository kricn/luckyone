const token = 'token'
export const setToken = value => {
  sessionStorage.setItem(token, value)
}
export const getToken = () => {
  return sessionStorage.getItem(token)
}