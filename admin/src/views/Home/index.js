import React, { Component, Fragment } from 'react'

import { getArticleList } from '@/api/article.js'
import store from '@/store'

class Statistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    getArticleList().then(res => {}).catch()
    this.unsubscribe = store.subscribe(() => {
        this.forceUpdate()
    })
  }
  componentWillUnmount() {
      if(this.unsubscribe) {
          this.unsubscribe()
      }
  }

  add = () => {
    store.dispatch({type: 'ADD', payload: 1})
  }

  del = () => {
    store.dispatch({type: 'MINUS', payload: 1})
  }

  render() {
    return (
      <>
        统计
        <div>
          {store.getState().countReducer}
        </div>
        <button onClick={this.add}>+</button>
        <button onClick={this.del}>-</button>
      </>
    )
  }
}

export default Statistic;