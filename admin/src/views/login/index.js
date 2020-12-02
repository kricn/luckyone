import { Component, Fragment } from 'react';


import LoginForm from './LoginForm'
import RegisterForm from './ReigsterForm'

class Login extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return  (
        <div>
            <LoginForm></LoginForm>
            <RegisterForm></RegisterForm>
        </div>
    )
  }
}

export default Login;
