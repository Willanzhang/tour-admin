// 富文本框
import 'whatwg-fetch'
import React, { Component } from 'react'
import { message } from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { baseUrl } from 'src/util/env'
let isDefault = true

export default class Wysiwyg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picDom: null,
      editorContent: undefined,
      contentState: '',
      editorState: EditorState.createEmpty()
    }
  }
  componentWillReceiveProps() {
    if(this.props.content && isDefault) {
      isDefault = false
      // this.default()
    }
    this.default()
  }
  componentDidMount() {
    this.default()
  }

  default() {
    const {content} = this.props
    const contentBlock = htmlToDraft(content || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  clearContent(){
    this.setState({
      contentState: '',
    })
  }

  onContentStateChange(editorContent){
    this.setState({
      editorContent
    })
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    })
  }

  onBlur() {
    let html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    this.props.richTextFun(html.length > 8 ? html : '', this.props.num, this.state)
  }
  imageUploadCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        let formData = new FormData()
        formData.append('image', file)
        let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}
        fetch(`${baseUrl}/store/upload/image`, {
          method: 'POST',
          headers: {
            'store-user-token':subsystemTourInfo.token
          },
          body: formData,
        }).then(res => {
          return res.json()
        }).then(res => {
          if (res.data.errcode !== '20000') {
            message.error('图片上传失败', 2)
            reject(res)
          } else {
            resolve({data: {link: res.data.url}})
            // pisDom.innerHTML = imga
            // resolve({data: {link: <img src={res.data.url} style={{width: '100%', height: '100%'}} />}})
          }
        }).catch(err => {
          reject(err)
        })
      }
    )
  }

  render() {
    const { editorState, contentState } = this.state
    return (
      <div>
        <Editor
          initialContentState={contentState}
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange.bind(this)}
          onContentStateChange={this.onContentStateChange.bind(this)}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'remove', 'history'],
            history: { inDropdown: true },
            inline: { inDropdown: false },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              previewImage: true,
              uploadCallback: this.imageUploadCallBack.bind(this),
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            }
          }}
          placeholder="请输入正文"
          onFocus={() => {}}
          onBlur={this.onBlur.bind(this)}
          onTab={() => {return true;}}
          localization={{ locale: 'zh', translations: {'generic.add': '添加'} }}
          mention={{
            separator: ' ',
            trigger: '@',
            caseSensitive: true,
            suggestions: [
              { text: 'A', value: 'AB', url: 'href-a' },
              { text: 'AB', value: 'ABC', url: 'href-ab' },
              { text: 'ABC', value: 'ABCD', url: 'href-abc' },
              { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
              { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
              { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
              { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
            ],
          }}
        />

        <style>{`
            .home-editor {
              min-height: 300px;
              max-height: 300px;
            }
            .rdw-image-modal-upload-option-label{
              box-sizing: border-box;
              height: 60px;
              line-height: 20px;
              text-align: center;
              word-wrap:break-word;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:2; 
              overflow: hidden;
            }
        `}</style>
      </div>
    );
  }
}
