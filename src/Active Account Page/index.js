import React, { useRef, useState } from "react";
import "../Active Account Page/style-main.css";
import "../Active Account Page/style-util.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { post, put } from "../Utils/httpHelper";
import { getEmailActive, setToken } from "../Utils/Auth";

export default function () {
  const [verifyCode, setVerifyCode] = useState();
  const [email, setEmail] = useState(getEmailActive());
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleVerify = () => {
    put(`/Account/Activate`, {
      email: email,
      verifyCode: verifyCode,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Your account is active!");
        navigate("/");
      }
      if (response.data.status === 200) {
        setError("Invalid code");
      }
    });
  };
  return (
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <Form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
            <span class="login100-form-title">Active your account</span>
           
            <h2>
              Your email:
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {" "}
                {getEmailActive()}
                <input name="email" value={getEmailActive()} hidden />
              </p>
            </h2>
            {error && (
              <>
                <small style={{ color: "red", fontSize: "20px" }}>
                  {error}
                </small>
                <br />
              </>
            )}
            <div class="wrap-input100 validate-input">
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input password!" }]}
              >
                <input
                  className="input100"
                  name="verifyCode"
                  placeholder="Verify Code"
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
              </Form.Item>

              <span class="focus-input100"></span>
            </div>

            <div class="container-login100-form-btn">
              <button class="login100-form-btn" onClick={handleVerify}>
                Verify
              </button>
            </div>

            <div class="flex-col-c p-t-170 p-b-40">
              <a href="/" class="txt3">
                Login now
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
