import React, { Component } from 'react';

import store from '@/store'

//api
import { getCurrent } from '@/api/account'

import style from './index.module.scss'

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class AHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        getCurrent().then(res => {
            store.dispatch({type: 'SETUSER', payload: res.data})
        }).catch(err => {
            console.log(err)
        })
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                user: store.getState().appReducer.user
            })
        })
    }
    componentWillUnmount() {
        this.setState = () => null
    }


    render() {
        const { user } = this.state
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
                            user.profile && user.profile.avatar ? 
                            <Avatar src={ process.env.REACT_APP_API + user.profile.avatar} /> :
                            <Avatar size={32} icon={<UserOutlined />} />
                        }
                        {
                            user.nickname ? 
                            <span>{user.nickname}</span> :
                            <span>{user.username}</span>
                        }
                    </>
                }
            </div>
        );
    }
}

export default AHeader;