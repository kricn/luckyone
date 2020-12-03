import { Component, Fragment } from 'react';

//ANTD
import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//SCSS
import './index.scss'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onFinish = values => {
    console.log(values)
  }

  render() {
    return  (
        <Fragment>
            <Form
              className="login"
              onFinish={this.onFinish}
            >

              <Form.Item
                name="username"
                rules={[ { required: true, message: '请输入用户名！' } ]}
              >
                <Input size="large" prefix={<UserOutlined />} placeholder="用户名"  />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[ { required: true, message: '请输入密码！' } ]}
              >
                <Input.Password size="large" prefix={<LockOutlined />} placeholder="密码" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>登录</Button>
              </Form.Item>

            </Form>
        </Fragment>
    )
  }
}

export default LoginForm;
