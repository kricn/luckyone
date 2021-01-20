import React, { Component, useRef } from 'react';

import store from '@/store'
//antd
import { Form, Input, Button, Select  } from 'antd';
import SettingForm from './SettingForm'

const { Option } = Select;

class Setting extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: null,
			form: {},
			name: 'a'
		}
	}

	componentDidMount() {
		const { user } = store.getState().appReducer
		this.setState({
			userInfo: Object.assign({}, user)
		})
	}

	

	render() {
		const { userInfo } = this.state
		return (
			userInfo ?
			(
				<SettingForm
					userInfo={userInfo}
				/>
			) : 
			(
				<div>loading...</div>
			)
		)
	}
}

export default Setting