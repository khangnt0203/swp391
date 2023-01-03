import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login Page/style-main.css";
import "../Login Page/style-util.css";
import { Form, Input } from "antd";
import { post } from "../Utils/httpHelper";
import {
  getEmailActive,
  getToken,
  setEmailActive,
  setToken,
  setUser,
} from "../Utils/Auth";
import jwtDecode from "jwt-decode";
import Header from "./Header";

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    post(`/Account/Login`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.code === 1) {
        setToken(response.data.data);

        //decode JWT token
        let decode = jwtDecode(getToken(), { payload: true });
        let role = decode.actort;
        let user = decode.jti;
        setUser(user);

        if (role === "Client") {
          navigate("/client");
        }
        if (role === "Freelancer") {
          navigate("/freelancer");
        }
        if(role === "Admin"){
          navigate('/admin')
        }
      }
      if (response.data.status === 200) {
        setError("Invalid Account");
      }
      if (response.data.code === 0) {
        setEmailActive(response.data.data.email);
        setError("Account is not active");
        console.log("email:", getEmailActive());
      }
    });
  };
  let show;
  if (error === "Account is not active") {
    show = <a href="/active-account">Click here to active your account</a>;
  }
  return (
    <div class="limiter">
      <Header/>
      <div class="container-login100" style={{background:'#EEEEEE'}}>
        <div class="wrap-login100">
          <Form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
            <span class="login100-form-title">Login to Findwork</span>
            {error && (
              <>
                <small style={{ color: "red", fontSize: "20px" }}>
                  {error}
                  <br />
                  {show}
                </small>
                <br />
              </>
            )}
            <div class="wrap-input100 validate-input m-b-16">
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input username!" }]}
              >
                <Input
                  className="input100"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <span class="focus-input100"></span>
            </div>

            <div class="wrap-input100 validate-input">
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input password!" }]}
              >
                <Input
                  type="password"
                  className="input100"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <span class="focus-input100"></span>
            </div>

            <div class="text-right p-t-13 p-b-23"></div>

            <div class="container-login100-form-btn">
              <button class="login100-form-btn" onClick={handleLogin}>
                Log in
              </button>
            </div>

            <div class="flex-col-c p-t-170 p-b-40">
              <span class="txt1 p-b-9">Don’t have Findwork account?</span>

              <a href="/signup" class="txt3">
                Sign up now
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
