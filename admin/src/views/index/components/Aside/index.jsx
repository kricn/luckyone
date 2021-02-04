import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd'
import { MenuFoldOutlined} from '@ant-design/icons'

import { deepCopy } from '@/utils/common'

import store from '@/store'
// api

// function
import { getCurrentUser } from '@/utils/common'
import style from './index.module.scss'
import logo from '@/image/yz.jpg'


const { SubMenu } = Menu
class Aside extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: '',
      menu: []
    }
  }

  //初始化
  componentDidMount() {
    const { pathname } = this.props.location
    const { menu } = this.props
    this.setState({
      selectedKey: pathname,
      menu: this.filterRoutes(deepCopy(menu))
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location
    this.setState({
      selectedKey: pathname
    })
  }

  //过滤动态路由和不显示路由和没有权限路由
  filterRoutes = routes => {
    const user = store.getState().appReducer.user
    const role = user && user.role
    if (!user) {
      getCurrentUser()
      return false;
    }
    return routes.filter(item => {
      if (item.children && item.children.length > 0) {
        item.children = this.filterRoutes(item.children)
      }
      if (item.meta && item.meta.role && role !== 1) {
        return false
      }
      return !(item.meta && item.meta.noMenu) && !item.path.includes(':')
    })
  }

  //渲染菜单
  renderMenu = ({ meta, path, children }) => {
    if (!meta) {
      return false;
    }
    return children && children.length > 0 ? 
      (
        <SubMenu key={path} title={meta.title} icon={React.createElement(meta.icon)}>
          {
            children.map(i => {
              return (<Menu.Item key={i.path}  icon={React.createElement(meta.icon)}>
                <Link to={i.path}>{i.meta.title}</Link>
              </Menu.Item>)
            })
          }
        </SubMenu>
      )
      : 
      (
        <Menu.Item key={path} icon={React.createElement(meta.icon)}>
          <Link to={path}>{meta.title}</Link>
        </Menu.Item>
      )
  }

  //选择菜单
  selectMenu = ({key}) => {
    this.setState({
      selectedKey: key
    })
  }

  //收缩菜单
  triggleMenu = () => {
    this.props.triggleMenu()
  }

  render() {
    const { selectedKey, menu } = this.state
    return (
      <>
        <div className={style.logo}>
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          onClick={this.selectMenu}
        >
          {
            menu && menu.map(item => {
              return this.renderMenu(item)
            })
          }
        </Menu>
        <div
          className={style.trggier}
          onClick={this.triggleMenu}
        >
          <MenuFoldOutlined />
        </div>
      </>
    )
  }
}

export default withRouter(Aside);