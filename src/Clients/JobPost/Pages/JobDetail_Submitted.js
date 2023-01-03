import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Tabs,
  Form,
  Input,
  Space,
  Divider,
  List,
  Avatar,
  Button,
  Radio,
  Select,
  Modal,
  message,
} from "antd";
import TopNavigation from "../../../Home Page - Client/Top Navigation";
import Swal from "sweetalert2";
import {
  getAuth,
  post,
  postInviteToFreelance,
} from "../../../Utils/httpHelper";
import { getJobId, SetStatus } from "../../../Utils/Auth";
import { Chip } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PaidIcon from "@mui/icons-material/Paid";
import AnimationIcon from "@mui/icons-material/Animation";
import BiotechIcon from "@mui/icons-material/Biotech";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { HeartOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const { Option } = Select;

const JobDetail_Submitted = () => {
  const [formClose] = Form.useForm();
  const [jobId] = React.useState(getJobId());
  const [listJobs, setListJobs] = React.useState([]);
  const [listSkills, setListSkills] = React.useState([]);

  const [listCategories, setListCategories] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [listSkillOfCate, setListSkillOfCate] = React.useState([]);
  const [skillId, setSkillId] = React.useState("");
  const [hidden, setHidden] = React.useState("true");
  const [valueSkillRadio, setValueSkillRadio] = React.useState("");
  const [showFormInvite, setShowFormInvite] = React.useState(false);
  const [listFreelancer, setListFreelancer] = React.useState([]);
  const [reason, setReason] = React.useState("");
  const [userId, setUserId] = React.useState("");
  useEffect(() => {
    getDataOfJob(jobId);
    getSkillByJobId(jobId);
    getCategoryJob();
    getSkillByCategory(categoryId);
    getFreelanceBySkill();
  }, [categoryId]);

  const getDataOfJob = (jobId) => {
    getAuth(`/Job?jobId=${jobId}`).then((response) => {
      if (response.data.code === 1) {
        console.log("Get Data Job successfully.");
        setListJobs(response.data.data);
      }
    });
  };

  const getSkillByJobId = (jobId) => {
    let map = new Map();
    getAuth(`/Job/Skills?jobId=${jobId}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skill) => {
          map.set(skill.skillId, skill);
        });
        setListSkills([...map.values()]);
      }
    });
  };

  const getCategoryJob = () => {
    let map = new Map();
    getAuth(`/Category?CategoryId=2`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((category) => {
          map.set(category.id, category);
        });
        setListCategories([...map.values()]);
      }
    });
  };

  const getSkillByCategory = (categoryId) => {
    let categoryId_int = parseInt(categoryId);
    let map = new Map();
    getAuth(`/Skill?CategoryId=${categoryId_int}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skill) => {
          map.set(skill.skillId, skill);
        });
        setListSkillOfCate([...map.values()]);
      }
    });
  };

  async function onChangeCategory(e) {
    await setCategoryId(e);
  }

  const onChangeSkill = (value) => {
    setSkillId(value);
  };

  const getFreelanceBySkill = () => {
    let map = new Map();
    getAuth(`/User/Freelance/skill?skillId=-1&skip=0&take=111`).then(
      (response) => {
        if (response.data.code === 1) {
          response.data.data.map((freelance) => {
            map.set(freelance.id, freelance);
          });
          setListFreelancer([...map.values()]);
        }
      }
    );
  };

  const InviteUserToJob = () => {
    postInviteToFreelance(`/Covenant/Client/InviteFreelance`, {
      jobId: jobId,
      invitedId: userId,
      reason: reason,
    }).then((response) => {
      if (response.data.code === 1) {
        Swal.fire({
          icon: "success",
          title: "Your Invitation has been sent",
          showConfirmButton: false,
          timer: 3000,
        });
        setShowFormInvite(false)
      }
      if (response.data.status === 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have invited this freelancer!",
          timer: 3000,
        });
        setShowFormInvite(false)
      }
    });
  };

  const handleShowModalInvite = () => {
    setShowFormInvite(!showFormInvite);
  };

  const handleSaveInvite = () => {
    InviteUserToJob();
  };
  return (
    <>
      <div className="Job-Submitted">
        <Header style={{ background: "#094654", width: "100%" }}>
          <TopNavigation />
        </Header>
        <Content>
          <div className="Job-options-form">
            <h2
              style={{
                textAlign: "left",
                marginLeft: "50px",
                marginTop: "30px",
              }}
            >
              {listJobs.title}
            </h2>
            <div className="JobCategory"></div>
            <div className="Job-tabs-options">
              <Tabs
                defaultActiveKey="1"
                centered
                onChange={(e) => console.log(e.target.value)}
                type="card"
                tabBarGutter={20}
                size="large"
                tabBarStyle={{
                  color: "green",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                style={{
                  width: "1020px",
                  height: "800px",
                  marginLeft: "20%",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              >
                <TabPane tab="View Job Post" key="1">
                  <Form
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                  >
                    <Form.Item
                      label="Description"
                      style={{ marginTop: "25px", marginLeft: "40px" }}
                    >
                      <TextArea
                        disabled
                        rows={4}
                        value={listJobs.description}
                      />
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                      <Space split={<Divider type="vertical" />} size={"large"}>
                        <IconText
                          icon={AccessTimeFilledIcon}
                          text={
                            listJobs.typeWork === 0 ? "ShortTime" : "LongTime"
                          }
                        />
                        <IconText
                          icon={ExpandCircleDownIcon}
                          text={
                            listJobs.levelWorker === 0
                              ? "Entry Level"
                              : listJobs.levelWorker === 1
                              ? "Intermediate Level"
                              : "Expert Level"
                          }
                        />
                        <IconText
                          icon={BiotechIcon}
                          text={
                            listJobs.scope === 0
                              ? "Medium Scope"
                              : "Small Scope"
                          }
                        />

                        <div style={{ display: "block", width: "150px" }}>
                          {" "}
                          <IconText
                            icon={PaidIcon}
                            text={
                              listJobs.typeBudget === 0
                                ? "$ " + listJobs.jobBudget + " /Job"
                                : "$ " +
                                  listJobs.minBudget +
                                  " - $ " +
                                  listJobs.maxBudget +
                                  " /hr"
                            }
                          />
                        </div>

                        <IconText
                          icon={AnimationIcon}
                          text={
                            listJobs.status === 0 ? "Processing" : "InProgress"
                          }
                        />

                        <IconText
                          icon={TimelapseIcon}
                          text={
                            listJobs.estimatedStartTime +
                            " - " +
                            listJobs.estimatedTimeToEnd
                          }
                        />
                      </Space>
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Skill And Expertise">
                      <Space>
                        <Chip label={listJobs.categoryName} />
                        {listSkills.map((skill) => (
                          <Chip key={skill.skillId} label={skill.skilName} />
                        ))}
                      </Space>
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Activity on this Job">
                      <Chip
                        style={{ backgroundColor: "#3C8224", color: "#ffff" }}
                        label="InProgress"
                      />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="URL Link Document">
                      <Input value={listJobs.fileUrl} disabled />
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="Invite Freelancers" key="2">
                  <Form>
                    <Form.Item>
                      <Select
                        placeholder="Select Category Job"
                        style={{ width: 200 }}
                        onChange={onChangeCategory}
                      >
                        {listCategories.map((category) => (
                          <Option key={category.id} value={category.id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                      <Select
                        placeholder="Select Skill Job"
                        style={{ width: 200 }}
                        onChange={onChangeSkill}
                      >
                        {listSkillOfCate.map((skill) => (
                          <Option value={skill.skillId}>
                            {skill.skilName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <List
                        style={{ textAlign: "left" }}
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                          onChange: (page) => {
                            console.log(page);
                          },
                          pageSize: 3,
                          responsive: true,
                        }}
                        dataSource={listFreelancer}
                        renderItem={(item) => (
                          <List.Item
                            key={item.id}
                            actions={[
                              <Space>
                                {/*<Chip label={item.id}/>*/}
                                {setUserId(item.id)}
                                <Chip label="iOs" />
                                <Chip label="Front-end Development" />
                                <Chip label="HTML5" />
                                <Chip label="CSS3" />
                                <Chip label="JavaScript" />
                              </Space>,
                            ]}
                            extra={
                              <Button
                                onClick={handleShowModalInvite}
                                style={{
                                  borderRadius: "12px",
                                  backgroundColor: "#3C8224",
                                  color: "#ffff",
                                  fontSize: "15px",
                                }}
                              >
                                Invite To Job
                              </Button>
                            }
                          >
                            <List.Item.Meta
                              avatar={<Avatar src={item.imageUrl} />}
                              title={
                                <Link
                                  to="/client/applicants/job-details-preview"
                                  style={{
                                    fontSize: "16px",
                                    textDecoration: "none",
                                  }}
                                >
                                  {item.firstname + item.lastname}
                                </Link>
                              }
                            />
                          </List.Item>
                        )}
                      />
                      <Modal
                        title="Invitation Reason"
                        visible={showFormInvite}
                        onCancel={() => setShowFormInvite(false)}
                        cancelButtonProps={{ shape: "round" }}
                        okButtonProps={{ shape: "round" }}
                        onOk={handleSaveInvite}
                        okText="Save"
                      >
                        <Form form={formClose} autoComplete="off">
                          <Form.Item label="Your reason">
                            <TextArea
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              rows={4}
                            />
                          </Form.Item>
                        </Form>
                      </Modal>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane
                  tab={<a href="/client/job/covenant">View Proposals</a>}
                  key="3"
                ></TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
      </div>
    </>
  );
};

export default JobDetail_Submitted;
