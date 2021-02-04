const token = 'token'

export const setToken = value => {
  localStorage.setItem(token, value)
}
export const getToken = () => {
  return localStorage.getItem(token)
}