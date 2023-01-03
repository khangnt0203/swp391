import { Menu, Layout } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  BankOutlined,
  UserOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidenav(props) {
  return (
    <>
      <Menu
        mode="inline"
        defaultOpenKeys="sub1,sub2,sub3,sub4"
        style={{ width: "250px" }}
      >
        <Menu.Item onClick={() => props.onChoice("DASHBOARD")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: 7, color: "#7B68EE" }}
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-house-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fill-rule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
          Dashboard
        </Menu.Item>

        <SubMenu
          key="sub1"
          icon={<UserOutlined style={{ color: "#7B68EE" }} />}
          title="Report Management"
        >
          <Menu.Item onClick={() => props.onChoice("FREELANCER")}>
            Freelancer Report
          </Menu.Item>
          <Menu.Item onClick={() => props.onChoice("CLIENT")}>Client Report</Menu.Item>
        </SubMenu>

       

        <SubMenu
          key="sub2"
          title="  Account Management"
          icon={<ApartmentOutlined style={{ color: "green" }} />}
        >
         <Menu.Item onClick={() => props.onChoice("FREELANCER ACCOUNT")}>
         Freelancer Account
        </Menu.Item>
        <Menu.Item onClick={() => props.onChoice("CLIENT ACCOUNT")}>
          Client Account
        </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub3"
          title="Findwork Management"
          icon={<ApartmentOutlined style={{ color: "green" }} />}
        >
          <Menu.Item onClick={() => props.onChoice("SKILL")}>
            Skill Category
          </Menu.Item>
          <Menu.Item onClick={() => props.onChoice("JOB")}>
            Job Category
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

export default Sidenav;
