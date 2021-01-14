//图标
import {
  BarChartOutlined
} from '@ant-design/icons';

import LazyLoad from './loadable'

const menu = [
  {
    path: '/alian/home',
    component: LazyLoad(() => import('@/views/Home')),
    exact: true,
    meta: {
      title: '分析',
      icon: BarChartOutlined,
      auth: true,
      role: ['user', 'admin']
    },
    children: [
      // {
      //   path: '/alian/home/hello',
      //   component: LazyLoad(() => import('@/views/Login')),
      //   exact: true,
      //   meta: {
      //     title: '子分析',
      //     icon: BarChartOutlined,
      //     auth: true,
      //     role: ['user', 'admin']
      //   },
      // }
    ]
  },
  // {
  //   path: '/alian/home/:id',
  //   component: LazyLoad(() => import('@/views/login')),
  //   exact: true,
  //   meta: {
  //     auth: true,
  //     role: ['user', 'admin']
  //   }
  // },
  {
    path: '/alian/setting',
    component: LazyLoad(() => import('@/views/setting')),
    exact: true,
    meta: {
      title: 'setting',
      icon: BarChartOutlined,
      auth: true,
      role: ['admin']
    }
  },
  {
    path: '*',
    render: () => <div>404</div>
  }
]

export default menu;