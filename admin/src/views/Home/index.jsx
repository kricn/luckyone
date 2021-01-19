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
    getArticleList().then(res => {
      store.dispatch({type: 'GETLIST', payload: res && res.data && res.data.list})
    }).catch()
    this.unsubscribe = store.subscribe(() => {
        this.setState({
          list: [...store.getState().appReducer.list]
        })
    })
  }
  componentWillUnmount() {
      if(this.unsubscribe) {
          this.unsubscribe()
      }
  }

  render() {
    return (
      <>
        统计
        {
          this.state.list.length > 0 ? 
          <div>
            {
              this.state.list.map((item, index) => {
                return <div key={index}>{item.title}</div>
              })
            }
          </div> :
          <div>loading...</div>
        }
      </>
    )
  }
}

export default Statistic;