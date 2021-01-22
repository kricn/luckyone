import React, { Component } from 'react';

import { getArticleDetail } from '@/api/article'

import ArticleForm from './components/ArticleForm'

class EditArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleId: this.props.match.params.id,
            articleDetail: null
        }
    }

    componentDidMount() {
        getArticleDetail(this.state.articleId).then(res => {
            this.setState({
                articleDetail: res.data
            })
        })
    }

    render() {
        const { articleDetail } = this.state
        return (
            <>
                <ArticleForm detail={articleDetail} />
            </>
        );
    }
}

export default EditArticle;