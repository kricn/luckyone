import React, { Component } from 'react';

import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getTagsList } from '@/api/tags'

class TagsComponent extends Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
        editInputId: -1,
        editInputValue: '',
      };
      
      componentDidMount() {
        getTagsList().then(res => {
            this.setState({
                tags: res.data && res.data.list
            })
        })
      }

      handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      };
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };
    
      handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };
    
      handleInputConfirm = () => {
        
      };
    
      handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
      };
    
      handleEditInputConfirm = () => {
        this.setState({
            editInputId: -1,
        })
      };

      saveInputRef = input => {
        this.input = input;
      };
    
      saveEditInputRef = input => {
        this.editInput = input;
      };
    
      render() {
        const { tags, inputVisible, inputValue, editInputId, editInputValue } = this.state;
        return (
          <>
            {tags.map((tag, index) => {
              if (editInputId === tag.id) {
                return (
                  <Input
                    ref={this.saveEditInputRef}
                    key={tag.id}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={this.handleEditInputChange}
                    onBlur={this.handleEditInputConfirm}
                    onPressEnter={this.handleEditInputConfirm}
                  />
                );
              }
    
              const isLongTag = tag.name && tag.name.length > 20;
    
              const tagElem = (
                <Tag
                  className="edit-tag"
                  key={tag.id}
                  closable={true}
                  onClose={() => this.handleClose(tag.id)}
                >
                  <span
                    onDoubleClick={e => {
                        this.setState({ editInputId: tag.id, editInputValue: tag.name }, () => {
                            this.editInput.focus();
                        });
                        e.preventDefault();
                    }}
                  >
                    {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag.name} key={tag.id}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                className="tag-input"
                key={tags.id}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag key={tags.id} onClick={this.showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </>
        );
      }
}

export default TagsComponent;