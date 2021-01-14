import { Redirect } from 'react-router-dom'

import LazyLoad from './loadable'

const router = [
  { 
    path: '/', 
    exact: true, 
    render: () => <Redirect to='/alian/home' /> 
  },
  { 
    path: '/alian', 
    exact: true, 
    render: () => <Redirect to='/alian/home' /> 
  },
  {
    path: '/alian',
    component: LazyLoad(() => import('@/views/index')),
    meta: {
      auth: true
    }
  },
  {
  	path: '/login',
  	exact: true,
  	component: LazyLoad(() => import('@/views/Login'))
  },
  {
    path: '*',
    render: () => <div>404</div>
  }
]

export default router