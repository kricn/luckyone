import React, { useEffect, useState } from 'react'
import { Redirect, Route} from 'react-router-dom'

import store from '@/store'
import { getCurrent } from '@/api/account'

//方法
import { getToken } from '../../utils/session.js'

// const  PrivateRouter = (props) => {
//   const { isAuth, meta, children, ...route } = props
//   if (meta && meta.auth) {
//     return getToken() ? 
//         isAuth === '1' ?
//         <Route {...route} /> : 
//         <Redirect to="/login" /> : 
//         <Redirect to="/login" />
//   } else {
//   	return <Route {...route} />
//   }
// }

const  PrivateRouter = (props) => {
  const [user, setUser] = useState(store.getState().appReducer.user)
  useEffect(() => {
    store.subscribe(() => {
      setUser(store.getState().appReducer.user)
    })
  })
  const { meta, children, ...route } = props
  if (meta && meta.auth) {
    const token = getToken()
    if (token) {
      if (!user) {
        getCurrent().then(res => {
          store.dispatch({type: 'SETUSER', payload: res.data})
        }).catch(err => {
            console.log(err)
        })
        return false
      }
      const role = user && user.role
      if (!meta.role || (meta.role && role === 1)) {
        return <Route {...route} />
      } 
      return <>404</>
    } else {
      return <Redirect to="/login" />
    }
  } else {
  	return <Route {...route} />
  }
}


export default PrivateRouter;