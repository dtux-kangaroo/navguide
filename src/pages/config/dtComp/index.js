import React, { Component, Fragment } from 'react';
import { Layout, Select, Tabs, Icon, message } from 'antd';
import copy from 'copy-to-clipboard';
import apis from "../../../constants/apis";
import http from "utils/http";
import './style.scss';

const { Content } = Layout;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class DtComp extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeKey: 'linux',
            version_val: '',
            version_detail: '',
            basic_version: '',
            version_data: [],
            builds_data: [],
            main_data: [],
        }
    }
    componentDidMount(){
        http.get(apis.getVersionData).then(res =>{
            
            if(this.getQueryString('version')){
                let version_data = [],builds_data=[];

                res.data.forEach(res => {
                    const version = res.version_name;
                    const version_d = res.children;
                    version_data.push(version)
                    if(Number(res.version_name) == this.getQueryString('version')){
                        
                        res.children.forEach(res => {builds_data.push(res.version_datail)})
                        this.setState({
                            version_data,
                            builds_data,
                            version_val: res.version_name,
                            version_detail: res.children[0].version_datail
                        })
                    }

                    res.children.forEach(res => {
                        if(res.version_datail == this.getQueryString('version')){
                            let builds_data = [];

                            version_d.forEach(res => {
                                builds_data.push(res.version_datail)
                            })
                            this.setState({
                                version_data,
                                builds_data,
                                version_val: version,
                                version_detail: res.version_datail
                            })
                        }
                    })
                })
                this.setState({
                    version_select: this.getQueryString('version')
                })
            }else{
                this.setState({
                    version_val: res.data[0].version_name,
                    version_detail: (res.data[0].children)[0].version_datail
                })
            }
        })
        
        http.get(apis.getHrefData).then(res => {
            const allData = res.data;
            const len = this.getQueryString('version').length?this.getQueryString('version').length:0;
            const { activeKey } = this.state;

            res.data.forEach(res => {
                const version_parent = res.version_parent;
                const version_name = res.version_name;
                if((len<=3) && (this.getQueryString('version') == version_parent)){
                    switch (activeKey){
                        case 'linux':
                            this.setState({ main_data: allData[0].platform.linux })
                        break;
                        case 'mac':
                            this.setState({ main_data: allData[0].platform.mac })
                        break;
                    }
                }else if(len>3){
                    if(this.getQueryString('version') == version_name){
                        switch (activeKey){
                            case 'linux':
                                this.setState({ main_data: res.platform.linux })
                            break;
                            case 'mac':
                                this.setState({ main_data: res.platform.mac })
                            break;
                        }
                    }
                }
            })
        })
        
    }

    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    versionChange = (val) => {
        http.get(apis.getVersionData).then(res =>{
            res.data.forEach(res => {
                if(val == res.version_name){
                    let builds_data=[];
                    const { activeKey } = this.state;

                    res.children.forEach(res => {
                        builds_data.push(res.version_datail)
                    })

                    http.get(apis.getHrefData).then(res => {
                        res.data.forEach(res => {
                            if(res.version_name == builds_data[0]){
                                switch (activeKey){
                                    case 'linux':
                                        this.setState({ main_data: res.platform.linux })
                                    break;
                                    case 'mac':
                                        this.setState({ main_data: res.platform.mac })
                                    break;
                                }
                            }
                        })
                    })

                    this.setState({
                        builds_data,
                        version_val: res.version_name,
                        version_detail: builds_data[0]
                    })
                }
            })
        })
    }

    buildChange = (val) => {
        const { activeKey } = this.state;

        http.get(apis.getHrefData).then(res => {
            res.data.forEach(res => {
                if(res.version_name == val){
                    switch (activeKey){
                        case 'linux':
                            this.setState({ main_data: res.platform.linux })
                        break;
                        case 'mac':
                            this.setState({ main_data: res.platform.mac })
                        break;
                    }
                }
            })
        })
        this.setState({
            version_detail: val
        })
    }

    copyHref = (e) => {
        const install_href = e.target.parentNode.getAttribute('data-name');
        copy(install_href)
        message.success('复制成功')
    }

    platformChange = (val) => {
        this.setState({
            activeKey: val
        })
    }

    render(){
        const {
            activeKey,
            version_val,
            version_detail,
            version_data,
            builds_data,
            main_data
        } = this.state;
        return(
            <Fragment>
                <Content className="version-ct">
                    <ul className="version-des">
                        <li><h1>Download dtux</h1></li>
                        <li>{version_detail}</li>
                    </ul>
                    <div className="builds-des">  
                        <Select
                            style={{ width: 150, margin: '0 20px' }}
                            placeholder="Select a version"
                            value={version_val}
                            onChange={this.versionChange}
                        >
                            {
                                version_data.map((res,index) => {
                                    return(
                                        <Option value={res} key={index}>{res}</Option>
                                    )
                                })
                            }
                        </Select>

                        <Select
                            value={version_detail}
                            style={{ width: 150, margin: '0 20px' }}
                            placeholder="Select a buils"
                            onChange={this.buildChange}
                        >
                            {
                                builds_data.map((res,index) => {
                                    return(
                                        <Option value={res} key={index}>{res}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </Content>
                <Content className="plat-ct">
                        <Tabs activeKey={activeKey} onChange={this.platformChange}>
                            <TabPane tab="linux" key="linux" tab={<span className="tab_o_icon"><li><Icon type="slack" theme="outlined" style={{fontSize: '40px'}} /></li><li>Linux</li></span>}>
                            {
                                main_data.map(res => {
                                    return(
                                        <div>
                                            <div className="tab-o-ct">
                                                <span className="title">{res.title}</span>
                                                <span className="des">({res.wes})</span>
                                                <span className="href">{res.des}</span>
                                            </div>
                                            <div className="copy-ct">
                                                <div>
                                                    <span className="install_href">{res.order_one}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.order_one} onClick={this.copyHref}/>
                                                </div>
                                                <div>
                                                    <span className="install_href">{res.order_two}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.order_two} onClick={this.copyHref}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </TabPane>
                            <TabPane tab="mac" key="mac" tab={<span className="tab_t_icon"><li><Icon type="apple" style={{fontSize: '40px'}} /></li><li>Mac</li></span>}>
                            {
                                main_data.map(res => {
                                    return(
                                        <div>
                                            <div className="tab-o-ct">
                                                <span className="title">{res.title}</span>
                                                <span className="des">({res.wes})</span>
                                                <span className="href">{res.des}</span>
                                            </div>
                                            <div className="copy-ct">
                                                <div>
                                                    <span className="install_href">{res.order_one}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.order_one} onClick={this.copyHref}/>
                                                </div>
                                                <div>
                                                    <span className="install_href">{res.order_two}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.order_two} onClick={this.copyHref}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </TabPane>
                        </Tabs>
                </Content>
            </Fragment>
        )
    }
}
export default DtComp;