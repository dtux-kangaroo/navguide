import React, { Component, PropTypes } from 'react';
import { Layout, Skeleton, Select, Tabs, Icon, message } from 'antd';
import copy from 'copy-to-clipboard';
import './style.scss';

const { Header, Content } = Layout;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class ConfigPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            basic_version: '5.1.2',
            main_data:[{
                platform: 'Ubuntu &amp; Debian',
                wes: '64 Bit',
                sha:'SHA256: 329a9ed4008c4445af31a9fa38a6c8ec928c49c34d4bfd69499f4c41617fa09',
                href:'npm install https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_4.6.4_amd64.deb',
                yarn_href: 'yarn add https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_4.6.4_amd64.deb'
            },{
                platform: 'Ubuntu &amp; Debian',
                wes: '64 Bit',
                sha:'SHA256: 329a9ed4008c4445af31a9fa38a6c8ec928c49c34d4bfd69499f4c41617fa09',
                href:'npm install https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.6.4.linux-x64.tar.gz',
                yarn_href: 'yarn add https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.6.4.linux-x64.tar.gz'
            },{
                platform: 'Ubuntu &amp; Debian',
                wes: '64 Bit',
                sha:'SHA256: 329a9ed4008c4445af31a9fa38a6c8ec928c49c34d4bfd69499f4c41617fa09',
                href:'npm install https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.6.4-1.x86_64.rpm',
                yarn_href: 'yarn add https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.6.4-1.x86_64.rpm'
            },{
                platform: 'Ubuntu &amp; Debian',
                wes: '64 Bit',
                href:'npm install https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_4.6.4_amd64.deb',
                yarn_href: 'yarn add https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_4.6.4_amd64.deb'
            },{
                platform: 'Ubuntu &amp; Debian',
                wes: '64 Bit',
                href:'npm install https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.6.4.linux-x64.tar.gz',
                yarn_href: 'yarn add https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.6.4.linux-x64.tar.gz'
            }],
            version_data: [2.1,2.2,2.3,2.4,2.5,3.0,3.1,3.2,3.3,3.5,4.0,4.3,4.6,4.9,5.1],
            builds_data: [2.1,2.2,2.3,2.4,2.5,3.0,3.1,3.2,3.3,3.5,4.0,4.3,4.6,4.9,5.2],
        }
    }

    versionChange = (val) => {
        this.setState({basic_version:val})
    }

    copyHref = (e) => {
        const install_href = e.target.parentNode.getAttribute('data-name');
        copy(install_href)
        message.success('复制成功')
    }
    render(){
        const {
            basic_version,
            version_data,
            builds_data,
            main_data
        } = this.state;
        return(
            <Layout className="config-ct">
                <Header>
                    <Skeleton style={{width: '30%'}} active={true} avatar={true} paragraph={false} title={false} />
                    <ul className="config-nav">
                        <li><a href="">dtux</a></li>
                        <li><a href="">dtuxCloud</a></li>
                        <li><a href="">Dtux Enterprise</a></li>
                        <li><a href="">Dash board</a></li>
                    </ul>
                </Header>
                <Content className="version-ct">
                    <ul className="version-des">
                        <li><h1>Download dtux</h1></li>
                        <li>{basic_version}</li>
                    </ul>
                    <div className="builds-des">  
                        <Select
                            style={{ width: 150, margin: '0 20px' }}
                            placeholder="Select a version"
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
                            style={{ width: 150, margin: '0 20px' }}
                            placeholder="Select a buils"
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
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="linux" key="1" tab={<span className="tab_o_icon"><li><Icon type="slack" theme="outlined" style={{fontSize: '40px'}} /></li><li>Linux</li></span>}>
                            {
                                main_data.map(res => {
                                    return(
                                        <div>
                                            <div className="tab-o-ct">
                                                <span className="title">{res.platform}</span>
                                                <span className="des">({res.wes})</span>
                                                <span className="href">{res.sha}</span>
                                            </div>
                                            <div className="copy-ct">
                                                <div>
                                                    <span className="install_href">{res.href}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.href} onClick={this.copyHref}/>
                                                </div>
                                                <div>
                                                    <span className="install_href">{res.yarn_href}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.yarn_href} onClick={this.copyHref}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </TabPane>
                            <TabPane tab="mac" key="2" tab={<span className="tab_t_icon"><li><Icon type="apple" style={{fontSize: '40px'}} /></li><li>Mac</li></span>}>
                            {
                                main_data.map(res => {
                                    return(
                                        <div>
                                            <div className="tab-o-ct">
                                                <span className="title">{res.platform}</span>
                                                <span className="des">({res.wes})</span>
                                                <span className="href">{res.sha}</span>
                                            </div>
                                            <div className="copy-ct">
                                                <div>
                                                    <span className="install_href">{res.href}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.href} onClick={this.copyHref}/>
                                                </div>
                                                <div>
                                                    <span className="install_href">{res.yarn_href}</span>
                                                    <Icon type="copy" theme="outlined" style={{marginLeft: '10px', fontSize:'15px'}} data-name={res.yarn_href} onClick={this.copyHref}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </TabPane>
                        </Tabs>
                </Content>
            </Layout>
        )
    }
}

export default ConfigPage