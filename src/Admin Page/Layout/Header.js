import React from "react";
import "../Layout/style.css";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

import { Button, Dropdown, Image, Menu } from "antd";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <a href="/profile-freelancer">Profile</a>,
      },
      {
        key: "2",
        label: <Link to="/">Setting </Link>,
      },
      {
        key: "3",
        label: <a href="/">Logout</a>,
      },
    ]}
  />
);
export default function () {
  return (
    <div className="topnav" style={{background:'#094654', marginLeft:'-200px'}}>
      <a href="/admin">Findwork</a>

      <div className="info">
        <a>
          <Dropdown overlay={menu}>
            <Button shape="circle">
              <Image src="images/avt1.jpg" width={20} />
            </Button>
          </Dropdown>
        </a>
      </div>
    </div>
  );
}
