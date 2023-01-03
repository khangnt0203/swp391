import React from "react";
import { Layout } from "antd";
import TopNavigation from "../Top Navigation";
import DetailProposalCovenant from "./DetailProposalCovenant";
const { Header, Content } = Layout;
export default function index() {
  return (
    <>
      <Layout style={{ height: "60px", marginBottom: "50px" }}>
        <Header style={{ background: "#094654" }}>
          <TopNavigation />
        </Header>
      </Layout>
      <div style={{ marginLeft: "100px", marginRight: "100px" }}>
        <DetailProposalCovenant />
      </div>
    </>
  );
}
