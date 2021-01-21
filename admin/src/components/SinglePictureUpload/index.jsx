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

    componentDidMount() {
        this.setState({
            fileList: [{
                uid: -1,
                url: this.props.url
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
            if (this.props.update) this.props.update(pic.response.path)
        }
        if ( pic.status === 'error') {
            this.setState({loading: false})
        }
    }

    render() {
        const { fileList, loading } = this.state
        return (
            fileList ?
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
                    fileList[0].url ?
                    <div className={style.pic} style={{backgroundImage: `url(${process.env.REACT_APP_API + fileList[0].url})`}} /> :
                    <div>upload</div>
                }
                
                {/* {
                    fileList[0].url ? <img src={process.env.REACT_APP_API + fileList[0].url} alt="pic" /> : <div>upload</div>
                } */}
            </Upload> :
            <div>loading...</div>
        );
    }
}

export default index;