//懒加载
import Loadable from './loadable.js'
//图标
import {
  BarChartOutlined
} from '@ant-design/icons'


const menu = [
  {
    path: '/admin/statistic',
    component: Loadable(() => import('../views/statistic')),
    meta: {
      title: '分析',
      icon: BarChartOutlined
    }
  }
]

export default menu;