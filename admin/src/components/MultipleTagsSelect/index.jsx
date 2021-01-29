import React, { Component } from 'react';

import { Select } from 'antd'

import { getTagsList } from '@/api/tags.js'

class MultipleTagsSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: undefined
        }
    }

    componentDidMount() {
        getTagsList({available: 1}).then(res => {
            let temp = res.data && res.data.list.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })
            this.setState({
                tags: temp
            })
        })
    }

    componentWillUnmount() {
        this.setState(() => null)
    }

    render() {
        return (
            <>
            <Select
                options={this.state.tags}
                mode="multiple"
                onChange={this.props.onChange}
                value={this.props.value}
            ></Select>
        </>
        );
    }
}

export default MultipleTagsSelect;