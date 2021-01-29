import React, { Component } from 'react';

//组件
import SearchForm from './components/SearchForm'
import TagsComponent from './components/TagsComponent';

class Tags extends Component {
    render() {
        return (
            <>
                <SearchForm />
                <TagsComponent />
            </>
        );
    }
}

export default Tags;