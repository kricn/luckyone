import React, { Component } from 'react';

//组件
import SearchForm from './components/SearchForm'
import TagsComponent from './components/TagsComponent';

class Tags extends Component {

    constructor() {
        super()
        this.state = {
            tags: []
        }
    }

    tagsComponent = component => {
        this.component = component
    }

    search = params => {
        this.component.refreshTags(params)
    }

    render() {
        return (
            <>
                <SearchForm 
                    search={params => this.search(params)}
                />
                <TagsComponent
                    ref={this.tagsComponent}
                />
            </>
        );
    }
}

export default Tags;