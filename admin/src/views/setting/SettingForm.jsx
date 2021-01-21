import React from 'react'

import { Form, Input, Button, Select, Message  } from 'antd';

import SinglePictureUpload from '@/components/SinglePictureUpload'

import style from './index.module.scss'

//api
import { updateCount } from '@/api/account'

const { TextArea }  = Input

const onSubmit = val => {
    updateCount(val).then(res => {
        Message.success('更新成功')
    }).catch(err => {
        Message.error('更新失败')
        console.log(err)
    })
}
export default function SettingForm(props) {
    const [form] = Form.useForm()

    form.setFieldsValue(
        Object.assign(
            {}, 
            props.userInfo, 
            props.userInfo.profile
        )
    )
    
    //修改avatar路径
    const updateAvatar = url => {
        form.setFieldsValue({
            avatar: url
        })
    }

    //修改文章封面
    const updateCover = url => {
        form.setFieldsValue({
            cover: url
        })
    }

    return (
        <>
        <Form onFinish={onSubmit} form={form}>
            <Form.Item label="头像" name="avatar">
                <SinglePictureUpload url={form.getFieldValue('avatar')} update={updateAvatar} />
            </Form.Item>
            <Form.Item name="username" label="用户名">
                <div>{props.userInfo.username}</div>
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
                <Input />
            </Form.Item>
            <Form.Item name="cover" label="封面图" className={style.cover}>
                <SinglePictureUpload url={form.getFieldValue('cover')} update={updateCover} />
            </Form.Item>
            <Form.Item name="article" label="文章">
                <Select 
                    options={props.articleList}
                />
            </Form.Item>
            <Form.Item name="summary" label="简介">
                <TextArea 
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}
