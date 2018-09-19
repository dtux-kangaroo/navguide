import React from 'react';
import {Select, Button,Modal} from 'antd';
import './style.scss';
const Option=Select.Option;
class CodeEditor extends React.PureComponent{
  state={
      themeList:[{
        label:'vs',
        value:'vs'
      },
      {
        label:'vs-dark',
        value:'vs-dark'
      },{
        label:'hc-black',
        value:'hc-black'
      }],
      currentTheme:'vs'
  }
  //主题改变
  handleThemeChange=(value)=>{
    this.setState({
      currentTheme:value
    });
    monaco.editor.setTheme(value);
  }
  //语言改变
  handleLanguageChange=(value)=>{
    this.setState({
      currentLanguage:value
    });
  }
  //获取内容
  handleGetContent=()=>{
    Modal.success({
      content:this.Editor.getValue()
    });
  }
  render(){
    const {themeList,currentTheme,currentLanguage,languageList} = this.state;
    return (
      <div className="m-code-editor">
        <div className="text-center">
          <Select style={{width:160,marginLeft:10}} placeholder="请选择主题" value={currentTheme} onChange={this.handleThemeChange}>
            {
              themeList.map(theme=><Option key={theme.value} value={theme.value}>{theme.label}</Option>)
            }
          </Select>
          <Button className="ml-10" type="primary" onClick={this.handleGetContent}>获取内容</Button>
        </div>
        <div id="editor" className="m-editor"></div>
      </div>
    )
  }
  componentDidMount(){
    const {currentTheme} = this.state;
    this.Editor=monaco.editor.create(document.getElementById("editor"), {
      language:"javascript",
      theme:currentTheme,
		});
  }
}

export default CodeEditor;
