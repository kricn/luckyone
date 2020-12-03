import { Tabs } from 'antd';
import { Component } from 'react';


import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

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
                <LoginForm></LoginForm>
              </TabPane>
              <TabPane tab="注册" key="register">
                <RegisterForm></RegisterForm>
              </TabPane>
            </Tabs>
          </div>
        </div>
    )
  }
}

export default Login;
