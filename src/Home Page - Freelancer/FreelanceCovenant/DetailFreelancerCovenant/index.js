import {
  Tabs,
  Table,
  Tag,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Space,
  Radio,
  Descriptions,
  Divider,
  Card,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  delAuth,
  delRequest,
  getAuth,
  postAuth,
  putAuth,
} from "../../../Utils/httpHelper";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  MessageOutlined,
  CheckOutlined,
  StopOutlined,
  SyncOutlined,
  WarningOutlined,
  DollarOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { getJobPost, setJobPost } from "../../../Utils/Auth";
const { TabPane } = Tabs;
export default function DetailFreelancerCovenant() {
  const [listCovenant, setListCovenant] = useState([]);
  const [status, setStatus] = useState(0);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [selectedJob, setSelectedJob] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleModalQuit, setIsVisibleModalQuit] = useState(false);
  const [isVisibleModalFinish, setIsVisibleModalFinish] = useState(false);
  const [isVisibleModalWorking, setIsVisibleModalWorking] = useState(false);
  const [isVisibleModalReport, setIsVisibleModalReport] = useState(false);
  const [listSkillJob, setListSkillJob] = useState([]);
  const [budgetRequest, setBudgetRequest] = useState();
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [jobDetail, setJobDetail] = useState();
  const [reason, setReason] = useState();
  const [formRequest] = Form.useForm();
  const navigate = useNavigate();
  const column = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Project Name",
      dataIndex: "jobTitle",
      render: (e, item) => {
        return (
          <a
            onClick={() => {
              setJobPost(item.jobId);
              setShowJobDetail(true);
            }}
          >
            {item.jobTitle}
          </a>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (e, item, index) => {
        if (item.status === "Pending")
          return (
            <Tag
              style={{ backgroundColor: "#FF6600", color: "white" }}
              icon={<SyncOutlined />}
            >
              Pending
            </Tag>
          );
        if (item.status === "Reject")
          return (
            <Tag
              style={{ backgroundColor: "#CC0000", color: "white" }}
              icon={<StopOutlined />}
            >
              Rejected
            </Tag>
          );
        if (item.status === "Approve")
          return (
            <Tag
              style={{ backgroundColor: "#00FF00" }}
              icon={<CheckOutlined />}
            >
              Approved
            </Tag>
          );
        if (item.status === "Working")
          return (
            <Tag
              style={{ backgroundColor: "#00CCFF" }}
              icon={<LoadingOutlined />}
            >
              Working
            </Tag>
          );
        if (item.status === "Finish")
          return (
            <Tag
              style={{ backgroundColor: "#FFCC00" }}
              icon={<FileTextOutlined />}
            >
              Finished
            </Tag>
          );
        if (item.status === "Complete")
          return (
            <Tag
              style={{ backgroundColor: "#006600", color: "white" }}
              icon={<FileDoneOutlined />}
            >
              Completed
            </Tag>
          );
        if (item.status === "NotComplete")
          return (
            <Tag
              style={{ backgroundColor: "#660000", color: "white" }}
              icon={<FileExcelOutlined />}
            >
              Not Completed
            </Tag>
          );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createAt",
      render: (e, item) => {
        return <>{dateFormat(item.createAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "Note",
      dataIndex: "reason",
    },
    {
      render: (e, item) => {
        if (item.status === "Approve")
          return (
            <>
              <Popconfirm
                title="Are your sure to work this job?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  setIsVisibleModalWorking(true);
                  setSelectedJob(item.id);
                }}
              >
                <Button
                  style={{ marginRight: "20px" }}
                  icon={<CheckCircleOutlined />}
                  shape="circle"
                  type="text"
                />
              </Popconfirm>

              <Popconfirm
                title="Are your sure to quit this job?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  setIsVisibleModalQuit(true);
                  setSelectedJob(item.id);
                }}
              >
                <Button
                  style={{ marginRight: "20px", float: "right" }}
                  icon={<CloseCircleOutlined />}
                  shape="circle"
                  type="text"
                />
              </Popconfirm>
            </>
          );
        if (item.status === "Pending")
          return (
            <>
              <Button
                style={{ marginRight: "20px" }}
                onClick={() => {
                  setIsVisibleModal(true);
                  setSelectedJob(item.id);
                }}
                shape="circle"
                icon={<DollarOutlined />}
              />

              <Popconfirm
                title="Are your sure to cancel this job?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleCancelRequest(item.id);
                }}
              >
                <Button
                  style={{ marginRight: "20px", float: "right" }}
                  icon={<CloseCircleOutlined />}
                  shape="circle"
                  type="text"
                />
              </Popconfirm>
            </>
          );
        if (item.status === "Reject")
          return (
            <Button
              icon={<WarningOutlined />}
              type="text"
              onClick={() => {
                setIsVisibleModalReport(true);
                setSelectedJob(item.id);
              }}
            />
          );
        if (item.status === "Finish")
          return (
            <Button
              icon={<WarningOutlined />}
              type="text"
              onClick={() => {
                setIsVisibleModalReport(true);
                setSelectedJob(item.id);
              }}
            />
          );
        if (item.status === "NotComplete")
          return (
            <Button
              icon={<WarningOutlined />}
              type="text"
              onClick={() => {
                setIsVisibleModalReport(true);
                setSelectedJob(item.id);
              }}
            />
          );
        if (item.status === "Working") {
          return (
            <Popconfirm
              title="Are your sure to finish this job?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                setIsVisibleModalFinish(true);
                setSelectedJob(item.id);
              }}
            >
              <Button
                style={{ marginRight: "20px" }}
                icon={<CheckCircleOutlined />}
                shape="circle"
                type="text"
              />
            </Popconfirm>
          );
        }
        if (item.status === "Invited") {
          return (
            <>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#009900",
                  color: "white",
                }}
              >
                Approve
              </Button>
              <Button
                style={{
                  borderRadius: "10px",
                  background: "#EE0000",
                  color: "white",
                }}
              >
                Reject
              </Button>
            </>
          );
        }
      },
    },
  ];
  const columnInvited = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Project Name",
      dataIndex: "jobTitle",
      render: (e, item) => {
        return (
          <a
            onClick={() => {
              setJobPost(item.jobId);
              navigate("/submit-proposal");
            }}
          >
            {item.jobTitle}
          </a>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (e, item, index) => {
        if (item.status === "Invite")
          return (
            <Tag
              style={{ backgroundColor: "#0033CC", color: "white" }}
              icon={<SolutionOutlined />}
            >
              Invite
            </Tag>
          );
      },
    },
    {
      title: "Date",
      dataIndex: "createAt",
      render: (e, item) => {
        return <>{dateFormat(item.createAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "Invitation",
      dataIndex: "contentRequest",
    },
  ];
  const columnPending = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Project Name",
      dataIndex: "jobTitle",
      render: (e, item) => {
        return (
          <a
            onClick={() => {
              setJobPost(item.jobId);
              setShowJobDetail(true);
            }}
          >
            {item.jobTitle}
          </a>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (e, item, index) => {
        if (item.status === "Pending")
          return (
            <Tag
              style={{ backgroundColor: "#FF6600", color: "white" }}
              icon={<SyncOutlined />}
            >
              Pending
            </Tag>
          );
      },
    },
    {
      title: "Date",
      dataIndex: "createAt",
      render: (e, item) => {
        return <>{dateFormat(item.createAt, "dddd, mmmm dS, yyyy")}</>;
      },
    },
    {
      title: "ContentRequst",
      dataIndex: "contentRequest",
    },
    {
      title: "Budget Request",
      dataIndex: "budgetRequest",
    },
    {
      render: (e, item) => {
        if (item.status === "Pending")
          return (
            <>
              <Button
                style={{ marginRight: "20px" }}
                onClick={() => {
                  setIsVisibleModal(true);
                  setSelectedJob(item.id);
                }}
                shape="circle"
                icon={<DollarOutlined />}
              />

              <Popconfirm
                title="Are your sure to cancel this job?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleCancelRequest(item.id);
                }}
              >
                <Button
                  style={{ marginRight: "20px", float: "right" }}
                  icon={<CloseCircleOutlined />}
                  shape="circle"
                  type="text"
                />
              </Popconfirm>
            </>
          );
      },
    },
  ];
  const [typeReason, setTypeReason] = useState("");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setTypeReason(e.target.value);
  };
  useEffect(() => {
    loadListCovenantByStatus();
    getJobDetail();
    loadSkillJob();
  }, [status]);

  function loadListCovenantByStatus() {
    let map = new Map();
    getAuth(
      `/Covenant/Freelancer/MyCovenants?take=${take}&skip=${skip}&status=${status}`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((covenant) => {
          map.set(covenant.id, covenant);
        });
        setListCovenant([...map.values()]);
      }
    });
  }
  function onChangeNext() {
    setSkip(skip + 5);
  }
  function onChangePrevious() {
    setSkip(skip - 5);
  }
  function handleCancelRequest(selectedJob) {
    delAuth(`/Covenant?id=${selectedJob} `).then((response) => {
      if (response.data.code === 1) {
        message.success("Successfully");
        loadListCovenantByStatus();
      }
    });
  }
  function updateBudgetRequest(selectedJob) {
    putAuth(`/Covenant/BudgetRequest`, {
      covenantId: selectedJob,
      budgetRequest: budgetRequest,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Send your budget request successfully!");
        setIsVisibleModal(false);
        formRequest.resetFields();
        loadListCovenantByStatus();
      }
    });
  }
  function quitJob(selectedJob) {
    putAuth(`/Covenant/Freelance/RejectWorking`, {
      covenantId: selectedJob,
      reason: reason,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success(
          "Send your reason successfully! Please wait for your response!"
        );
        setIsVisibleModalQuit(false);
        formRequest.resetFields();
        loadListCovenantByStatus();
      }
    });
  }
  function finishWork(selectedJob) {
    putAuth(`/Covenant/Freelance/FinishWorking`, {
      covenantId: selectedJob,
      reason: reason,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Wait for your client!");
        setIsVisibleModalFinish(false);
        formRequest.resetFields();
        loadListCovenantByStatus();
      }
    });
  }
  function accessWorking(selectedJob) {
    putAuth(`/Covenant/Freelance/Working`, {
      covenantId: selectedJob,
      reason: reason,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Let's working!");
        setIsVisibleModalWorking(false);
        formRequest.resetFields();
        loadListCovenantByStatus();
      }
    });
  }
  function createReport(selectedJob) {
    postAuth(`/Report`, {
      covenantId: selectedJob,
      reason: reason,
      typeReason: typeReason,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Your report is sent to Admin!");
        setIsVisibleModalReport(false);
        formRequest.resetFields();
        loadListCovenantByStatus();
      }
      if (response.data.status === 200) {
        message.error("You've reported this job!");
        setIsVisibleModalReport(false);
        formRequest.resetFields();
        loadListCovenantByStatus();
      }
    });
  }
  let jobPost = getJobPost();
  function getJobDetail() {
    getAuth(`/Job?jobId=${jobPost}`).then((response) => {
      if (response.data.code === 1) {
        setJobDetail(response.data.data);
      }
    });
  }
  function loadSkillJob() {
    let map = new Map();
    getAuth(`/Job/Skills?jobId=${jobPost}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skill) => {
          map.set(skill.id, skill);
        });
        setListSkillJob([...map.values()]);
      }
    });
  }
  const onChangeStatus = (key) => {
    setStatus(key);
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "30px",
          color: "#037C00",
          fontWeight: "bold",
          textAlign: "left",
          marginLeft: "80px",
          marginBottom: "20px",
        }}
      >
        My Covenants
      </h1>
      <Tabs defaultActiveKey="0" type="card" onChange={onChangeStatus}>
        <TabPane tab="Approved" key="1">
          <Tabs
            type="line"
            tabPosition="left"
            onChange={onChangeStatus}
            defaultActiveKey="a"
          >
            <TabPane tab="Accepted" key="1">
              <Table
                columns={column}
                dataSource={listCovenant}
                pagination={false}
              />
              <br />
              <Button
                icon={<LeftSquareOutlined />}
                style={{ marginRight: "20px" }}
                disabled={skip === 0}
                onClick={onChangePrevious}
              />
              <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
            </TabPane>
            <TabPane tab="Working" key="3">
              <Table
                columns={column}
                dataSource={listCovenant}
                pagination={false}
              />
              <br />
              <Button
                icon={<LeftSquareOutlined />}
                style={{ marginRight: "20px" }}
                disabled={skip === 0}
                onClick={onChangePrevious}
              />
              <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
            </TabPane>
            <TabPane tab="Finished" key="4">
              <Table
                columns={column}
                dataSource={listCovenant}
                pagination={false}
              />
              <br />
              <Button
                icon={<LeftSquareOutlined />}
                style={{ marginRight: "20px" }}
                disabled={skip === 0}
                onClick={onChangePrevious}
              />
              <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
            </TabPane>
            <TabPane tab="Completed" key="5">
              <Table
                columns={column}
                dataSource={listCovenant}
                pagination={false}
              />
              <br />
              <Button
                icon={<LeftSquareOutlined />}
                style={{ marginRight: "20px" }}
                disabled={skip === 0}
                onClick={onChangePrevious}
              />
              <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
            </TabPane>
            <TabPane tab="Not Completed" key="6">
              <Table
                columns={column}
                dataSource={listCovenant}
                pagination={false}
              />
              <br />
              <Button
                icon={<LeftSquareOutlined />}
                style={{ marginRight: "20px" }}
                disabled={skip === 0}
                onClick={onChangePrevious}
              />
              <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Pending" key="0">
          <Table
            columns={columnPending}
            dataSource={listCovenant}
            pagination={false}
          />
          <br />
          <Button
            icon={<LeftSquareOutlined />}
            style={{ marginRight: "20px" }}
            disabled={skip === 0}
            onClick={onChangePrevious}
          />
          <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
        </TabPane>
        <TabPane tab="Rejected" key="2">
          <Table
            columns={column}
            dataSource={listCovenant}
            pagination={false}
          />
          <br />
          <Button
            icon={<LeftSquareOutlined />}
            style={{ marginRight: "20px" }}
            disabled={skip === 0}
            onClick={onChangePrevious}
          />
          <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
        </TabPane>
        <TabPane tab="Invited" key="7">
          <Table
            columns={columnInvited}
            dataSource={listCovenant}
            pagination={false}
          />
          <br />
          <Button
            icon={<LeftSquareOutlined />}
            style={{ marginRight: "20px" }}
            disabled={skip === 0}
            onClick={onChangePrevious}
          />
          <Button icon={<RightSquareOutlined />} onClick={onChangeNext} />
        </TabPane>
      </Tabs>
      {/* Modal Budget request */}
      <Modal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title="Send your disered amount"
        onOk={() => updateBudgetRequest(selectedJob)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Amount"
            name="budgetRequest"
            rules={[
              {
                required: true,
                message: "Please input your disered amount!",
              },
            ]}
          >
            <Input
              placeholder="Your disered amount..."
              name="budgetRequest"
              onChange={(e) => setBudgetRequest(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Quit */}
      <Modal
        visible={isVisibleModalQuit}
        onCancel={() => setIsVisibleModalQuit(false)}
        title="Why do you quit this job?"
        onOk={() => quitJob(selectedJob)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please input your reason!" }]}
          >
            <Input.TextArea
              name="reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Finish */}
      <Modal
        visible={isVisibleModalFinish}
        onCancel={() => setIsVisibleModalFinish(false)}
        title="Have you done this job?"
        onOk={() => finishWork(selectedJob)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Result:"
            name="reason"
            rules={[{ required: true, message: "Please input your reports!" }]}
          >
            <Input.TextArea
              name="reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Working */}
      <Modal
        visible={isVisibleModalWorking}
        onCancel={() => setIsVisibleModalWorking(false)}
        title="Confirm work this job"
        onOk={() => accessWorking(selectedJob)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            name="reason"
            rules={[{ required: true, message: "Please input your messages!" }]}
          >
            <Input.TextArea
              name="reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Report */}
      <Modal
        visible={isVisibleModalReport}
        onCancel={() => setIsVisibleModalReport(false)}
        title="Report this job"
        onOk={() => createReport(selectedJob)}
        style={{ width: "10px" }}
      >
        <Radio.Group onChange={onChange} value={typeReason}>
          <Space direction="vertical">
            <Radio value={0}>
              Unpaid Salary
              {typeReason === 0 ? (
                <Input.TextArea
                  name="reason"
                  style={{
                    height: 50,
                    width: "400px",
                    marginLeft: 10,
                  }}
                  onChange={(e) => setReason(e.target.value)}
                />
              ) : null}
            </Radio>

            <Radio value={2}>
              Others...
              {typeReason === 2 ? (
                <Input.TextArea
                  name="reason"
                  style={{
                    height: 50,
                    width: "400px",
                    marginLeft: 10,
                  }}
                  onChange={(e) => setReason(e.target.value)}
                />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </Modal>
      {/* Modal Job Detail */}
      <Modal
        visible={showJobDetail}
        onCancel={() => setShowJobDetail(false)}
        footer={false}
      >
        {jobDetail ? (
          <>
            {" "}
            <Card title={jobDetail.title}>
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
                  {jobDetail.typeWork === 0 ? <>Short Time</> : <>Long Time</>}
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
                <Descriptions title="Pay for Job" bordered layout="vertical">
                  <Descriptions.Item
                    label="Job budget"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    {jobDetail.jobBudget} $
                  </Descriptions.Item>
                </Descriptions>
              ) : (
                <Descriptions title="Pay for Hour" bordered layout="vertical">
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
              <Descriptions title="Requirement" bordered layout="vertical">
                <Descriptions.Item
                  label="Skill Expertise"
                  labelStyle={{ fontWeight: "bold" }}
                >
                  {listSkillJob.map((s) => (
                    <Tag
                      color="green"
                      style={{
                        height: "2rem",
                        width: "5rem",
                        fontSize: "1.25rem",
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
          </>
        ) : null}
      </Modal>
    </div>
  );
}
