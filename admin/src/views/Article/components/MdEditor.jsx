import React, { Component } from 'react';
import Editor from 'for-editor'

import { uploadImg } from '@/api/article'

class MdEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.$vm = React.createRef()
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.content) {
            this.setState({
                value: nextProps.content
            })
        }
    }

    handleChange(value) {
        this.setState({
            value
        })
    }

    addImg($file) {
        const formdata = new FormData()
        formdata.append('file', $file)
        uploadImg(formdata).then(res => {
            this.$vm.current.$img2Url($file.name, process.env.REACT_APP_API + res.data.path)
        })
    }

    render() {
        const { value } = this.state
        const { onChange } = this.props
        return (
            <>
                <Editor
                    ref={this.$vm}
                    value={value}
                    addImg={($file) => this.addImg($file)}
                    onChange={value => onChange(value)}
                />
            </>
        );
    }
}

export default MdEditor;