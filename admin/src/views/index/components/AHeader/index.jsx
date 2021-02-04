import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
// antd
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// store
import store from '@/store'
// api

// function
import { getCurrentUser } from '@/utils/common'
// style
import style from './index.module.scss'



class AHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        const user = store.getState().appReducer.user
        if (!user) {
            getCurrentUser()
        } else {
            this.setState({
                user
            })
        }
    }
    componentWillUnmount() {
        this.setState = () => null
    }

    //登出
    logout = () => {
        localStorage.clear()
        store.dispatch({type: 'SETUSER', payload: null})
        this.props.history.push('/')
    }


    render() {
        const { user } = this.state

        const drownMenu = (
            <Menu>
                <Menu.Item>
                    <Link to='/alian/setting'>个人中心</Link>
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <div>退出登录</div>
                </Menu.Item>
            </Menu>
        )

        return (
            <div className={style.user_info}>
                {
                    !user ? 
                    <>
                        <Avatar size={32} icon={<UserOutlined />} />
                        <span>未登录</span>
                    </>
                     : 
                    <>
                        {
                            <Dropdown overlay={drownMenu}>
                                <div>
                                {
                                    user.profile && user.profile.avatar ? 
                                    <Avatar src={ process.env.REACT_APP_API + user.profile.avatar} /> :
                                    <Avatar size={32} icon={<UserOutlined />} />
                                }
                                {
                                    user.nickname ? 
                                    <span>{user.nickname}</span> :
                                    <span>{user.username}</span>
                                }
                                </div>
                            </Dropdown>
                        }
                    </>
                }
            </div>
        );
    }
}

export default withRouter(AHeader);