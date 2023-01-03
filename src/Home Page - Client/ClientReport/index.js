import React from 'react';
import TopNavigation from '../Top Navigation';
import DetailClientReport from './DetailClientReport';
import { Layout } from "antd";
import "antd/dist/antd.css";
const { Header, Content } = Layout;
export default function() {
    return(
      <>
      <Layout style={{ height: "60px", marginBottom: "50px" }}>
        <Header style={{ background: "#094654" }}>
          <TopNavigation />
        </Header>
      </Layout>
      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <DetailClientReport />
      </div>
    </>
       
        
    );
}