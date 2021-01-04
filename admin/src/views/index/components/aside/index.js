import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd'


import './index.scss'
import logo from '@/image/yz.jpg'


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
      menu
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location
    this.setState({
      selectedKey: pathname
    })
  }

  //渲染菜单
  renderMenu = ({ meta, path }) => {
    if (!meta) {
      return false;
    }
    return (
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

  render() {
    const { selectedKey, menu } = this.state
    return (
      <Fragment>
        <div className="logo">
          <img src={logo} alt="logo" />
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
      </Fragment>
    )
  }
}

export default withRouter(Aside);