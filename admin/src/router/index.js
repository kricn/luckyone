import Loadable from './loadable.js'

const router = [
  {
    path: '/',
    redirect: true
  },
  {
    path: '/admin',
    redirect: true
  },
  {
    path: '/login',
    component: Loadable(() => import('../views/login'))
  }
]

export default router