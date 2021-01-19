import React, { Component } from 'react';
import {  Switch } from 'react-router-dom';

import { Layout } from 'antd';

import menu from '@/router/menu'

//自定义组件
import Aside from './components/Aside'
import AHeader from './components/AHeader'
import PrivateRouter from '@/components/praviteRouter'

import style from './index.module.scss'

import store from '@/store'

import { getAuth } from '@/utils/session.js'

const { Header, Sider, Content } = Layout

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menu: [],
      loading: true,
      isAuth: getAuth('isAuth') || '0'
    }
  }

  componentDidMount() {
    //模拟异步请求
    //可以设置一个loading来处理异步请求
    this.setState({
      menu: menu,
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
        <Layout className={style.layout_wrap}>
          <Sider
            className={style.layout_sider}
            collapsed
          >
            <Aside
              menu={this.state.menu}
            />
          </Sider>
          <Layout>
            <Header className={style.layout_header}>
              <AHeader />
            </Header>
            <Content className={style.layout_content}>
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