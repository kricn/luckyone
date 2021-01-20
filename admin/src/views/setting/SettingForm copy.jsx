import React from 'react'

import { Form, Input, Button, Select, Upload  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { getToken } from '@/utils/session'

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
            props.userInfo.profile,
            {
                avatar: [{
                    uid: -1,
                    url: '/api' + props.userInfo.profile.avatar
                }]
            }
        )
    )
    
    const handleAvatarChange = e => {
        const avatar = e.file
        if (avatar.status === 'done') {
            form.setFieldsValue({
                avatar: [{
                    uid: -1,
                    url: avatar.response.path
                }]
            })
        }
    }
    

    return (
        <>
        <Form onFinish={onSubmit} form={form}>
            <Form.Item label="头像" name="avatar">
                <Upload
                    name="file"
                    listType="picture-card"
                    showUploadList={false}
                    fileList={form.getFieldValue('avatar')}
                    action={process.env.REACT_APP_API + '/admin/upload'}
                    onChange={handleAvatarChange}
                    headers={{
                        token: getToken()
                    }}
                >
                    {form.getFieldValue('avatar') ? <img src={form.getFieldValue('avatar')[0].url} alt="avatar" /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item name="username" label="用户名">
                <div>{props.userInfo.username}</div>
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
                <Input />
            </Form.Item>
            <Form.Item name="cover" label="封面图">
                <Input />
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
