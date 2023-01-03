import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { delAuth, getAuth, postAuth } from "../../Utils/httpHelper";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
export default function JobTable() {
  const [listJobCate, setListJobCate] = useState([]);
  const [listJob, setListJob] = useState([]);
  const [cate, setCate] = useState();
  const [name, setName] = useState();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [formAdd] = Form.useForm();
  const column = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      render: (e, job) => {
        return (
          <Popconfirm
            title="Delete this job?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteJob(job.id);
            }}
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ background: "#EE0000" }}
            />
          </Popconfirm>
        );
      },
    },
  ];

  useEffect(() => {
    getListJobCate();
    getListJobByCate(cate);
  }, [cate]);

  function getListJobCate() {
    let map = new Map();
    getAuth(`/Category`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((e) => {
          map.set(e.id, e);
        });
        setListJobCate([...map.values()]);
      }
    });
  }

  async function loadCate(e) {
    await setCate(e);
    setIsHidden(false);
  }
  function getListJobByCate(cate) {
    let map = new Map();
    getAuth(`/Category?CategoryId=${cate}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((job) => {
          map.set(job.id, job);
        });
        setListJob([...map.values()]);
      }
    });
  }
  function deleteJob(selectedJob) {
    delAuth(`/Category?Id=${selectedJob}`).then((response) => {
      if (response.data.code === 1) {
        message.success("Delete successfully");
        getListJobByCate(cate);
      }
    });
  }
  function handleAddJob() {
    postAuth(`/Category`, {
      name: name,
      categoryParentId: cate,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Successfully!");
        getListJobByCate(cate);
        setIsVisibleModal(false);
        formAdd.resetFields();
      }
      if (response.status === 400) {
        message.error("Failed!");
      }
    });
  }
  return (
    <div>
      <Modal
        title="Add new job"
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        footer={false}
      >
        <Form form={formAdd} onFinish={handleAddJob} autoComplete="off">
          <Form.Item
            label="Job Type"
            rules={[{ required: true, message: "Please select job type!" }]}
          >
            <Select
              style={{ float: "left", width: "200px", marginBottom: "20px" }}
              placeholder="Select category"
            >
              {listJobCate.map((cate) => (
                <Option key={cate.id} value={cate.id}>
                  {cate.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "This field is required!" }]}
            label="Job name"
          >
            <Input
              placeholder="Job name..."
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ float: "right", color: "white", background: "#094654" }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <h1>Job Category</h1>
      <Button
        style={{
          float: "right",
          marginLeft: "10px",
          background: "#094654",
          color: "white",
          fontWeight: "bold",
        }}
        icon={<PlusOutlined />}
        onClick={() => {
          setIsVisibleModal(true);
        }}
        hidden={isHidden}
      >
        New job
      </Button>

      <Form.Item label="Job Type">
        <Select
          style={{ float: "left", width: "200px", marginBottom: "20px" }}
          placeholder="Select category"
          onChange={loadCate}
        >
          {listJobCate.map((cate) => (
            <Option key={cate.id} value={cate.id}>
              {cate.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Table columns={column} dataSource={listJob} />
    </div>
  );
}
