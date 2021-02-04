import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'

//antd
import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//api
import { Login, Register } from '../../api/account.js'

//scss
import './index.scss'

//方法
import { setToken } from '@/utils/session.js'

import store from '@/store'


class SignForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: props.mode,
            loading: false
        }
    }

    onFinish = values => {
        const { mode } = this.state
        const _this = this
        this.setState({
            loading: true
        })
        if (mode === 'login') {
            Login(values).then(res => {
                setToken(res.data.token)
                store.dispatch({type: 'LOGIN', payload: '1'})
                this.props.history.push('/')
            }).finally(() => {
                _this.setState({
                    loading: false
                })
            })
        } else if ( mode === 'register') {
            Register(values).finally(() => {
                _this.setState({
                    loading: false
                })
            })
        }
    }

    render() {
        const { loading } = this.state
        const { btnTxt } = this.props
        return (
            <Fragment>
                <Form
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[ { required: true, message: '请输入用户名！' } ]}
                    >
                        <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[ { required: true, message: '请输入密码！' } ]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined />} placeholder="密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>{btnTxt}</Button>
                    </Form.Item>

                </Form>
            </Fragment>
        )
    }
    
    componentWillUnmount = () => {
        this.setState = () => null
    }

}

export default withRouter(SignForm);