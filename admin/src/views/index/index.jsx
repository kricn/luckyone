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
      collapsed: false,
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
    this.setState = () => null
  }

  //收缩菜单
  triggleMenu = broken => {
    if(broken !== undefined && !broken) return ;
    if (broken !== undefined && broken && this.state.collapsed) return ;
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  //渲染路由
  renderRoutes = routes => {
    return this.flatRoutes(routes).map(route => {
      return <PrivateRouter isAuth={this.state.isAuth} key={route.path} {...route} />
    })
  }

  //路由扁平化
  flatRoutes = routes => {
    return routes.reduce((total, item) => {
      if (item.children && item.children.length > 0) {
        total = total.concat(this.flatRoutes(item.children))
      }
      total.push(item)
      return total
    }, [])
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <Layout className={style.layout_wrap}>
          <Sider
            collapsible
            className={style.layout_sider}
            collapsed={this.state.collapsed}
            breakpoint="md"
            collapsedWidth={80}
            trigger={null}
            onBreakpoint={(broken) => this.triggleMenu(broken)}
          >
            <Aside
              menu={this.state.menu}
              triggleMenu={this.triggleMenu}
            />
          </Sider>
          <Layout className={style.layout_wrap_content}>
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