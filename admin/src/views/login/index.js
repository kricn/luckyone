import { Tabs } from 'antd';
import { Component } from 'react';


import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

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
          <div class="form">
            <Tabs></Tabs>
            {
              !this.isLogin ?
                <LoginForm></LoginForm> :
                <RegisterForm></RegisterForm>
            }
          </div>
        </div>
    )
  }
}

export default Login;
