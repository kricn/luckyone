const token = 'token'
const role = 'role'

export const setToken = value => {
  sessionStorage.setItem(token, value)
}
export const getToken = () => {
  return sessionStorage.getItem(token)
}

export const getRole = () => {
  return sessionStorage.getItem(role)
}
export const setRole = value => {
  return sessionStorage.setItem(role, value)
}