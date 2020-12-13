import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd'

//路由
import menu from '../../router/menu.js'

class AsideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: ''
    }
  }

  //初始化
  componentDidMount() {
    const { pathname } = this.props.location
    this.setState({
      selectedKey: pathname
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
    const { selectedKey } = this.state
    return (
      <Fragment>
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

export default withRouter(AsideMenu);