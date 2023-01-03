import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../JobCategoryPage/style-main.css";
import "../Utils/Styleguide.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  Button,
  List,
  Modal,
  Descriptions,
  Divider,
  Row,
  Col,
  Card,
  Avatar,
} from "antd";
import { get, getAuth, getJobCate } from "../Utils/httpHelper";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const { Meta } = Card;
export default function HomePage() {
  const navigate = useNavigate();
  const [listJob, setListJob] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [listJobPost, setListJobPost] = useState([]);
  const [listJobPostByCate, setListJobPostByCate] = useState([]);
  const [listFreelancer, setListFreelancer] = useState([]);
  const [take, setTake] = useState(3);
  const [skip, setSkip] = useState(0);
  const [next, setNext] = useState(6);
  const [pre, setPre] = useState(0);
  const [search, setSearch] = useState("");
  const [job, setJob] = useState();
  const [cate, setCate] = useState("");

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
  function getListJobPost() {
    let map = new Map();
    get(`/Job/GetListJob?take=${take}&skip=${skip}&searchValue=${search}`).then(
      (response) => {
        if (response.data.code === 1) {
          response.data.data.map((post) => {
            map.set(post.id, post);
          });
          setListJobPost([...map.values()]);
        }
      }
    );
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
  function getListFreelancer() {
    let map = new Map();
    get(`/User/Freelance?take=${next}&skip=${pre}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((freelancer) => {
          map.set(freelancer.id, freelancer);
        });
        setListFreelancer([...map.values()]);
      }
    });
  }
  function onChangeNext() {
    setSkip(skip + 3);
  }
  function onChangePrevious() {
    setSkip(skip - 3);
  }
  function onChangeNextFreelancer() {
    setPre(pre + 6);
  }
  function onChangePreviousFreelancer() {
    setPre(pre - 6);
  }
  function showModal() {
    setVisibleModal(true);
  }
  useEffect(() => {
    getListJobByCate();
    getListJobPost();
    getListJobPostByCate(cate);
    getListFreelancer();
  }, [take, skip, cate]);
  return (
    <div className="job-category-page screen">
      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-lg-4">
          <h2>
            <a href="#" className="findwork">
              Findwork
            </a>
          </h2>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-1">
          <button
            type="button"
            className="login btn btn-white"
            onClick={(e) => navigate("/login")}
            style={{
              paddingTop: "10px",
              minHeight: "35px",
              width: "160px",
              fontSize: "20px",
            }}
          >
            Log in
          </button>
        </div>
        <div className="col-lg-1">
          <button
            type="button"
            className="signUp btn btn-success"
            onClick={(e) => navigate("/signup")}
            style={{
              alignItems: "center",
              minHeight: "35px",
              width: "160px",
              fontSize: "20px",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
      <div style={{ border: "solid 1px black" }}></div>

      <body>
        <div
          style={{
            marginLeft: "300px",
            marginRight: "300px",
            marginTop: "20px",
          }}
        >
          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane tab="Job" key="1">
              <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                onChange={(e) => {
                  setCate(e);
                }}
              >
                <TabPane tab="All Job">
                  {listJobPost.map((post) => (
                    <>
                      <Card
                        className="demo"
                        headStyle={{ color: "#236702", fontSize: "30px" }}
                        type="inner"
                        title={post.title}
                        key={post.id}
                        hoverable={true}
                        style={{
                          marginTop: "16px",
                          background: "rgba(1,111,12,0.05)",
                        }}
                        onClick={() => {
                          showModal();
                          setJob(post);
                        }}
                        extra={
                          <a
                            onClick={() => {
                              showModal();
                              setJob(post);
                            }}
                          >
                            <div style={{ color: "#00AA00", fontSize: "10px" }}>
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
                        </span>

                        <span>
                          <p style={{ fontSize: "15px" }}>{post.description}</p>
                          <p style={{ fontSize: "15px" }}>
                            Poposal: {post.maxMember}
                          </p>
                        </span>
                      </Card>
                    </>
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
                </TabPane>
                {listJob.map((job) => (
                  <TabPane tab={job.name} key={job.id}>
                    {listJobPostByCate.map((post) => (
                      <Card
                        className="demo"
                        headStyle={{ color: "#236702", fontSize: "30px" }}
                        type="inner"
                        title={post.title}
                        key={post.id}
                        hoverable={true}
                        onClick={() => {
                          showModal();
                          setJob(post);
                        }}
                        style={{
                          marginTop: "16px",
                          background: "rgba(1,111,12,0.05)",
                        }}
                        extra={
                          <a
                            onClick={() => {
                              showModal();
                              setJob(post);
                            }}
                          >
                            <div style={{ color: "#00AA00", fontSize: "10px" }}>
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
                        </span>

                        <span>
                          <p style={{ fontSize: "15px" }}>{post.description}</p>
                          <p style={{ fontSize: "15px" }}>
                            Poposal: {post.maxMember}
                          </p>
                        </span>
                      </Card>
                    ))}
                    <br />
                    <div>
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
                ))}
              </Tabs>
            </TabPane>
            <TabPane tab="Freelancer" key="2">
              <div style={{ padding: "30px", background: "#ececec" }}>
                <Row gutter={16}>
                  {listFreelancer.map((freelancer) => (
                    <Col span={8} style={{ marginTop: "10px" }}>
                      <Card className="demo" bordered={false} hoverable={true}>
                        <Meta
                          avatar={<Avatar src={freelancer.imageUrl} />}
                          title={
                            freelancer.firstname + " " + freelancer.lastname
                          }
                          description={freelancer.email}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Button
                  icon={<LeftSquareOutlined />}
                  style={{ marginRight: "20px", marginTop: "20px" }}
                  disabled={pre === 0}
                  onClick={onChangePreviousFreelancer}
                />
                <Button
                  icon={<RightSquareOutlined />}
                  onClick={onChangeNextFreelancer}
                />
              </div>
              <span style={{ float: "right" }}>
                <a href="/login">Login to hire the talents! </a>
                or
                <a href="/signup"> Sign up new account for more!</a>
              </span>
            </TabPane>
          </Tabs>
        </div>
      </body>

      <Modal
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={false}
        style={{ top: 20 }}
      >
        {job ? (
          <>
            <p
              style={{
                marginBottom: 24,
                size: "20px",
                fontWeight: "bold",
                fontSize: "25px",
                color: "#236702",
              }}
            >
              {job.title}
            </p>
            <Descriptions title="Job information" bordered layout="vertical">
              <Descriptions.Item
                label="Job Description"
                span={3}
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.description}
              </Descriptions.Item>
              <Descriptions.Item
                label="Job Type"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.typeWork === 0 ? <>Short Time</> : <>Long Time</>}
              </Descriptions.Item>
              <Descriptions.Item
                label="Job level"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.level === 0 ? (
                  <>Entry</>
                ) : job.level === 1 ? (
                  <>Intermediate</>
                ) : job.level === 2 ? (
                  <>Expert</>
                ) : null}
              </Descriptions.Item>
              <Descriptions.Item
                label="Scope"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.scope === 0 ? <>Medium</> : <>Small</>}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
              title={
                job.typeBudget === 0 ? (
                  <>Bid Price: Pay for Job</>
                ) : (
                  <>Bid Price: Pay for Hour</>
                )
              }
              bordered
              layout="vertical"
            >
              <Descriptions.Item
                label="Job budget"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.jobBudget}
              </Descriptions.Item>
              <Descriptions.Item
                label="Min budget"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.minBudget}
              </Descriptions.Item>
              <Descriptions.Item
                label="Max budget"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.maxBudget}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Requirement" bordered layout="vertical">
              <Descriptions.Item
                label="Skill Expertise"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.skillExpertise}
              </Descriptions.Item>
              <Descriptions.Item
                label="Quantity"
                labelStyle={{ fontWeight: "bold" }}
              >
                {job.maxMember}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <span style={{ float: "right" }}>
              <a href="/login">Login to apply this job! </a>
              or
              <a href="/signup"> Sign up new account for more!</a>
            </span>
          </>
        ) : null}
      </Modal>
    </div>
  );
}
