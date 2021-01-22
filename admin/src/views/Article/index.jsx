import React, { Component, Fragment } from 'react'

import { Button } from 'antd'

import ArticleTable from './components/ArticleTable'

import { getArticleList } from '@/api/article.js'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      loading: false,
      params: {}
    }
  }

  componentDidMount() {
    this.getArticleList(this.state.params)
  }
  componentWillUnmount() {
    this.setState = () => null
    sessionStorage.removeItem('current_page')
  }

  getArticleList = (params) => {
    this.setState({loading: true})
    getArticleList(params).then(res => {
      this.setState({
        list: [...(res && res.data && res.data.list)],
        total: res.data && res.data.total
      })
    }).catch().finally(() => {
      this.setState({loading: false})
    })
  }

  toCreateArticle = () => {
    this.props.history.push('/alian/article/create')
  }

  toEditArticle = id => {
    this.props.history.push(`/alian/article/${id}`)
  }

  render() {
    const { list, loading, total }  = this.state
    return (
      <>
        <Button onClick={this.toCreateArticle}>创建</Button>
        <ArticleTable
          loading={loading}
          dataSource={list} 
          getArticleList={params => this.getArticleList(Object.assign({}, this.state.params, params))}
          total={total}
          toEditArticle={id => this.toEditArticle(id)}
        />
      </>
    )
  }
}

export default Article;