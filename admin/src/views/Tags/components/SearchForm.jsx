import React from 'react'

import { Button, Form, Select, Input } from 'antd'

export default function SearchForm(props) {

    const [form] = Form.useForm()

    const status = [
        { label: '全部', value: ''},
        { label: '可用', value: 1},
        { label: '禁用', value: 0},
    ]

    
    const search = val => {
        console.log(val)
    }

    return (
        <>
            <Form
                layout="inline"
                onFinish={search}
                form={form}
            >
                <Form.Item name="keyword">
                    <Input />
                </Form.Item>
                <Form.Item name="status" initialValue={''}>
                    <Select
                        options={status}
                    ></Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>   
        </>
    )   
}
