import React, { Component, createRef } from 'react';

import { Button, Input } from 'antd'

import { addArticle, editArticle } from '@/api/article'

import MdEditor from './MdEditor'
import SinglePictureUpload from '@/components/SinglePictureUpload'

class ArticleForm extends Component {
    constructor(props) {
        super(props)
        this.mdEditor = createRef()
        this.params = {
            cover: null,
            title: '',
            summary: '',
            words: 0,
            content: '',
            tags: []
        }
        this.state = {
            ...this.params,
            isEdit: false
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.detail) {
            this.setState({
                ...this.state,
                ...nextProps.detail,
                isEdit: true
            })
        }
    }
    
    updateCover = url => {
        this.setState({
            cover: url
        })
    }

    submit = () => {
        const content =  this.mdEditor.current.state.value
        this.setState({
            content,
            tags: [3]
        }, () => {
            for(let key in this.params) {
                this.params[key] = this.state[key]
            }
            if(this.state.isEdit) {
                editArticle({
                    id: this.state.id,
                    data: this.params
                })
            } else {
                addArticle(this.state.params).then(res => {
                    console.log(res.message)
                })
            }
        })
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() {
        const { title, cover, content } = this.state
        return (
            <>
                <Input value={title} onChange={this.handleTitleChange} />
                <MdEditor ref={this.mdEditor} content={content} />
                <SinglePictureUpload url={cover} update={this.updateCover} />
                <Button type="primary" onClick={this.submit}>提交</Button>
            </>
        );
    }
}

export default ArticleForm;