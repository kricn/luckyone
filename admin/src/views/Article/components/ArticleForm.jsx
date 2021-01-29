import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Button, Input, Form, Select, Message } from 'antd'

import { addArticle, editArticle } from '@/api/article'

import MdEditor from './MdEditor'
import SinglePictureUpload from '@/components/SinglePictureUpload'
import MultipleTagsSelect from '@/components/MultipleTagsSelect'

export default function ArticleForm(props) {
    const { TextArea } = Input
    const [form] = Form.useForm()
    const { detail } = props
    const history = useHistory()

    const status = [
        {label: '展示', value: 1},
        {label: '隐藏', value: 0}
    ]

    const type = [
        {label: '标准', value: 1},
        {label: '关于', value: 2}
    ]

    useEffect(() => {
        if (detail) {
            detail.tags = detail.tags.map(item => {
                return item.id
            })
        }
        form.setFieldsValue(Object.assign({}, detail))  
    })

    const submit = val => {
        if(detail) {
            editArticle({
                id: detail.id,
                data: val
            }).then(() => {
                Message.success('修改成功')
                history.push('/alian/article')
            })
        } else {
            addArticle(val).then(() => {
                Message.success('创建成功')
                history.push('/alian/article')
            })
        }
    }
    
    return (
        <>
            <Form
                onFinish={submit}
                form={form}
            >
                <Form.Item label="标题" name="title">
                    <Input />
                </Form.Item>
                <Form.Item valuePropName="content" name="content">
                    <MdEditor />
                </Form.Item>
                <Form.Item label="简介" name="summary">
                    <TextArea 
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </Form.Item>
                <Form.Item label="标签" name="tags">
                    <MultipleTagsSelect />
                </Form.Item>
                <Form.Item label="状态" name="status" initialValue={1}>
                    <Select options={status}></Select>
                </Form.Item>
                <Form.Item label="类型" name="type" initialValue={1}>
                    <Select options={type}></Select>
                </Form.Item>
                <Form.Item valuePropName="url" name="cover">
                    <SinglePictureUpload />
                </Form.Item>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form>
        </>
    )
};