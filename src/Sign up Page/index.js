import React from "react";
import "antd/dist/antd.css";

import { Card, Divider } from "antd";
import Header from "./Header";

export default function () {
  const gridStyle = {
    width: "50%",
    textAlign: "center",
  };

  return (
    <div style={{background:'#EEEEEE'}}>
         <Header />
      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          borderStyle: "solid",
          borderColor: "#236702",
        }}
      >
        <Card
          title="Join as a Freelancer or Client"
          style={{ textAlign: "center" }}
        >
          <Card.Grid style={gridStyle}>
            <img
              src="https://thumbs.dreamstime.com/b/curriculum-vitae-sticker-icon-simple-thin-line-outline-vector-cv-icons-ui-ux-website-mobile-application-green-179926993.jpg"
              alt="error"
              style={{
                height: "100px",
                width: "100px",
                marginBottom: "20px",
                marginRight: "20px",
              }}
            />
            <a href="/signup-client" style={{ fontSize: "20px" }}>
              I’m client, hiring for a project
            </a>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPs6AjVuvb0ZgUZe9r2qW7F1AHyoGivAE5ng&usqp=CAU"
              alt="error"
              style={{
                height: "100px",
                width: "100px",
                marginBottom: "20px",
                marginRight: "20px",
              }}
            />

            <a href="/signup-freelancer" style={{ fontSize: "20px" }}>
              I’m freelancer, looking for work
            </a>
          </Card.Grid>
          <Divider />
          <div style={{ fontSize: "15px" }}>
            Already have an Findwork account?
          </div>
          <a
            href="/signup-freelancer"
            style={{ color: "#037C00", fontWeight: "bold", fontSize: "20px" }}
          >
            Log in
          </a>
        </Card>
      </div>
    </div>
  );
}
