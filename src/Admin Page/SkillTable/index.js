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
import { delAuth, getAuth, postAuth, putAuth } from "../../Utils/httpHelper";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function SkillTable() {
  const [listJobCate, setListJobCate] = useState([]);
  const [listJob, setListJob] = useState([]);
  const [listSkill, setListSkill] = useState([]);
  const [job, setJob] = useState();
  const [jobSelect, setJobSelect] = useState();
  const [cate, setCate] = useState();
  const [skilName, setSkilName] = useState();
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
      dataIndex: "skilName",
    },
    {
      render: (e, job) => {
        return (
          <Popconfirm
            title="Delete this skill?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteSkill(job.skillId);
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
    getListSkillByJob(job);
  }, [cate, job]);

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
  }

  async function loadJob(e) {
    await setJob(e);
    setIsHidden(false);
  }

  async function jobSelected(e) {
    await setJobSelect(e);
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

  function getListSkillByJob(job) {
    let map = new Map();
    getAuth(`/Skill?CategoryId=${job}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.skills.map((skill) => {
          map.set(skill.skillId, skill);
        });
        setListSkill([...map.values()]);
      }
    });
  }
  function deleteSkill(selectedJob) {
    delAuth(`/Skill?id=${selectedJob}`).then((response) => {
      if (response.data.code === 1) {
        message.success("Delete successfully");
        getListJobByCate(cate);
        getListSkillByJob(job);
      }
    });
  }
  function handleAddSkill() {
    postAuth(`/Skill`, {
      name: skilName,
      categoryId: jobSelect,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Successfully!");
        getListJobByCate(cate);
        getListSkillByJob(job);
        setIsVisibleModal(false);
        formAdd.resetFields();
      }
      if (response.status === 400) {
        message.error("Failed!");
      }
    });
    console.log(jobSelect);
  }
  return (
    <div>
      <Modal
        title="Add new job"
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        footer={false}
      >
        <Form form={formAdd} onFinish={handleAddSkill} autoComplete="off">
          <Form.Item
            label="Job Type"
            rules={[{ required: true, message: "Please select job type!" }]}
          >
            <Select
              style={{ float: "left", width: "200px", marginBottom: "20px" }}
              placeholder="Select job type"
            >
              {listJobCate.map((cate) => (
                <Option key={cate.id} value={cate.id}>
                  {cate.name}
                </Option>
              ))}
            </Select>
            <Select
              style={{ float: "left", width: "200px", marginBottom: "20px" }}
              placeholder="Select main job"
              onChange={jobSelected}
            >
              {listJob.map((job) => (
                <Option key={job.id} value={job.id}>
                  {job.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="skilName"
            rules={[{ required: true, message: "This field is required!" }]}
            label="Skill name"
          >
            <Input
              placeholder="Skill name..."
              name="skilName"
              onChange={(e) => {
                setSkilName(e.target.value);
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
      <h1>Skill Category</h1>
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
        New skill
      </Button>

      <Form.Item label="Job Type">
        <Select
          style={{
            float: "left",
            width: "200px",
            marginBottom: "20px",
            marginRight: "10px",
          }}
          placeholder="Select job type"
          onChange={loadCate}
        >
          {listJobCate.map((cate) => (
            <Option key={cate.id} value={cate.id}>
              {cate.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ float: "left", width: "200px", marginBottom: "20px" }}
          placeholder="Select main job"
          onChange={loadJob}
        >
          {listJob.map((job) => (
            <Option key={job.id} value={job.id}>
              {job.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Table columns={column} dataSource={listSkill} />
    </div>
  );
}
