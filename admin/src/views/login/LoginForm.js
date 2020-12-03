import { Component, Fragment } from 'react';

//ANTD
import { Button, Form, Input } from 'antd'

//SCSS
import './index.scss'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return  (
        <Fragment>
            <Form
              className="login"
            >

              <Form.Item
                name="username"
                rules={[ { required: true, message: '请输入用户名！' } ]}
              >
                <Input placeholder="用户名" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[ { required: true, message: '请输入密码！' } ]}
              >
                <Input placeholder="密码" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" block>登录</Button>
              </Form.Item>

            </Form>
        </Fragment>
    )
  }
}

export default LoginForm;
