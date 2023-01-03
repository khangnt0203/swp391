import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Switch,
  Table,
} from "antd";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getAuth, putAuth } from "../../../Utils/httpHelper";
const { Option } = Select;
const { Search } = Input;
export default function FreelancerAccount() {
  const [take, setTake] = useState(5);
  const [listAccount, setListAccount] = useState([]);
  const [check, setCheck] = useState(true);
  const [skip, setSkip] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [reason, setReason] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [formRequest] = Form.useForm();
  const column = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Account",
      dataIndex: "username",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (e, item) => {
        if (item.isActive === true)
          return <Badge status="processing" text="Active" color="green" />;
        if (item.isActive === false)
          return <Badge status="processing" text="Deactivate" color="red" />;
      },
    },
    {
      render: (e, item) => {
        return (
          <div>
            <Switch
              defaultChecked={item.isActive}
              onChange={onChange}
              onClick={() => setCustomerId(item.id)}
            />
           
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    loadAccount();
  }, [take, skip, searchValue]);
  function onChangeNext() {
    setSkip(skip + 5);
  }
  function onChangePrevious() {
    setSkip(skip - 5);
  }
  function loadAccount() {
    let map = new Map();
    getAuth(`/User/Admin/Freelance?take=${take}&skip=${skip}&searchValue=${searchValue}`).then(
      (response) => {
        if (response.data.code === 1) {
          response.data.data.map((e) => {
            map.set(e.id, e);
          });
          setListAccount([...map.values()]);
        }
      }
    );
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCheck(value)
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsVisibleModal(true);
    setCheck(checked);
  };
  function processAccount() {
    putAuth(
      `/User/Admin/ActiveUser?IsActive=${check}&customerUserId=${customerId}&reason=${reason}`
    ).then((response) => {
      if (response.data.code === 1) {
        message.success("Successfully!");
        formRequest.resetFields();
        loadAccount();
        setIsVisibleModal(false);
      }
    });
  }
  return (
    <div>
      <h1
        style={{
          fontSize: "30px",
          color: "#037C00",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Freelancer Account Management
      </h1>
      <div>
        <Search
          placeholder="Search for account..."
          enterButton
          size="large"
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        />
      </div>
      <Table columns={column} dataSource={listAccount} pagination={false} />
      <Button
        icon={<LeftSquareOutlined />}
        style={{ marginRight: "20px" }}
        disabled={skip === 0}
        onClick={onChangePrevious}
      />
      <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
      {/* Modal Process Account */}
      <Modal
        onCancel={() => setIsVisibleModal(false)}
        visible={isVisibleModal}
        onOk={processAccount}
      >
     
        {check === true ? (
          <div>
            Active this account
            <Form form={formRequest}>
              <Input />
            </Form>
          </div>
        ) : (
          <div>
            Deactivate this account
            <Form form={formRequest}>
              <Input name="reason" />
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
}
