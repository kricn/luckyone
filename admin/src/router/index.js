import { Redirect } from 'react-router-dom'

import Index from '@/views/index'

import menu from './menu'

const router = [
  { path: '/', exact: true, render: () => <Redirect to='/alian' /> },
  {
    path: '/alian',
    component: Index,
    routes: menu
  },
]

export default router