import React from 'react'

import { Button, Input, Form, Row, Col, Select } from 'antd'
import style from '../index.module.scss'

export default function SearchForm(props) {

    const [form] = Form.useForm()

    const tags = props.tags.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    })

    const status = [
        {label: '全部', value: ''},
        {label: '展示', value: 1},
        {label: '隐藏', value: 0}
    ]

    const type = [
        {label: '全部', value: ''},
        {label: '标准', value: 1},
        {label: '关于', value: 2}
    ]

    /**
     * function
     */
    const search = val => {
        if (val.tags.length > 0) {
            val.tags = val.tags.join('')
        }
        props.search(val)
    }

    const reset = () => {
        form.resetFields()
        props.reset()
    }

    return (
        <>
            <Form 
                onFinish={search}
                layout="inline"
                className={style.search_field}
                form={form}
            >
                <Row
                    type="flex"
                >
                    <Col>
                    <Form.Item name="keyword">
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit">搜索</Button>
                        <Button onClick={reset}>重置</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item label="标签" name="tags" initialValue={[]}>
                            <Select
                                options={tags}
                                mode="multiple"
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="类型" name="type" initialValue={''}>
                            <Select
                                options={type}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="状态" name="status" initialValue={''}>
                            <Select
                                options={status}
                            ></Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
