import { lazy } from 'react';
//图标
import {
  BarChartOutlined
} from '@ant-design/icons';
import { Redirect } from 'react-router';


const menu = [
  {
    path: '/alian',
    exact: true,
    render: () => <Redirect to='/alian/home' />
  },
  {
    path: '/alian/home',
    component: lazy(() => import('@/views/statistic/index')),
    exact: true,
    meta: {
      title: '分析',
      icon: BarChartOutlined
    }
  },
  {
    path: '/alian/test',
    component: lazy(() => import('@/views/login/index')),
    exact: true,
    meta: {
      title: 'test',
      icon: BarChartOutlined
    }
  }
]

export default menu;