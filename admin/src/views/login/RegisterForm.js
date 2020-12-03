import { Component, Fragment } from 'react';

import { Button, Form, Input } from 'antd'

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return  (
      <Fragment>
      <Form
        className="register"
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
          <Button type="primary" block>注册</Button>
        </Form.Item>

      </Form>
  </Fragment>
    )
  }
}

export default RegisterForm;
