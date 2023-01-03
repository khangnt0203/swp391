import React from "react";
import TopNavigation from "../Top Navigation";
import "antd/dist/antd.css";
import { Layout } from "antd";
import DetailProfile from "./DetailProfile";

const { Header, Sider, Content } = Layout;
export default function () {
  return (
    <Layout>
      <Header
        style={{ marginBottom: "20px", background: "#094654"}}
      >
        <TopNavigation />
      </Header>
      <Layout>
        <Content style={{marginLeft:'200px', marginRight:'200px'}}>
       <DetailProfile/>
        </Content>
      </Layout>
    </Layout>
  );
}
