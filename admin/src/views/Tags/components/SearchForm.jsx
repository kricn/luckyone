import React from 'react'

import { Button, Form, Select, Input } from 'antd'

import style from '../index.module.scss'

export default function SearchForm(props) {

    const [form] = Form.useForm()

    const status = [
        { label: '全部', value: ''},
        { label: '可用', value: 1},
        { label: '禁用', value: 0},
    ]

    
    const search = val => {
        props.search(val)
    }

    const reset = () => {
        props.search()
        form.resetFields()
    }

    return (
        <>
            <Form
                layout="inline"
                onFinish={search}
                form={form}
                className={style.search_field}
            >
                <Form.Item name="keyword">
                    <Input placeholder="请输入关键字..." />
                </Form.Item>
                <Form.Item name="available" initialValue={''}>
                    <Select
                        options={status}
                    ></Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>搜索</Button>
                    <Button onClick={reset}>重置</Button>
                </Form.Item>
            </Form>   
        </>
    )   
}
