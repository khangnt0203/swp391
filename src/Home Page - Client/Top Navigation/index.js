import React, { useEffect, useState } from "react";
import "../Top Navigation/style.css";
import "antd/dist/antd.css";
import { UserOutlined, WalletOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';

import { Button, Dropdown, Image, Menu } from "antd";
import { getAuth } from "../../Utils/httpHelper";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <a href="/profile-client">Profile</a>,
      },
      {
        key: "2",
        label: <Link to="/client/settings">Setting </Link>,
      },
      {
        key: "3",
        label: <a href="/">Logout</a>,
      },
    ]}
  />
);

export default function () {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    getAuth(`/AccountProfile`).then((response) => {
      if (response.data.code === 1) {
        setProfile(response.data.data);
      }
    });
  }
  function getUser() {
    getAuth(`/AccountProfile`).then((response) => {
      if (response.data.code === 1) {
        setProfile(response.data.data);
      }
    });
  }
  return (
    <div className="topnav">
      <a href="/client">Findwork</a>

      <div className="info">
    
        <a>
          <Dropdown overlay={menu}>
            <Button shape="circle">
              <Image src={profile.imageUrl} width={20} />
            </Button>
          </Dropdown>
        </a>
        <a href="/client/report">
         Report
        </a>
        <a style={{color:'white', float:'right'}}>
        <WalletOutlined />: {profile.wallet} $
        </a>
      </div>
    </div>
  );
}
