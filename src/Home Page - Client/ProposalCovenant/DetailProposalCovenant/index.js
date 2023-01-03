import {
  Tabs,
  Button,
  Tag,
  Table,
  Form,
  Modal,
  Input,
  message,
  Radio,
  Space,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { getAuth, postAuth, putAuth } from "../../../Utils/httpHelper";
import dateFormat from "dateformat";
import {
  FileTextOutlined,
  SyncOutlined,
  CheckOutlined,
  StopOutlined,
  LoadingOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { getJobId } from "../../../Utils/Auth";
const { TabPane } = Tabs;
const { Option } = Select;
export default function DetailFreelancerCovenant() {
  const [job, setJob] = useState([]);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [jobId] = useState(getJobId());
  const [freelancerId, setFreelancerId] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [skillFreelancer, setSkillFreelancer] = useState([]);
  const [status, setStatus] = useState(0);
  const [listProposal, setListProposal] = useState([]);
  const [reason, setReason] = useState("");
  const [formRequest] = Form.useForm();
  const [isVisibleModalApprove, setIsVisibleModalApprove] = useState(false);
  const [isVisibleModalReject, setIsVisibleModalReject] = useState(false);
  const [isVisibleModalComplete, setIsVisibleModalComplete] = useState(false);
  const [isVisibleModalNotComplete, setIsVisibleModalNotComplete] =
    useState(false);
  const [isVisibleModalReport, setIsVisibleModalReport] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState();
  const [typeReason, setTypeReason] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [showInforFreelance, setShowInforFreelance] = useState(false);

  const column = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Freelancer Name",
      render: (e, item) => {
        return (
          <a
            onClick={() => {
              setShowInforFreelance(true);
              setFreelancerId(item.freelancerId);
            }}
          >
            {item.freelancerName}
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
      title: "Content Request",
      dataIndex: "contentRequest",
    },
    {
      render: (e, item) => {
        if (item.status === "Finish")
          return (
            <>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#009900",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalComplete(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Completed
              </Button>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#FF0000",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalNotComplete(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Not Completed
              </Button>
            </>
          );
        if (item.status === "Pending")
          return (
            <>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#009900",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalApprove(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Approved
              </Button>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#FF0000",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalReject(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Rejected
              </Button>
            </>
          );
        if (item.status === "Working")
          return (
            <>
              <Button
                icon={<WarningOutlined />}
                type="text"
                onClick={() => {
                  setIsVisibleModalReport(true);
                  setSelectedJob(item.id);
                }}
              />
            </>
          );
      },
    },
  ];

  const columnApply = [
    {
      title: "No",
      render: (e, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Freelancer Name",
      render: (e, item) => {
        return (
          <a
            onClick={() => {
              setShowInforFreelance(true);
              setFreelancerId(item.freelancerId);
            }}
          >
            {item.freelancerName}
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
      title: "Content Request",
      dataIndex: "contentRequest",
    },
    {
      title: "Budget Request",
      dataIndex: "budgetRequest",
    },
    {
      render: (e, item) => {
        if (item.status === "Finish")
          return (
            <>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#009900",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalComplete(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Completed
              </Button>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#FF0000",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalNotComplete(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Not Completed
              </Button>
            </>
          );
        if (item.status === "Pending")
          return (
            <>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#009900",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalApprove(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Approve
              </Button>
              <Button
                style={{
                  marginRight: "20px",
                  borderRadius: "10px",
                  background: "#FF0000",
                  color: "white",
                }}
                onClick={() => {
                  setIsVisibleModalReject(true);
                  setSelectedFreelancer(item.id);
                }}
              >
                Reject
              </Button>
            </>
          );
      },
    },
  ];
  function loadProposal() {
    let map = new Map();
    getAuth(
      `/Covenant/Client/MyCovenants?jobId=${jobId}&take=${take}&skip=${skip}&status=${status}`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((covenant) => {
          map.set(covenant.id, covenant);
        });
        setListProposal([...map.values()]);
      }
    });
  }
  function loadJobDetail() {
    getAuth(`/Job?jobId=${jobId}`).then((response) => {
      if (response.data.code === 1) {
        setJob(response.data.data);
      }
    });
  }
  function approveRequest() {
    putAuth(`/Covenant/Client/Approve`, {
      covenantId: selectedFreelancer,
      reason: reason,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("You have hired this freelancer!");
        setIsVisibleModalApprove(false);
        formRequest.resetFields();
        loadProposal();
      }
      if (response.data.status === 200) {
        message.error("Not enough money!");
        setIsVisibleModalApprove(false);
        formRequest.resetFields();
        loadProposal();
      }
    });
  }
  function rejectRequest() {
    putAuth(`/Covenant/Client/Reject`, {
      covenantId: selectedFreelancer,
      reason: reason,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("You have rejected this freelancer!");
        setIsVisibleModalReject(false);
        formRequest.resetFields();
        loadProposal();
      }
    });
  }
  function completeRequest() {
    putAuth(
      `/Covenant/Client/SubmitCompletedOrNotCompletedWorking?isCompleted=true`,
      {
        covenantId: selectedFreelancer,
        reason: reason,
      }
    ).then((response) => {
      if (response.data.code === 1) {
        message.success("You accept this freelancer complete this work!");
        setIsVisibleModalComplete(false);
        formRequest.resetFields();
        loadProposal();
      }
    });
  }
  function notCompleteRequest() {
    putAuth(
      `/Covenant/Client/SubmitCompletedOrNotCompletedWorking?isCompleted=false`,
      {
        covenantId: selectedFreelancer,
        reason: reason,
      }
    ).then((response) => {
      if (response.data.code === 1) {
        message.success("You accept this freelancer not complete this work!");
        setIsVisibleModalNotComplete(false);
        formRequest.resetFields();
        loadProposal();
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
        loadProposal();
      }
      if (response.data.status === 200) {
        message.error("You've reported this job!");
        setIsVisibleModalReport(false);
        formRequest.resetFields();
        loadProposal();
      }
    });
  }
  function loadFreelanceById() {
    getAuth(`/User?userId=${freelancerId}`).then((response) => {
      setFreelancer(response.data);
    });
  }
function loadSkillFreelancer(){
  let map = new Map();
  getAuth(`/User/Skill?userId=${freelancerId}`).then((response) => {
   if(response.data.code === 1){
    response.data.data.map((skill)=>{
      map.set(skill.skillId, skill)
    })
    setSkillFreelancer([...map.values()])
   }
  });
}
  useEffect(() => {
    loadJobDetail();
    loadProposal();
    loadFreelanceById();
    loadSkillFreelancer();
  }, [jobId, take, skip, status, freelancerId]);
  const onChange = (key) => {
    setStatus(key);
  };
  const onChangeReason = (e) => {
    console.log("radio checked", e.target.value);
    setTypeReason(e.target.value);
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
        {job.title}
      </h1>

      <Tabs defaultActiveKey="0" type="card" onChange={onChange}>
        <TabPane tab="Processing Request">
          <Tabs defaultActiveKey="0" tabPosition="left" onChange={onChange}>
            <TabPane tab="Apply Request" key="0">
              <Table columns={columnApply} dataSource={listProposal} />
            </TabPane>
            <TabPane tab="Finish Request" key="4">
              <Table columns={column} dataSource={listProposal} />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Project Process" key="3">
          <Tabs defaultActiveKey="3" tabPosition="left" onChange={onChange}>
            <TabPane tab="Working" key="3">
              <Table columns={column} dataSource={listProposal} />
            </TabPane>
            <TabPane tab="Completed" key="5">
              <Table columns={column} dataSource={listProposal} />
            </TabPane>
            <TabPane tab="Not Completed" key="6">
              <Table columns={column} dataSource={listProposal} />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
      {/* Modal Approve */}
      <Modal
        visible={isVisibleModalApprove}
        onCancel={() => setIsVisibleModalApprove(false)}
        title={"Approve " + job.title}
        onOk={() => approveRequest(selectedFreelancer)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Message"
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
      {/* Modal Reject */}
      <Modal
        visible={isVisibleModalReject}
        onCancel={() => setIsVisibleModalReject(false)}
        title={"Reject " + job.title}
        onOk={() => rejectRequest(selectedFreelancer)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Message"
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
      {/* Modal Complete */}
      <Modal
        visible={isVisibleModalComplete}
        onCancel={() => setIsVisibleModalComplete(false)}
        title={"Accept completed this work"}
        onOk={() => completeRequest(selectedFreelancer)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Message"
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
      {/* Modal Not Complete */}
      <Modal
        visible={isVisibleModalNotComplete}
        onCancel={() => setIsVisibleModalNotComplete(false)}
        title={"Notice not completed this work"}
        onOk={() => notCompleteRequest(selectedFreelancer)}
        style={{ width: "10px" }}
      >
        <Form form={formRequest}>
          <Form.Item
            label="Message"
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
      <Modal
        visible={isVisibleModalReport}
        onCancel={() => setIsVisibleModalReport(false)}
        title="Report this job"
        onOk={() => createReport(selectedJob)}
        style={{ width: "10px" }}
      >
        <Radio.Group onChange={onChangeReason} value={typeReason}>
          <Space direction="vertical">
            <Radio value={1}>
              Freelancer does not work!
              {typeReason === 1 ? (
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
      <Modal
        visible={showInforFreelance}
        onCancel={() => setShowInforFreelance(false)}
        footer={false}
        title="Freelancer Information Summary"
      >
        <div class="row gutters">
          <div class="col-xl-11 col-lg-11 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      <img src={freelancer.imageUrl} alt="Maxwell Admin" />
                    </div>
                    <h5 class="user-name">
                      {freelancer.firstname + " " + freelancer.lastname}
                    </h5>
                    <h6 class="user-email">{freelancer.email}</h6>
                    <Tag color='gold'>{freelancer.major}</Tag>
                    <br/>
                    {skillFreelancer.map((s)=><Tag color='geekblue'>{s.skilName}</Tag>)}
                   
                  </div>
                  <div class="about">
                    <h5>About</h5>
                  {freelancer.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
