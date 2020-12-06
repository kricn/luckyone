import React, { Component } from 'react'

import { Layout } from 'antd'

//自定义组件
import Aside from './components/aside'
import ContainerMain from '../../components/containerMain'

import './index.scss'

const { Header, Sider, Content } = Layout

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Layout className="layout_wrap">
        <Sider
          collapsible
        >
          <Aside />
        </Sider>
        <Layout>
          <Header className="layout_header">头部</Header>
          <Content className="layout_content">
            <ContainerMain />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index;