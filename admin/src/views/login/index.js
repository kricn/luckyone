import { Tabs } from 'antd';
import { Component } from 'react';

import SignForm from '../../components/signForm'

import './index.scss'

const { TabPane } = Tabs;

class Login extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: false
    }
  }

  render() {
    return  (
        <div className="container">
          <div className="form">
            <Tabs>
              <TabPane tab="登录" key="login">
                <SignForm
                  mode="login"
                  btnTxt="登录"
                />
              </TabPane>
              <TabPane tab="注册" key="register">
                <SignForm
                  mode="register"
                  btnTxt="注册"
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
    )
  }
}

export default Login;
