import React, { Component } from 'react';

import { Tag, Input, Tooltip, Message, Modal } from 'antd';
import { PlusOutlined, LoadingOutlined, StopOutlined, CheckCircleTwoTone  } from '@ant-design/icons';

import { getTagsList, deleteTag, switchTagsStatus, addTag, updateTag } from '@/api/tags'

const { confirm } = Modal

class TagsComponent extends Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
        editInputId: -1,
        editInputValue: '',
        tempEditInputValue: '',
        loading: false,
        clickId: -1,
        addLoading: false,
        clickCount: 0, //点击次数
      };

      //初始化
      componentDidMount() {
        this.refreshTags()
      }
      //加载tags
      refreshTags = params => {
        getTagsList(params).then(res => {
            this.setState({
                tags: res.data && res.data.list,
                addLoading: false
            })
        })
      }
      //删除tags
      handleClose = id => {
        const _this = this
        confirm({
          title: '你确定要删除该标签？',
          onOk() {
            deleteTag({id}).then(res => {
              Message.success(res.message)
              const tags = _this.state.tags.filter(tag => tag.id !== id);
              console.log(tags)
              _this.setState({ tags });
            })
          },
        })
      };
      //添加tag的输入框
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };
      //改变添加tag输入框状态
      handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };
      //添加tag确认
      handleInputConfirm = () => {
        const inputValue = this.state.inputValue
        if (!inputValue) {
          this.setState({
            inputVisible: false
          })
          return ;
        }
        this.state.tags.push({
          name: inputValue
        })
        this.setState({
          addLoading: true,
          inputVisible: false,
        })
        addTag({
          name: inputValue
        }).then(res => {
          getTagsList().then(res => {
            this.setState({
                tags: res.data && res.data.list,
                addLoading: false
            })
            Message.success('添加成功')
          })
          this.setState({
            inputVisible: false,
            inputValue: ''
          })
        }).catch(() => {
          this.setState({
            inputVisible: true
          })
        })
      };
    
      handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
      };
      
      //编辑tag确认
      handleEditInputConfirm = () => {
        const { editInputValue, tempEditInputValue } = this.state

        if (!editInputValue || editInputValue === tempEditInputValue) {
          this.setState({
            editInputId: -1,
          })
          return ;
        }
        updateTag({
          id: this.state.editInputId,
          data: {name: this.state.editInputValue}
        }).then(res => {
          Message.success(res.message)
          const newTags = this.state.tags.filter(item => {
            if (item.id === this.state.editInputId) {
              item.name = this.state.editInputValue
            }
            return item;
          })
          this.setState({
            editInputId: -1,
            tags: [...newTags]
          })
        })
      };

      saveInputRef = input => {
        this.input = input;
      };
    
      saveEditInputRef = input => {
        this.editInput = input;
      };

      setIcon = tag => {
        if ((this.state.clickId === tag.id && this.state.loading) || (!tag.id && this.state.addLoading)) {
          return <LoadingOutlined />
        }
        if (!tag.available && tag.id) {
          return <StopOutlined />
        }
        return <CheckCircleTwoTone twoToneColor="#52c41a" />
      }

      setColor = tag => {
        if (!tag.id || tag.available === 1) {
          return '#87d068'
        }
        return '#cd201f'
      }

      //处理点击和双击
      handleClick = tag => {
        this.setState({ clickCount: this.state.clickCount + 1 })
        setTimeout(() => {
          if (this.state.clickCount === 1) {
            this.switchStatus(tag)
          } else if (this.state.clickCount === 2) {
            this.setState({ editInputId: tag.id, editInputValue: tag.name, tempEditInputValue: tag.name }, () => {
              this.editInput.focus();
            });
          }
          this.setState({ clickCount: 0 })
        }, 300)
      }

      //切换标签状态
      switchStatus = tag => {
        if (this.state.loading) {
          return ;
        }
        const available = tag.available === 1 ? 0 : 1
        this.setState({
          loading: true,
          clickId: tag.id
        })
        switchTagsStatus({
          id: tag.id,
          data: {
            available
          }
        }).then(res => {
          Message.success(res.message)
          const tags = this.state.tags.map(item => {
            if (item.id === tag.id) {
              item.available = available
            }
            return item
          })
          this.setState({ tags })
        }).finally(() => {
          this.setState({
            loading: false,
            clickId: -1
          })
        })
      }
    
      render() {
        const { tags, inputVisible, inputValue, editInputId, editInputValue } = this.state;
        return (
          <>
            {tags.map((tag, index) => {
              if (editInputId === tag.id) {
                return (
                  <Input
                    ref={this.saveEditInputRef}
                    key={index}
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
                  key={index}
                  closable={true}
                  onClose={e => {
                    e.preventDefault()
                    return this.handleClose(tag.id)
                  }}
                  color={this.setColor(tag)}
                  icon={this.setIcon(tag)}
                >
                  <span
                    onClick={e => {
                      e.preventDefault()
                      return this.handleClick(tag)
                    }}
                  >
                    {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag.name} key={index}>
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