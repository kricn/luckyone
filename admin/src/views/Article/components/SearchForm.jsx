import React from 'react'

import { Button, Input, Form, Row, Col, Select } from 'antd'
import style from '../index.module.scss'

import MultipleTagsSelect from '@/components/MultipleTagsSelect'

export default function SearchForm(props) {

    const [form] = Form.useForm()
    
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
            val.tags = val.tags.join(',')
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
                    style={{margin: '20px 0', flexWrap: 'nowrap'}}
                >
                    <Col>
                        <Form.Item name="keyword">
                            <Input placeholder="请输入关键字..." />
                        </Form.Item>
                    </Col>
                    <Col className={style.btn_group}>
                        <div>
                            <Button type="primary" htmlType="submit" style={{margin: '0 20px'}}>搜索</Button>
                            <Button onClick={reset}>重置</Button>
                        </div>
                        <Button type="primary" onClick={props.toCreateArticle}>创建</Button> 
                    </Col>
                </Row>
                <Row className={style.filter_option}>
                    <Col md={6} sm={8} xs={24}>
                        <Form.Item label="标签" name="tags" initialValue={[]}>
                            <MultipleTagsSelect />
                        </Form.Item>
                    </Col>
                    <Col md={6} sm={8} xs={24}>
                        <Form.Item label="类型" name="type" initialValue={''}>
                            <Select
                                options={type}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col md={6} sm={8} xs={24}>
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
