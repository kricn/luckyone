import React, { Component } from 'react';

import { Upload } from 'antd'

import { getToken } from '@/utils/session'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: null,
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            fileList: [{
                uid: -1,
                url: this.props.url
            }]
        })
    }

    handleAvatarChange = e => {
        this.setState({
            loading: true
        })
        const avatar = e.file
        if (avatar.status === 'done') {
            this.setState({
                fileList: [{
                    uid: avatar.uid,
                    url: avatar.response.path
                }],
                loading: false
            })
            this.props.updateAvatar(avatar.response.path)
        }
    }

    render() {
        const { fileList } = this.state
        return (
            fileList ?
            <Upload
                name="file"
                listType="picture-card"
                showUploadList={false}
                fileList={fileList}
                action={process.env.REACT_APP_API + '/admin/upload'}
                onChange={this.handleAvatarChange}
                headers={{
                    token: getToken()
                }}
            >
                {
                    fileList[0].url ? <img src={process.env.REACT_APP_API + fileList[0].url} alt="pic" /> : <div>upload</div>
                }
            </Upload> :
            <div>loading...</div>
        );
    }
}

export default index;