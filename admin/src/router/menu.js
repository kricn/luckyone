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
      auth: true
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
  {
    path: '/alian/article',
    component: LazyLoad(() => import('@/views/Article')),
    exact: true,
    meta: {
      title: '文章管理',
      icon: BarChartOutlined,
      auth: true,
    },
    children: [
      {
        path: '/alian/article/create',
        component: LazyLoad(() => import('@/views/Article/CreateArticle')),
        exact: true,
        meta: {
          noMenu: true,
          auth: true,
        },
      },
      {
        path: '/alian/article/:id',
        component: LazyLoad(() => import('@/views/Article/EditArticle')),
        exact: true,
        meta: {
          noMenu: true,
          auth: true,
        },
      }
    ]
  },
  {
    path: '/alian/setting',
    component: LazyLoad(() => import('@/views/setting')),
    exact: true,
    meta: {
      title: 'setting',
      icon: BarChartOutlined,
      auth: true
    }
  },
  {
    path: '*',
    render: () => <div>404</div>
  }
]

export default menu;