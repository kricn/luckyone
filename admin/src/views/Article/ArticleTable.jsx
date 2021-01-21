import React from 'react'

import { Button, Table } from 'antd'

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
        dataIndex: 'update_date'
    },
    {
        title: '操作',
        render: (text, record) => renderAction(text, record)
    },
]
  
const renderAction = (text, record) => {
    return (
        <>
            <Button type="primary" onClick={edit}>编辑</Button>
            <Button>隐藏</Button>
            <Button type="danger">删除</Button>
        </>
        )
}

const edit = () => {
    console.log('a')
}


export default function ArticleTable(props) {
    const { loading, dataSource, total } = props

    const getArticle = (offset, limit) => {
        props.getArticleList({limit,offset})
    }

    return (
        <Table
          rowKey ={record=>record.id}
          loading={loading}
          dataSource={dataSource} 
          columns={columns} 
          pagination={{
              defaultPageSize: 10, 
              onChange: (page, pageSize)=> getArticle((page - 1) * pageSize, pageSize),
              total: total
            }}
        />
    )
}
