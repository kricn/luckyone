import React, { Component } from 'react';
import {  Switch } from 'react-router-dom';

import { Layout } from 'antd';

import menu from '@/router/menu'

//自定义组件
import Aside from './components/aside'
import PrivateRouter from '@/components/praviteRouter'

import { getRole } from '../../utils/session.js'

import './index.scss'

import store from '@/store'

const { Header, Sider, Content } = Layout

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menu: [],
      loading: true,
      isAuth: sessionStorage.getItem('isAuth') || '0'
    }
  }

  componentDidMount() {
    //模拟异步请求
    //可以设置一个loading来处理异步请求
    this.setState({
      menu: this.filterRoutes(menu),
      loading: false
    })
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        isAuth: store.getState().appReducer.isAuth
      })
    })
  }
  componentWillUnmount() {
    if(this.unsubscribe) {
        this.unsubscribe()
    }
  }

  //过滤路由注册
  filterRoutes = routes => {
    const role = getRole('role')
    return routes.filter(item => {
      return !item.meta || !item.meta.role || item.meta.role.indexOf(role) !== -1
    })
  }

  //渲染路由
  renderRoutes = routes => {
    return routes.map(route => {
      return route.children && route.children.length > 0 ?
        this.renderRoutes(route.children) :
        <PrivateRouter isAuth={this.state.isAuth} key={route.path} {...route} />
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
              <Switch>
                {
                  this.renderRoutes(this.state.menu)
                }
              </Switch>
            </Content>
          </Layout>
        </Layout>
      )
    }
  }
}