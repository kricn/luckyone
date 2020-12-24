import React, { Suspense, memo } from 'react';

import { Layout, Spin } from 'antd';

//自定义组件
import Aside from './components/aside'

import './index.scss'

const { Header, Sider, Content } = Layout

export default memo (function Index ( props ) {
  const { route } = props
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
            
          </Content>
        </Layout>
      </Layout>
    )
})