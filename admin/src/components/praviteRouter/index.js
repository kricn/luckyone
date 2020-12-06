import React from 'react'
import { Redirect, Route} from 'react-router-dom'

//方法
import { getToken } from '../../utils/session.js'

const  PrivateRouter = ({ component: Component, ...reset}) => {
  return (
    <Route {...reset} render={ routeProps => (
      getToken() ? <Component {...routeProps} /> : <Redirect to="/login" />
    )} />
  )
}

export default PrivateRouter;