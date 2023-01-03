import Sidenav from "./Layout/Sidenav";
import Header from "./Layout/Header";

import { ToTopOutlined } from "@ant-design/icons";
import { Layout, Drawer, Affix } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import JobTable from "./JobTable";
import Dashboard from "./Dashboard";
import SkillTable from "./SkillTable";
import FreelancerAccount from "./AccountTable/FreelancerAccount";
import ClientAccount from "./AccountTable/ClientAccount";
import FreelancerReport from "./ReportTable/FreelancerReport";
import ClientReport from "./ReportTable/ClientReport";
const { Header: AntHeader, Content, Sider } = Layout;

function AdminPage() {
  const [choice, setChoice] = useState("");
  function handleChoiceChange(e) {
    console.log(e);
    setChoice(e);
  }
  function showRoute() {
    switch (choice) {
      case "SKILL":
        return <SkillTable />;
      case "JOB":
        return <JobTable />;
      case "DASHBOARD":
        return <Dashboard />;
      case "FREELANCER":
        return <FreelancerReport />;
      case "CLIENT":
        return <ClientReport />;
      case "FREELANCER ACCOUNT":
        return <FreelancerAccount />;
        case "CLIENT ACCOUNT":
          return <ClientAccount />;
      default:
        return <Dashboard />;
    }
  }

  useEffect(() => {}, [choice]);

  return (
    <div>
      <Layout>
        <Sider style={{ height: "50px", marginTop: "50px" }}>
          <Sidenav onChoice={(e) => handleChoiceChange(e)} />
        </Sider>
        <Layout>
          <Header />
         <div style={{marginLeft:'100px', marginRight:'100px'}}>
         {showRoute()}
         </div>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminPage;
