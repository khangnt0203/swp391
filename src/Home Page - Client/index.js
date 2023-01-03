import React from 'react';
import TopNavigation from '../Home Page - Client/Top Navigation';
import ContentDetail from '../Home Page - Client/ContentDetail';
import { Layout } from "antd";
import "antd/dist/antd.css";
const { Header, Content } = Layout;
export default function() {
    return(
        <Layout>
      <Header
        style={{ marginBottom: "30px", background: "#094654", height: "80px" }}
      >
        <TopNavigation />
      </Header>
      <Layout>
            <Content>
                <ContentDetail/>
            </Content>
        </Layout>
    </Layout>
       
        
    );
}