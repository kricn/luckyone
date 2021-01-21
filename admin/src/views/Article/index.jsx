import React, { Component, Fragment } from 'react'

import ArticleTable from './ArticleTable'

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

  render() {
    const { list, loading, total }  = this.state
    return (
      <>
        <ArticleTable
          loading={loading}
          dataSource={list} 
          getArticleList={params => this.getArticleList(Object.assign({}, this.state.params, params))}
          total={total}
        />
      </>
    )
  }
}

export default Article;