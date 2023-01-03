import React, { useEffect, useState } from "react";
import "../Content Detail/style.css";
import "antd/dist/antd.css";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  MessageOutlined,
  CheckOutlined,
  WarningOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Input,
  Tabs,
  Divider,
  Drawer,
  List,
  Tag,
  Button,
  Descriptions,
  Table,
  Form,
  Card,
} from "antd";

import { getJobPost, setJobPost } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";
import { get, getAuth, getJobCate } from "../../Utils/httpHelper";

const { Search } = Input;
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

export default function () {
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState([]);
  const [listJobPost, setListJobPost] = useState([]);
  const [listJob, setListJob] = useState([]);
  const [take, setTake] = useState(3);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [selectJob, setSelectJob] = useState();
  const navigate = useNavigate();
  const [listCovenant, setListCovenant] = useState([]);
  const [listSkillUser, setListSkillUser] = useState([]);
  const [listJobPostByCate, setListJobPostByCate] = useState([]);
  const [cate, setCate] = useState(3);
  const [jobId, setJobId] = useState();
  const [listSkillJob, setListSkillJob] = useState([]);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    getUser();
    getListJobPost();
    getJobPost();
    loadListCovenant();
    getSkillByUser();
    getListJobByCate();
    getListJobPostByCate();
    loadSkillJob();
  }, [take, skip, search, cate, jobId]);

  const submitProposal = (e) => {
    navigate("/submit-proposal");
  };
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
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (e, item, index) => {
        if (item.status === "Approve")
          return (
            <Tag
              style={{ backgroundColor: "#009933", color: "white" }}
              icon={<CheckOutlined />}
            >
              Approve
            </Tag>
          );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createAt",
    },

    {
      render: (e, item) => {
        if (item.status === "Approve")
          return (
            <>
              <Button style={{ marginRight: "20px" }}>Complete</Button>
              <Button style={{ marginRight: "20px" }}>Quit</Button>
              <Button
                style={{ marginRight: "20px" }}
                icon={<MessageOutlined />}
                shape="circle"
              />
              <Button icon={<WarningOutlined />} type="text" />
            </>
          );
      },
    },
  ];

  function getUser() {
    getAuth(`/AccountProfile`).then((response) => {
      if (response.data.code === 1) {
        setProfile(response.data.data);
      }
    });
  }
  function getSkillByUser() {
    let map = new Map();
    getAuth(`/AccountProfile/Skills`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skillUser) => {
          map.set(skillUser.skillId, skillUser);
        });
        setListSkillUser([...map.values()]);
      }
    });
  }
  function getListJobByCate() {
    let map = new Map();
    getJobCate(`/Category?CategoryId=2`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((job) => {
          map.set(job.id, job);
        });
        setListJob([...map.values()]);
      }
    });
  }
  function loadJobId() {
    setJobId(listJob.map((j) => <>{j.id}</>));
  }
  function getListJobPostByCate() {
    let map = new Map();
    get(
      `/Job/GetListJob?take=${take}&skip=${skip}&searchValue=${search}&categoryId=${cate}`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((post) => {
          map.set(post.id, post);
        });
        setListJobPostByCate([...map.values()]);
      }
    });
  }
  function getListJobPost() {
    let map = new Map();
    getAuth(
      `/Job/GetListJob?take=${take}&skip=${skip}&searchValue=${search}&status=1`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((post) => {
          map.set(post.id, post);
        });
        setListJobPost([...map.values()]);
      }
    });
  }
  function onChangeNext() {
    setSkip(skip + 3);
  }
  function onChangePrevious() {
    setSkip(skip - 3);
  }
  function searchJob() {
    console.log(search);
  }
  function loadListCovenant() {
    let map = new Map();
    getAuth(
      `/Covenant/Freelancer/MyCovenants?take=${take}&skip=${skip}&status=1`
    ).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((covenant) => {
          map.set(covenant.id, covenant);
        });
        setListCovenant([...map.values()]);
      }
    });
  }
  function loadSkillJob() {
    let map = new Map();
    getAuth(`/Job/Skills?jobId=${jobId}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((skill) => {
          map.set(skill.skillId, skill);
        });
        setListSkillJob([...map.values()]);
      }
    });
  }
  return (
    <div style={{ background: "#EEEEEE" }}>
      {console.log("list", jobId)}
      <div className="detail">
        <div class="container">
          <Form>
            <div>
              <div
                class="card"
                style={{ borderRadius: "10px", marginTop: "5px" }}
              >
                <div
                  class="card-body"
                  style={{
                    backgroundImage: `url('https://www.employmenthelp.org/wp-content/uploads/Workshops-Header-Background.png')`,
                    borderRadius: "10px",
                    backgroundSize: "100%",
                  }}
                >
                  <div
                    class="account-settings"
                    style={{
                      background: "rgba(273,273,273,0.2)",
                      borderRadius: "10px",
                    }}
                  >
                    <div class="user-profile">
                      <div class="user-avatar">
                        <img src={profile.imageUrl} alt="..." />
                      </div>
                      <h5 class="user-name">
                        <a
                          href="/profile-freelancer"
                          style={{ fontSize: "20px" }}
                        >
                          <h1
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {profile.firstname + " " + profile.lastname}
                          </h1>
                        </a>
                        <div>
                          <WalletOutlined />: {profile.wallet} $
                        </div>
                        <Tag color="gold">{profile.major}</Tag>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">
                <div class="row">
                  <Search
                    placeholder="Search for job..."
                    enterButton
                    size="large"
                    onSearch={searchJob}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  />
                </div>
              </div>
              <div style={{ background: "white", borderRadius: "10px" }}>
                <Tabs
                  onChange={onChange}
                  tabBarStyle={{ marginLeft: "40px", marginRight: "40px" }}
                >
                  <TabPane tab="All Jobs" key="1">
                    <div className="site-card-border-less-wrapper">
                      {listJobPost.map((post) => (
                        <Card
                          onClick={() => {
                            showDrawer();
                            setSelectJob(post);
                            setJobPost(post.id);
                            setJobId(post.id);
                          }}
                          className="demo"
                          headStyle={{ color: "#236702" }}
                          type="inner"
                          title={
                            <p
                              style={{
                                fontSize: "20px",
                                color: "#236702",
                                fontWeight: "bold",
                              }}
                            >
                              {post.title}
                            </p>
                          }
                          key={post.id}
                          hoverable={true}
                          style={{
                            marginTop: "16px",
                            textAlign: "left",
                            marginLeft: "20px",
                            marginRight: "20px",
                            background: "rgba(1,111,12,0.05)",
                          }}
                          extra={
                            <a
                              onClick={() => {
                                showDrawer();
                                setSelectJob(post);
                                setJobPost(post.id);
                              }}
                            >
                              <div
                                style={{ color: "#00AA00", fontSize: "13px" }}
                              >
                                See more
                              </div>
                            </a>
                          }
                          ho
                        >
                          <span style={{ fontsize: "10px" }}>
                            {post.typeBudget === 0 ? (
                              <>Pay for Job</>
                            ) : (
                              <>Pay for Hour</>
                            )}
                            {post.level === 0 ? (
                              <> - Entry Level</>
                            ) : post.level === 1 ? (
                              <> - Intermediate Level</>
                            ) : post.level === 2 ? (
                              <> - Expert Level</>
                            ) : null}
                            {post.typeWork === 0 ? (
                              <> - Short Time</>
                            ) : (
                              <> - Long Time</>
                            )}
                          </span>
                          <br />
                          <span>
                            {post.typeBudget === 0 ? (
                              <p>
                                Budget:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {post.jobBudget} $
                                </span>
                              </p>
                            ) : (
                              <p>
                                Budget:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {post.minBudget} $ ~ {post.maxBudget} $
                                </span>
                              </p>
                            )}
                          </span>
                          <Divider />
                          <span>
                            <p style={{ fontSize: "15px" }}>
                              {post.description}
                            </p>
                            <p>
                              Number of Proposal:{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {post.maxMember}
                              </span>
                            </p>
                          </span>
                        </Card>
                      ))}
                      <br />
                      <Button
                        icon={<LeftSquareOutlined />}
                        style={{ marginRight: "20px" }}
                        disabled={skip === 0}
                        onClick={onChangePrevious}
                      />
                      <Button
                        icon={<RightSquareOutlined />}
                        onClick={onChangeNext}
                      />
                      <br />
                      <br />
                      <Drawer
                        width={640}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                      >
                        {selectJob ? (
                          <>
                            <p
                              style={{
                                marginBottom: 24,
                                size: "20px",
                                fontWeight: "bold",
                                fontSize: "30px",
                                color: "#236702",
                                textAlign:'center'
                              }}
                            >
                              {selectJob.title}
                            </p>
                            <Descriptions
                              title="Job information"
                              bordered
                              layout="vertical"
                            >
                              <Descriptions.Item
                                label="Job Description"
                                span={3}
                                labelStyle={{ fontWeight: "bold" }}
                              >
                                {selectJob.description}
                              </Descriptions.Item>
                              <Descriptions.Item
                                label="Job Type"
                                labelStyle={{ fontWeight: "bold" }}
                              >
                                {selectJob.typeWork === 0 ? (
                                  <>Short Time</>
                                ) : (
                                  <>Long Time</>
                                )}
                              </Descriptions.Item>
                              <Descriptions.Item
                                label="Job level"
                                labelStyle={{ fontWeight: "bold" }}
                              >
                                {selectJob.level === 0 ? (
                                  <>Entry</>
                                ) : selectJob.level === 1 ? (
                                  <>Intermediate</>
                                ) : selectJob.level === 2 ? (
                                  <>Expert</>
                                ) : null}
                              </Descriptions.Item>
                              <Descriptions.Item
                                label="Scope"
                                labelStyle={{ fontWeight: "bold" }}
                              >
                                {selectJob.scope === 0 ? (
                                  <>Medium</>
                                ) : (
                                  <>Small</>
                                )}
                              </Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            {selectJob.typeBudget === 0 ? (
                              <Descriptions
                                title="Pay for Job"
                                bordered
                                layout="vertical"
                              >
                                <Descriptions.Item
                                  label="Job budget"
                                  labelStyle={{ fontWeight: "bold" }}
                                >
                                  {selectJob.jobBudget} $
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
                                  {selectJob.minBudget} $
                                </Descriptions.Item>
                                <Descriptions.Item
                                  label="Max budget"
                                  labelStyle={{ fontWeight: "bold" }}
                                >
                                  {selectJob.maxBudget} $
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
                                label="Quantity"
                                labelStyle={{ fontWeight: "bold" }}
                              >
                                {selectJob.maxMember}
                              </Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            <Button
                              style={{
                                background: "#037C00",
                                marginRight: "5px",
                                borderRadius: "10px",
                              }}
                              onClick={submitProposal}
                            >
                              <p style={{ color: "white", fontWeight: "bold" }}>
                                Submit a proposal
                              </p>
                            </Button>
                            <Button
                              style={{ borderRadius: "10px" }}
                              onClick={onClose}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : null}
                      </Drawer>
                    </div>
                  </TabPane>

                  <TabPane tab="Filters by Category" key="2">
                    <div style={{ fontSize: "20px" }}>
                      <Tabs
                        tabPosition="left"
                        onChange={(e) => {
                          setCate(e);
                        }}
                        defaultActiveKey="3"
                      >
                        {listJob.map((job) => (
                          <TabPane tab={job.name} key={job.id}>
                            {listJobPostByCate.map((post) => (
                              <Card
                                className="demo"
                                type="inner"
                                onClick={() => {
                                  showDrawer();
                                  setSelectJob(post);
                                  setJobPost(post.id);
                                  setJobId(post.id);
                                }}
                                title={
                                  <p
                                    style={{
                                      fontSize: "20px",
                                      color: "#236702",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {post.title}
                                  </p>
                                }
                                key={post.id}
                                hoverable={true}
                                style={{
                                  marginTop: "16px",
                                  textAlign: "left",
                                  marginLeft: "20px",
                                  marginRight: "20px",
                                  background: "rgba(1,111,12,0.05)",
                                }}
                                extra={
                                  <a
                                    onClick={() => {
                                      showDrawer();
                                      setSelectJob(post);
                                      setJobPost(post.id);
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#00AA00",
                                        fontSize: "13px",
                                      }}
                                    >
                                      See more
                                    </div>
                                  </a>
                                }
                                ho
                              >
                                <span style={{ fontsize: "10px" }}>
                                  {post.typeBudget === 0 ? (
                                    <>Pay for Job</>
                                  ) : (
                                    <>Pay for Hour</>
                                  )}
                                  {post.level === 0 ? (
                                    <> - Entry Level</>
                                  ) : post.level === 1 ? (
                                    <> - Intermediate Level</>
                                  ) : post.level === 2 ? (
                                    <> - Expert Level</>
                                  ) : null}
                                  {post.typeWork === 0 ? (
                                    <> - Short Time</>
                                  ) : (
                                    <> - Long Time</>
                                  )}
                                </span>
                                <br />
                                <span>
                                  {post.typeBudget === 0 ? (
                                    <p>
                                      Budget:{" "}
                                      <span style={{ fontWeight: "bold" }}>
                                        {post.jobBudget} $
                                      </span>
                                    </p>
                                  ) : (
                                    <p>
                                      Budget:{" "}
                                      <span style={{ fontWeight: "bold" }}>
                                        {post.minBudget} $ ~ {post.maxBudget} $
                                      </span>
                                    </p>
                                  )}
                                </span>
                                <Divider />
                                <span>
                                  <p style={{ fontSize: "15px" }}>
                                    {post.description}
                                  </p>
                                  <p>
                                    Number of Proposal:{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                      {post.maxMember}
                                    </span>
                                  </p>
                                </span>
                              </Card>
                            ))}
                            <br />
                          </TabPane>
                        ))}
                      </Tabs>
                      <Button
                        icon={<LeftSquareOutlined />}
                        style={{ marginRight: "20px" }}
                        disabled={skip === 0}
                        onClick={onChangePrevious}
                      />
                      <Button
                        icon={<RightSquareOutlined />}
                        onClick={onChangeNext}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
