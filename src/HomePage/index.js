import React from "react";
import "antd/dist/antd.css";
import "./style-main.css";
import "../Utils/Styleguide.css";
import "bootstrap/dist/css/bootstrap.css";
import rectangle from "./images/rectangle-24.jpg";
import hiring from "./images/hiring.png";
import forTalent from "./images/forTalents.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  return (
    <div className="home-page-screen">
      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-lg-4">
          <h2>
            <a href="/" className="findwork">
              Findwork
            </a>
          </h2>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-1">
          <button
            type="button"
            className="login btn btn-white"
            onClick={(e) => navigate("/login")}
            style={{
              paddingTop: "10px",
              minHeight: "35px",
              width: "160px",
              fontSize: "20px",
            }}
          >
            Log in
          </button>
        </div>
        <div className="col-lg-1">
          <button
            type="button"
            className="signUp btn btn-success"
            onClick={(e) => navigate("/signup")}
            style={{
              alignItems: "center",
              minHeight: "35px",
              width: "160px",
              fontSize: "20px",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
      <div style={{ border: "solid 1px black" }}></div>

      <div
        className="row"
        style={{ height: "350px", marginBottom: "20px", marginTop: "50px" }}
      >
        <div className="col-lg-6">
          <h2
            style={{ color: "black", paddingTop: "50px", fontWeight: "bold" }}
          >
            Work is easy
          </h2>
          <h4 style={{ paddingTop: "30px" }}>
            Forget the old rules. You can have the best
          </h4>
          <h4>people or have the possible work.</h4>
          <h4>Right now. Right here.</h4>
        </div>
        <div className="col-lg-6">
          <img
            style={{ width: "360px", height: "280px", paddingTop: "20px" }}
            src={rectangle}
          />
        </div>
      </div>
      <div
        style={{ border: "solid 1px black", width: "90%", marginLeft: "5%" }}
      ></div>
      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <div className="row">
          <div
            className="col-lg-3"
            style={{ paddingLeft: "30px", paddingTop: "20px" }}
          >
            <h3
              style={{
                color: "green",
                paddingBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Find by Category
            </h3>
          </div>
        </div>

        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => navigate("/FreelancerCategoryPage")}
              style={{
                height: "100px",
                width: "200px",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              Front-end
            </button>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => navigate("/FreelancerCategoryPage")}
              style={{
                height: "100px",
                width: "200px",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              Back-end
            </button>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => navigate("/FreelancerCategoryPage")}
              style={{
                height: "100px",
                width: "200px",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              DevOps
            </button>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div
          className="row"
          style={{ paddingTop: "150px", paddingBottom: "20px" }}
        >
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => navigate("/FreelancerCategoryPage")}
              style={{
                height: "100px",
                width: "200px",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              Mobile
            </button>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => navigate("/FreelancerCategoryPage")}
              style={{
                height: "100px",
                width: "200px",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              QC Engineer
            </button>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => navigate("/FreelancerCategoryPage")}
              style={{
                height: "100px",
                width: "200px",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              Data Analys
            </button>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div style={{ paddingTop: "100px" }}>
          <a
            style={{
              paddingLeft: "70%",
              fontSize: "20px",
              color: "green",
              fontWeight: "bold",
            }}
            href={"/FreelancerCategoryPage"}
          >
            See more
          </a>
        </div>
      </div>
      <div style={{ border: "solid 1px black", marginTop: "200px" }}></div>
      <div>
        <img style={{ width: "100%", height: "650px" }} src={hiring} />
      </div>
    </div> //home-page screen
  );
}
