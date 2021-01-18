import React from 'react'
import { Redirect, Route} from 'react-router-dom'

// import store from '@/store'

//方法
import { getToken } from '../../utils/session.js'

const  PrivateRouter = (props) => {
  const { isAuth, meta, children, ...route } = props
  if (meta && meta.auth) {
    return getToken() ? 
        isAuth === '1' ?
        <Route {...route} /> : 
        <Redirect to="/login" /> : 
        <Redirect to="/login" />
  } else {
  	return <Route {...route} />
  }
}

export default PrivateRouter;