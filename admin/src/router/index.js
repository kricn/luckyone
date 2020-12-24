import { Redirect } from 'react-router-dom'

import Index from '@/views/index'
import Login from '@/views/login'

import menu from './menu'

const router = [
  { path: '/', exact: true, render: () => <Redirect to='/alian/home' /> },
  { path: '/alian', exact: true, render: () => <Redirect to='/alian/home' /> },
  {
    path: '/alian',
    component: Index,
    routes: menu
  },
  {
  	path: '/login',
  	exact: true,
  	component: Login
  }
]

export default router