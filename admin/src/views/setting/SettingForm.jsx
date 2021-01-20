import React from 'react'

import { Form, Input, Button, Select  } from 'antd';

import SinglePictureUpload from '@/components/SinglePictureUpload'

const { Option } = Select;
const { getFieldDecorator } = Form

const onSubmit = val => {
    console.log(val)
}

const onReset = () => {
    console.log('reset')
}

const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
                <SinglePictureUpload url={form.getFieldValue('avatar')} updateAvatar={updateAvatar} />
            </Form.Item>
            <Form.Item name="username" label="用户名">
                <div>{props.userInfo.username}</div>
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
                <Input />
            </Form.Item>
            <Form.Item name="cover" label="封面图">
                <SinglePictureUpload url={form.getFieldValue('cover')} updateAvatar={updateCover} />
            </Form.Item>
            <Form.Item name="article" label="文章">
                <Input />
            </Form.Item>
            <Form.Item name="summary" label="简介">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}
