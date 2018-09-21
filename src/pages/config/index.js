import React, { Component, PropTypes } from 'react';
import { Layout, Select, Tabs } from 'antd';
import copy from 'copy-to-clipboard';
import './style.scss';
import logo from 'assets/imgs/logo.png';
import DtComp from './dtComp';

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;

class ConfigPage extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <Layout className="config-ct">
                <Header>
                    <img src={logo} style={{width:'100px'}} />
                    {/* <ul className="config-nav">
                        <li><a href="">dtux</a></li>
                        <li><a href="">dtuxCloud</a></li>
                        <li><a href="">Dtux Enterprise</a></li>
                        <li><a href="">Dash board</a></li>
                    </ul> */}
                </Header>
                <DtComp />
                {/* <Tabs
                    defaultActiveKey="1"
                    style={{ height: 220, width: '80%',margin: '0 auto' }}
                    >
                    <TabPane tab="react-pc框架" key="1">
                        <DtComp />
                    </TabPane>
                    <TabPane tab="react-mobile框架" key="2">
                        <DtComp />
                    </TabPane>
                    <TabPane tab="vue-pc框架" key="3"><DtComp /></TabPane>
                    <TabPane tab="vue-mobile框架" key="4"><DtComp /></TabPane>
                    <TabPane tab="electron框架" key="5">Content of tab 5</TabPane>
                    <TabPane tab="angular-pc框架" key="6">Content of tab 6</TabPane>
                    <TabPane tab="小程序框架" key="7">Content of tab 7</TabPane>
                </Tabs> */}
                {/* <DtComp /> */}
            </Layout>
        )
    }
}

export default ConfigPage