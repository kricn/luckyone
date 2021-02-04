import React, { Component } from 'react'

import { Button } from 'antd'

import ArticleTable from './components/ArticleTable'
import SearchForm from './components/SearchForm'

import { getArticleList } from '@/api/article.js'
import { getTagsList } from '@/api/tags.js'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      loading: false,
      params: {}, 
      tags: []
    }
  }

  componentDidMount() {
    this.getArticleList(this.state.params)
    getTagsList({available: 1}).then(res => {
      this.setState({tags: res && res.data && res.data.list})
    })
  }
  componentWillUnmount() {
    this.setState = () => null
    sessionStorage.removeItem('current_page')
  }

  getArticleList = (params) => {
    this.setState({params})
    this.setState({loading: true})
    getArticleList(params).then(res => {
      this.setState({
        list: (res && res.data && res.data.list),
        total: res && res.data && res.data.total
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

  search = params => {
    params = Object.assign({}, this.state.params, params)
    this.getArticleList(params)
  }

  resetParams = () => {
    this.setState({params: {}}, () => this.getArticleList(this.state.params))
  }

  render() {
    const { list, loading, total, tags }  = this.state
    return (
      <>
        <SearchForm
          tags={tags}
          search={params => this.search(params)}
          reset={this.resetParams}
        />
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