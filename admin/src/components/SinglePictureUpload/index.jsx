import React, { Component } from 'react';

import { Upload } from 'antd'

import { getToken } from '@/utils/session'

import style from './index.module.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: null,
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fileList: [{
                uid: -1,
                url: nextProps.url
            }]
        })
    }

    handleChange = e => {
        this.setState({
            loading: true
        })
        const pic = e.file
        if (pic.status === 'done') {
            this.setState({
                fileList: [{
                    uid: pic.uid,
                    url: pic.response.path
                }],
                loading: false
            })
            if (this.props.onChange) this.props.onChange(pic.response.path)
        }
        if ( pic.status === 'error') {
            this.setState({loading: false})
        }
    }

    render() {
        const { fileList, loading } = this.state
        return (
            <Upload
                className={style.upload}
                name="file"
                listType="picture-card"
                showUploadList={false}
                fileList={fileList}
                action={process.env.REACT_APP_API + '/admin/upload'}
                onChange={this.handleChange}
                headers={{
                    token: getToken()
                }}
            >
                {
                    loading ?
                    <div>uploading...</div> :
                    fileList && fileList[0].url ?
                    <div className={style.pic} style={{backgroundImage: `url(${process.env.REACT_APP_API + fileList[0].url})`}} /> :
                    <div>upload</div>
                }
            </Upload>
        );
    }
}

export default index;