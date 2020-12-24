import { lazy } from 'react';
//图标
import {
  BarChartOutlined
} from '@ant-design/icons';

import { Redirect } from 'react-router';
import LazyLoad from './loadable'

import Home from '@/views/statistic/index'
import Login from '@/views/login/index'

const menu = [
  {
    path: '/alian/home',
    component: LazyLoad(Home),
    exact: true,
    meta: {
      title: '分析',
      icon: BarChartOutlined
    }
  },
  {
    path: '/alian/test',
    component: LazyLoad(Login),
    exact: true,
    meta: {
      title: 'test',
      icon: BarChartOutlined
    }
  }
]

export default menu;