import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  Select,
  Tag,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, putAuth } from "../../../Utils/httpHelper";
import "./style.css";

const { Option } = Select;
export default function ProfileFreelancer() {
  const [isDisable, setIsDisable] = useState(true);
  const [isHiddenEdit, setIsHiddenEdit] = useState(false);
  const [isHiddenSubmit, setIsHiddenSubmit] = useState(true);
  const [profile, setProfile] = useState([]);

  const [formProfile] = Form.useForm();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [major, setMajor] = useState();
  const [skill, setSkill] = useState([]);
  const [description, setDescription] = useState();
  const [languages, setLanguages] = useState();
  const [hoursPerWeek, setHoursPerWeek] = useState();
  const [costPerWeek, setCostPerWeek] = useState();
  const [listJobCate, setListJobCate] = useState([]);
  const [listJob, setListJob] = useState([]);
  const [listSkill, setListSkill] = useState([]);
  const [listSkillUser, setListSkillUser] = useState([]);
  const [cate, setCate] = useState();
  const [job, setJob] = useState();
  const [isDisableMajor, setIsDisableMajor] = useState(true);
  const [isDisableSkill, setIsDisableSkill] = useState(true);
  const navigate = useNavigate();
  const handleEditProfile = () => {
    setIsDisable(false);
    setIsHiddenEdit(true);
    setIsHiddenSubmit(false);
  };
  const handleCancel = () => {
    navigate('/freelancer')
  };

  useEffect(() => {
    getUser();
    getSkillByUser();
    getListJobCate();
    getListJobByCate(cate);
    getListSkillByJob(job);
    getJobName(job);
  }, [cate, job]);

  useEffect(() => {
    formProfile.setFieldsValue({
      firstname: profile.firstname,
      lastname: profile.lastname,
      phoneNumber: profile.phoneNumber,
      imageUrl: profile.imageUrl,
      major: profile.major,
      email: profile.email,
      skill: profile.skill,
      description: profile.description,
      languages: profile.languages,
      hoursPerWeek: profile.hoursPerWeek,
      costPerWeek: profile.costPerWeek,
    });
  }, [profile]);

  function getUser() {
    let map = new Map();
    getAuth(`/AccountProfile`).then((response) => {
      if (response.data.code === 1) {
        setProfile(response.data.data);
      }
    });
  }

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

  async function loadCate(e) {
    await setCate(e);
    setIsDisableMajor(false);
  }

  async function loadJob(e) {
    await setJob(e);
    setIsDisableSkill(false);
  }
  function loadSkill(e) {
    setSkill(e);
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
  function getJobName(job) {
    getAuth(`/Category/${job}`).then((response) => {
      setMajor(response.data);
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
    console.log(listSkillUser)
  }
  function handleUpdate(values) {
    putAuth(`/AccountProfile`, {
      imageUrl:
        "https://w7.pngwing.com/pngs/349/288/png-transparent-teacher-education-student-course-school-avatar-child-face-heroes.png",
      firstname: values.firstname,
      lastname: values.lastname,
      phoneNumber: values.phoneNumber,
      major: major,
      skill: skill,
      description: values.description,
      hourPerWeek: values.hoursPerWeek,
      costPerHour: values.costPerWeek,
    }).then((response) => {
      if (response.data.code === 1) {
        message.success("Update successfully!");
        getUser();
      }
    });
  }
  return (
    <body>
      {profile ? (
        <div class="container">
          <Form form={formProfile} key={profile.id} onFinish={handleUpdate}>
            <div class="row gutters">
              <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="account-settings">
                      <div class="user-profile">
                        <div class="user-avatar">
                          <img src={profile.imageUrl} alt="Maxwell Admin" />
                        </div>
                        <h5 class="user-name">
                          {profile.firstname + " " + profile.lastname}
                        </h5>
                        <h6 class="user-email">{profile.email}</h6>
                      </div>
                      <div class="about">
                        <h5>About</h5>
                        <Form.Item name="description">
                          <Input.TextArea onChange={(e)=>setDescription(e.target.value)}/>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mb-2 text-primary">Personal Details</h6>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item
                            name="firstname"
                            rules={[
                              {
                                required: true,
                                message: "This field is required!",
                              },
                            ]}
                            label="Firstname"
                          >
                            <Input
                              name="firstname"
                              onChange={(e) => setFirstname(e.target.value)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item
                            name="lastname"
                            rules={[
                              {
                                required: true,
                                message: "This field is required!",
                              },
                            ]}
                            label="Lastname"
                          >
                            <Input
                              name="firstname"
                              onChange={(e) => setLastname(e.target.value)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "This field is required!",
                              },
                            ]}
                            label="Phone number"
                          >
                            <Input
                              name="phoneNumber"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "This field is required!",
                              },
                            ]}
                            label="Email"
                          >
                            <Input
                              disabled={true}
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    {/* <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mt-3 mb-2 text-primary">Job Information</h6>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item label="Type">
                            <Select
                              defaultValue="IT"
                              style={{
                                float: "left",
                                width: "200px",
                                marginRight: "20px",
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
                          </Form.Item>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item label="Work time" name="hoursPerWeek">
                            <Input
                              name="hoursPerWeek"
                              onChange={(e) => setHoursPerWeek(e.target.value)}
                              addonAfter="hr/week"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item label="Major">
                            <Select
                              defaultValue={profile.major}
                              style={{ float: "left", width: "200px" }}
                              placeholder="Select main job"
                              onChange={loadJob}
                              disabled={isDisableMajor}
                            >
                              {listJob.map((job) => (
                                <Option key={job.id} value={job.id}>
                                  {job.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <Form.Item label="Main Skill">
                            <Select
                              mode="multiple"
                              defaultValue={listSkillUser.map((skillUser) => (
                                <Option key={skillUser.skilName}/>
                              ))}
                              style={{ float: "left", width: "200px" }}
                              placeholder="Select main skill"
                              disabled={isDisableSkill}
                              onChange={loadSkill}
                            >
                              {listSkill.map((skill) => (
                                <Option
                                  key={skill.skillId}
                                  value={skill.skillId}
                                >
                                  {skill.skilName}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <Form.Item label="Cost" name="costPerWeek">
                            <Input
                              name="costPerWeek"
                              onChange={(e) => setCostPerWeek(e.target.value)}
                              addonAfter="$/week"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div> */}
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="text-right">
                          <Form.Item>
                            <Button
                              onClick={handleCancel}
                              style={{ width: "100px", marginRight: "20px" }}
                            >
                              Cancel
                            </Button>
                            <Button
                              style={{
                                background: "#037C00",
                                fontWeight: "bold",
                                color: "white",
                                width: "100px",
                              }}
                              htmlType="submit"
                            >
                              Save
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      ) : null}
    </body>
  );
}
