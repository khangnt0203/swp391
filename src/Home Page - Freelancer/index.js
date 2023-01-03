import React from "react";
import TopNavigation from "./Top Navigation";
import SiderNavigation from "./Sider Navigation";
import "antd/dist/antd.css";
import { Layout } from "antd";
import ContentDetail from "./Content Detail";
const { Header, Sider, Content } = Layout;
export default function () {
  return (
    <>
      <Layout style={{height:'60px'}}>
        <Header style={{background: "#094654",  width:'100%' }}>
          <TopNavigation />
        </Header>
      </Layout>
      <div>
        <ContentDetail />
      </div>
    </>
  );
}
