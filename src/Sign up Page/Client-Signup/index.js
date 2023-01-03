import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { post } from "../../Utils/httpHelper";
import { useNavigate } from "react-router-dom";
import { setEmailActive } from "../../Utils/Auth";
import Header from "../Header";

export default function () {
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSignup = () => {
    post(`/Account/Register`, {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: 2,
      email: email,
    }).then((response) => {
      if (response.data.code === 1) {
        navigate("/active-account");
        message.success("Signup successfully! Active this account");
      }
      if (response.data.status === 200) {
        setError("Account is existed!");
      }
    });
  };
  return (
   <div style={{background:'#EEEEEE'}}>
     <Header/>
    <div
      style={{
        marginLeft: "600px",
        marginRight: "600px",
        borderStyle: "solid",
        borderColor: "#236702",
        background:'white'
      }}
    >
      <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
        Sign up to hire talent
      </h2>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSignup}
        autoComplete="off"
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "50px",
        }}
      >
        {error && (
          <>
            <small style={{ color: "red", fontSize: "20px" }}>{error}</small>
            <br />
          </>
        )}
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input
            name="firstname"
            placeholder="First name..."
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input
            name="lastname"
            placeholder="Last name..."
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Email is not valid",
            },
          ]}
        >
          <Input
            name="email"
            placeholder="Email..."
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailActive(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            name="username"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Password must be more than 8 characters",
            },
          ]}
        >
          <Input.Password
            name="'password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="confirm" valuePropName="checked">
          <Checkbox onChange={() => setDisable(false)}>
            I understand the User Agreement and Privacy Policies
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              background: "#037C00",
              width: "100px",
              color: "white",
              fontWeight: "bold",
            }}
            disabled={disable}
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <div style={{ fontSize: "15px" }}>Already have an account?</div>
      <a
        href="/login"
        style={{ color: "#037C00", fontWeight: "bold", fontSize: "20px" }}
      >
        Log in
      </a>
    </div>
   </div>
  );
}
