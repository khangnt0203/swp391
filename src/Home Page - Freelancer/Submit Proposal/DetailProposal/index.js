import {
  Checkbox,
  Divider,
  Button,
  message,
  Descriptions,
  Form,
  Row,
  Col,
  Card,
  Input,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { getJobPost } from "../../../Utils/Auth";
import { getAuth, postAuth, putAuth } from "../../../Utils/httpHelper";
import { MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function () {
  const [isDisable, setIsDisable] = useState(true);
  const [profile, setProfile] = useState([]);
  const [jobDetail, setJobDetail] = useState();
  const [content, setContent] = useState("");
  const [budget, setBudget] = useState("");
  const [jobId, setJobId] = useState();
  const [listSkillJob, setListSkillJob] = useState([]);
  const navigate = useNavigate();
  let jobPost = getJobPost();
  function handleCancel() {
    navigate("/freelancer");
  }
  function getJobDetail() {
    getAuth(`/Job?jobId=${jobPost}`).then((response) => {
      if (response.data.code === 1) {
        setJobDetail(response.data.data);
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
  function loadSkillJob() {
    let map = new Map();
    getAuth(`/Job/Skills?jobId=${jobPost}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skill) => {
          map.set(skill.skillId, skill);
        });
        setListSkillJob([...map.values()]);
      }
    });
  }
  function submitProposal() {
    postAuth(`/Covenant`, {
      jobId: jobPost,
      contentRequest: content,
      budgetRequest: budget,
      status: "Pending",
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Submit successfully! Waiting for result...");
        navigate("/freelancer/my-covenant");
      }
      if (response.data.status === 200) {
        message.error("You've applied this job!");
      }
    });
  }
  useEffect(() => {
    getJobDetail();
    getUser();
    loadSkillJob();
  }, []);
  return (
    <div>
      <h1
        style={{
          fontSize: "30px",
          color: "#037C00",
          fontWeight: "bold",
          textAlign: "left",
          marginLeft: "80px",
        }}
      >
        Submit a Proposal
      </h1>
      {jobDetail ? (
        <>
          <p
            style={{
              size: "20px",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#236702",
            }}
          >
            {jobDetail.title}
          </p>
          <div
            className="site-card-wrapper"
            style={{ marginLeft: "50px", marginBottom: "20px" }}
          >
            <Form style={{ textAlign: "left" }}>
              <Row gutter={24}>
                <Col span={14}>
                  <Card title="Job Detail">
                    <Descriptions>
                      <Descriptions.Item label="File Url">
                        {" "}
                        <a href={jobDetail.fileUrl}>{jobDetail.fileUrl}</a>
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions bordered layout="vertical">
                      <Descriptions.Item
                        label="Job Description"
                        span={3}
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        {jobDetail.description}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Job Type"
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        {jobDetail.typeWork === 0 ? (
                          <>Short Time</>
                        ) : (
                          <>Long Time</>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Job level"
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        {jobDetail.level === 0 ? (
                          <>Entry</>
                        ) : jobDetail.level === 1 ? (
                          <>Intermediate</>
                        ) : jobDetail.level === 2 ? (
                          <>Expert</>
                        ) : null}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Scope"
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        {jobDetail.scope === 0 ? <>Medium</> : <>Small</>}
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    {jobDetail.typeBudget === 0 ? (
                      <Descriptions
                        title="Pay for Job"
                        bordered
                        layout="vertical"
                      >
                        <Descriptions.Item
                          label="Job budget"
                          labelStyle={{ fontWeight: "bold" }}
                        >
                          {jobDetail.jobBudget} $
                        </Descriptions.Item>
                      </Descriptions>
                    ) : (
                      <Descriptions
                        title="Pay for Hour"
                        bordered
                        layout="vertical"
                      >
                        <Descriptions.Item
                          label="Min budget"
                          labelStyle={{ fontWeight: "bold" }}
                        >
                          {jobDetail.minBudget} $
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Max budget"
                          labelStyle={{ fontWeight: "bold" }}
                        >
                          {jobDetail.maxBudget} $
                        </Descriptions.Item>
                      </Descriptions>
                    )}
                    <Divider />
                    <Descriptions
                      title="Requirement"
                      bordered
                      layout="vertical"
                    >
                      <Descriptions.Item
                        label="Skill Expertise"
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        {listSkillJob.map((s) => (
                          <Tag
                          color="green"
                          style={{
                            height: "1.5rem",
                            width: "4.5rem",
                            fontSize: "1rem",
                            textAlign: "center",
                          }}
                        >
                          {s.skilName}
                        </Tag>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Quantity of Proposal"
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        {jobDetail.maxMember}
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Your information" bordered={false}>
                    <Form.Item label="Full name">
                      {profile.firstname + " " + profile.lastname}
                    </Form.Item>
                    <Form.Item label="Email">{profile.email}</Form.Item>
                    <Form.Item
                      label="Desired amount"
                      name="budget"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input your desired amount that you want!",
                        },
                      ]}
                    >
                      <Input
                        name="budget"
                        addonAfter="$"
                        style={{ width: "100px" }}
                        onChange={(e) => setBudget(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Note"
                      rules={[
                        {
                          required: true,
                          message: "Input your message that you want!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </Form>
          </div>
          <Divider />
          <div style={{ marginLeft: "500px" }}>
            <Checkbox
              style={{ fontWeight: "bold", fontSize: "15px" }}
              onClick={() => setIsDisable(false)}
            >
              I understand the policies
            </Checkbox>
          </div>
          <div style={{ marginLeft: "500px" }}>
            <Button
              style={{
                marginRight: "20px",
                width: "100px",
                borderStyle: "none",
                background: "#F0F2F5",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "100px",
                background: "#037C00",
                color: "white",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
              disabled={isDisable}
              onClick={submitProposal}
            >
              Submit
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
