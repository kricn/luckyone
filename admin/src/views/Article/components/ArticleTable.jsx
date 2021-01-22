import React from 'react'
import { format as formatDate } from 'date-fns'

import { Message } from 'antd'

import { switchArticleStatus } from '@/api/article'

import { Button, Table } from 'antd'

export default function ArticleTable(props) {
    const { loading, dataSource, total } = props
    const columns = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '阅读量',
            dataIndex: 'views'
        },
        {
            title: '最后更新时间',
            render: (text) => formatDate(new Date(text.updated_date), 'yyyy-MM-dd HH:mm:ss')
        },
        {
            title: '操作',
            render: (text, record) => renderAction(text, record)
        },
    ]
      
    const renderAction = (text, record) => {
        return (
            <>
                <Button type="link" onClick={() => editArticle(text.id)}>编辑</Button>
                <Button type="link" onClick={() => switchStatus(text.id, text.is_show)}>{text.is_show ? '隐藏' : '展示'}</Button>
                <Button type="link">删除</Button>
            </>
        )
    }

    const handlePageChange = (page, pageSize) => {
        sessionStorage.setItem('current_page', page)
        return getArticle((page - 1) * pageSize, pageSize)
    }
    
    const editArticle = id => {
        props.toEditArticle(id)
    }    

    const getArticle = (offset, limit) => {
        props.getArticleList({limit,offset})
    }

    const switchStatus = (id, is_show) => {
        const params = {
            id,
            data: {
                is_show: is_show === 1 ? 0 : 1
            }
        }
        switchArticleStatus(params).then(res => {
            if (res.code !== 0) {
                return ;
            }
            Message.success('更新成功')
            getArticle()
        })
    }

    return (
        <Table
          rowKey ={record => record.id}
          loading={loading}
          dataSource={dataSource} 
          columns={columns} 
          pagination={{
              current: Number(sessionStorage.getItem('current_page')) || 1,
              defaultPageSize: 10, 
              onChange: (page, pageSize) => handlePageChange(page, pageSize),
              total: total
            }}
        />
    )
}
