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

  layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  render() {
    return  (
        <Fragment>
            <Form
              {...this.layout}
              className="login"
            >

              <Form.Item
                label="用户名"
                name="username"
                rules={[ { required: true, message: '请输入用户名！' } ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[ { required: true, message: '请输入密码！' } ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button>登录</Button>
              </Form.Item>

            </Form>
        </Fragment>
    )
  }
}

export default LoginForm;
