import React from "react";
import "./style.css";
import "antd/dist/antd.css";
import { Divider } from "antd";

export default function () {
  return (
    <div className="topnav">
      <Divider orientation="left">
        <a href="/" style={{ color: "#037C00" }}>
          Findwork
        </a>
      </Divider>
    </div>
  );
}
