import { Redirect } from 'react'

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
    }
  },
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
  }
]

export default menu;