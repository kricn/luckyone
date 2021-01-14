import React from 'react'
import { Redirect, Route} from 'react-router-dom'

//方法
import { getToken } from '../../utils/session.js'

const  PrivateRouter = (props) => {
  const { meta, children, ...route } = props
  if (meta && meta.auth) {
	return getToken() ? 
		<Route {...route} /> : 
		<Redirect to="/login" />
  } else {
  	return <Route {...route} />
  }
}

export default PrivateRouter;