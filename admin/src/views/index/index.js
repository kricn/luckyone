import React, { Component } from 'react';

import { Layout } from 'antd';

import menu from '@/router/menu'

//自定义组件
import Aside from './components/aside'
import PrivateRouter from '@/components/praviteRouter'

import { getToken } from '../../utils/session.js'

import './index.scss'

const { Header, Sider, Content } = Layout

export default class extends Component {

  constructor() {
    super()
    this.state = {
      menu: [],
      loading: true
    }
  }

  componentDidMount() {
    //模拟异步请求
    //可以设置一个loading来处理异步请求
    const role = getToken()
    this.setState({
      menu: menu.filter(i => {
        if (!i.meta.auth || !i.meta.role) {
          return true
        } else {
          return i.meta.role.indexOf(role) > -1
        }
      }),
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <Layout className="layout_wrap">
          <Sider
            collapsible
          >
            <Aside
              menu={this.state.menu}
            />
          </Sider>
          <Layout>
            <Header className="layout_header">头部</Header>
            <Content className="layout_content">
              {
                this.state.menu.map(route => {
                  return <PrivateRouter key={route.path} {...route} />
                })
              }
            </Content>
          </Layout>
        </Layout>
      )
    }
  }
}