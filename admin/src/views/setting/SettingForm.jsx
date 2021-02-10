import React, { useEffect } from 'react'

import { Form, Input, Button, Select, Message  } from 'antd';

import SinglePictureUpload from '@/components/SinglePictureUpload'

import style from './index.module.scss'

//api
import { updateCount } from '@/api/account'

const { TextArea }  = Input

export default function SettingForm(props) {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(
            Object.assign(
                {}, 
                props.userInfo, 
                props.userInfo.profile
            )
        )
    })
    
    const onSubmit = val => {
        updateCount(val).then(res => {
            Message.success('更新成功')
            props.reload()
        }).catch(err => {
            Message.error('更新失败')
        })
    }
    
    return (
        <>
        <Form 
            onFinish={onSubmit} 
            form={form}
            labelAlign="right"
            labelCol={{span: 3}}
            layout="horizontal"
        >
            <Form.Item label="头像" name="avatar" valuePropName="url" className={style.avatar}>
                <SinglePictureUpload />
            </Form.Item>
            <Form.Item name="username" label="用户名">
                <div>{props.userInfo.username}</div>
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
                <Input />
            </Form.Item>
            <Form.Item name="cover" valuePropName="url" label="封面图" className={style.cover}>
                <SinglePictureUpload />
            </Form.Item>
            <Form.Item name="color" label="遮罩颜色">
                <Input type="color" />
            </Form.Item>
            <Form.Item name="article" label="文章">
                <Select 
                    options={props.articleList}
                />
            </Form.Item>
            <Form.Item name="title" label="标题">
                <Input />
            </Form.Item>
            <Form.Item name="summary" label="简介">
                <TextArea 
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </Form.Item>
            <Form.Item name="ipx_text" label="备案文字">
                <Input />
            </Form.Item>
            <Form.Item name="ipx_link" label="备案链接">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 3}}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}
