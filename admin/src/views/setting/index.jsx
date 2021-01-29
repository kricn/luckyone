import React, { Component } from 'react';

//store
import store from '@/store'
//components
import SettingForm from './SettingForm'
//api
import { getArticleList } from '@/api/article'
import { getCurrent } from '@/api/account'

class Setting extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: null,
			articleList: []
		}
	}

	componentDidMount() {
		const { user } = store.getState().appReducer
		this.setState({
			userInfo: Object.assign({}, user)
		})
		getArticleList().then(res => {
			this.setState({
				articleList: [...(res.data && res.data.list)]
			})
		})
	}

	componentWillUnmount() {
		this.setState = () => null
	}

	//处理articleList
	formatArticleList(articleList) {
		return articleList.map(item => {
			return {
				label: item.title,
				value: item.id
			}
		})
	}

	reload = () => {
		this.setState({
			userInfo: null
		})
		getCurrent().then(res => {
			store.dispatch({type: 'SETUSER', payload: res.data})
			this.setState({
				userInfo: Object.assign({}, res.data)
			})
        }).catch(err => {
			console.log(err)
			this.forceUpdate()
        })
	}

	render() {
		const { userInfo, articleList } = this.state
		return (
			userInfo ?
			(
				<SettingForm
					userInfo={userInfo}
					articleList={this.formatArticleList(articleList)}
					reload={this.reload}
				/>
			) : 
			(
				<div>loading...</div>
			)
		)
	}
}

export default Setting