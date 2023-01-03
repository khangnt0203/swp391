import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Layout,
  Button,
  Input,
  Modal,
  Form,
  Tag,
  Collapse,
  Space,
  Radio,
  Col,
  Row,
  DatePicker
} from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider, Chip } from "@mui/material";
import TopNavigation from "../../../Home Page - Client/Top Navigation";
import "../Styles/EditJob.css";
import { styled } from "@mui/material/styles";
import { editJob, getAuth } from "../../../Utils/httpHelper";
import Swal from "sweetalert2";
import moment from "moment";
import {
  getTitleJob,
  getDescribeJob,
  getFileUrl,
  GetTermJob,
  getScopeJob,
  getExperienceJob,
  getMinBudget,
  getMaxBudget,
  getSkillsId,
  getCategory,
  getCategoryId,
  getSkills,
  getJobId,
  getPayType,
  getJobBudget,
  getStartTime,
  getEndTime,
  SetCategory,
  SetSkills,
  setJobId,
} from "../../../Utils/Auth";

const {RangePicker} = DatePicker;

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(1),
}));
const { CheckableTag } = Tag;
const { Header } = Layout;
const { Panel } = Collapse;
const { Text } = Typography;
const DateTimeFormat = "YYYY-MM-DD HH:mm:ss";
const EditJob = () => {
  const jobId = getJobId();
  const [formClose] = Form.useForm();
  const [showFormSkills, setShowFormSkills] = React.useState(false);
  const [showFormScope, setShowFormScope] = React.useState(false);
  const [showFormBudget, setShowFormBudget] = React.useState(false);
  const [Scope_tmp, setScope_tmp] = React.useState("");
  const [Experience_tmp, setExperience_tmp] = React.useState("");
  const [Term_tmp, setTerm_tmp] = React.useState("");
  const [MinBudget_tmp, setMinBudget_tmp] = React.useState("0");
  const [MaxBudget_tmp, setMaxBudget_tmp] = React.useState("0");
  const [JobBudget_tmp, setJobBudget_tmp] = React.useState("0");
  const [Paytype_tmp, setPaytype_tmp] = React.useState("");

  const [categoryId, setCategoryId] = React.useState();
  const [nameJob, setNameJob] = React.useState("");
  const [skillJobs, setSkillJobs] = React.useState([]);
  const [popularJobs, setPopularJobs] = React.useState([]);
  const [selectedCates, setSelectedCates] = React.useState([]);
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedSkillsID, setSelectedSkillsID] = React.useState([]);

  const [valueTitleJob, setValueTitleJob] = React.useState(getTitleJob());
  const [valueDescribeJob, setValueDescribeJob] = React.useState(getDescribeJob());
  const [valueFileUrl, setValueFileUrl] = React.useState(getFileUrl());
  const [valueSkills, setValueSkills] = React.useState(getSkills());
  const [valueSkillId, setValueSkillId] = React.useState(getSkillsId());
  const [valueCategory, setValueCategory] = React.useState(getCategory());
  const [valueCategoryJobId, setValueCategoryJobId] = React.useState(getCategoryId());
  const [valueTermJob, setValueTermJob] = React.useState(GetTermJob());
  const [valueScopeJob, setValueScopeJob] = React.useState(getScopeJob());
  const [valueExperienceJob, setValueExperienceJob] = React.useState(getExperienceJob());
  const [valuePayTypeJob, setValuePayTypeJob] = React.useState(getPayType());
  const [valueMinBudgetJob, setValueMinBudgetJob] = React.useState(getMinBudget());
  const [valueMaxBudgetJob, setValueMacBudgetJob] = React.useState(getMaxBudget());
  const [valueJobBudget, setValueJobBudget] = React.useState(getJobBudget());
  const [valueStartTime, setValueStartTime] = React.useState(getStartTime());
  const [valueEndTime, setValueEndTime] = React.useState(getEndTime());
  
  const navigate = useNavigate();

  const handleChangeEditTitle = (e) => {
    setValueTitleJob(e.target.value);
}

const handleChangeEditDescription = (e) => {
  setValueDescribeJob(e.target.value);
}

const handleChangeEditFileUrl = (e) => {
  setValueFileUrl(e.target.value);
}

  const handleChangeEditSkill = () => {
    setShowFormSkills(!showFormSkills);
    setSelectedCates((prevArray) => [...prevArray.splice(0, prevArray.length)]);
    setSelectedSkills((prevArray) => [
      ...prevArray.splice(0, prevArray.length),
    ]);
  };

  const handleSaveSkill = () => {
    setValueCategory(nameJob);
    setValueCategoryJobId(categoryId);
    setValueSkills(selectedSkills);
    setValueSkillId((prevArray) => [...prevArray.splice(0, prevArray.length), ...selectedSkillsID]);
    setShowFormSkills(!showFormSkills);
  };

  const handleSaveScope = () => {
    setValueTermJob(Term_tmp);
    setValueScopeJob(Scope_tmp);
    setValueExperienceJob(Experience_tmp);
    setShowFormScope(!showFormScope);
  };

  const handleSaveBudget = () => {
      setValueMinBudgetJob(MinBudget_tmp);
      setValueMacBudgetJob(MaxBudget_tmp);
      setValueJobBudget(JobBudget_tmp);
      setValuePayTypeJob(Paytype_tmp);
      setShowFormBudget(!showFormBudget);
    
  };

  const handleChangeEditScope = () => {
    setShowFormScope(!showFormScope);
  };

  const handleChangeEditBudget = () => {
    setShowFormBudget(!showFormBudget);
  };

  const onChangeCollapse = (key) => {
    console.log(key);
  };

  const handleClickCategory = (data) => {
    setCategoryId(data.id);
    setNameJob(data.name);
    setSelectedCates((prevArray) => [...prevArray, data]);
    console.log(data);
  };

  const handleClickSkill = (data) => {
    setSelectedSkills((prevArray) => [...prevArray, data]);
    setSelectedSkillsID((prevArray) => [...prevArray, data.skillId]);
    console.log(data);
  };

  const handleDeleteCate = (chipToDelete) => () => {
    setSelectedCates((chips) =>
      chips.filter((chip) => chip.id !== chipToDelete.id)
    );

  };

  const handleDeleteSkill = (chipToDelete) => () => {
    setSelectedSkills((chips) =>
      chips.filter((chip) => chip.skillId !== chipToDelete.skillId)
    );

    setSelectedSkillsID((chips) =>
      chips.filter((chip) => chip.skillId !== chipToDelete.skillId)
    );

  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < moment().endOf('day');
  };

  const onChangeDateTimeJob = (value, dateString) => {
    console.log('Formatted Selected Time: ', dateString);
    setValueStartTime(dateString[0]);
    setValueEndTime(dateString[1]);
    console.log('Selected Time: ', value);
};

const onOkDateTimeJob = (value) => {
  console.log('onOk: ', value);
};

  useEffect(() => {
    getListJobByCate();
    getListSkillByJob(categoryId);
  }, [categoryId]);

  const getListJobByCate = () => {
    let map = new Map();
    getAuth(`/Category?CategoryId=2`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.map((job) => {
          map.set(job.id, job);
        });
        setPopularJobs([...map.values()]);
      }
    });
  };

  const getListSkillByJob = (job) => {
    let map = new Map();
    getAuth(`/Skill?CategoryId=${job}`).then((response) => {
      if (response.data.code === 1) {
        response.data.data.skills.map((skill) => {
          map.set(skill.skillId, skill);
        });
        setSkillJobs([...map.values()]);
      }
    });
  };

  const handleEditDataJob = () => {
    
        let parseStartTime = new Date(valueStartTime);
        let parseEndTime = new Date(valueEndTime);
        let ISOStartTime = parseStartTime.toISOString();
        let ISOEndTime = parseEndTime.toISOString();
    let valueCategoryJobId_tmp = parseInt(valueCategoryJobId);
    let valueMinBudgetJob_tmp = parseInt(valueMinBudgetJob);
    let valueMaxBudgetJob_tmp = parseInt(valueMaxBudgetJob);
    let valueJobBudget_tmp = parseInt(valueJobBudget);
    if (valueTitleJob.length > 0 && valueDescribeJob.length > 0 && valueFileUrl.length > 0) {
    editJob(`/Job`, {
      title: valueTitleJob,
      description: valueDescribeJob,
      type: valueTermJob === "0" ? 0 : 1,
      level:
        valueExperienceJob === "0" ? 0 : valueExperienceJob === "1" ? 1 : 2,
      scope: valueScopeJob === "0" ? 0 : 1,
      categoryId: valueCategoryJobId_tmp,
      skillExpertise: valueSkillId,
      typeBudget: valuePayTypeJob === "0" ? 0 : 1,
      maxMember: 5,
      minBudget: valueMinBudgetJob_tmp,
      maxBudget: valueMaxBudgetJob_tmp,
      jobBudget: valueJobBudget_tmp,
      fileUrl: valueFileUrl,
      estimatedStartTime: ISOStartTime,
      estimatedTimeToEnd: ISOEndTime,
      id: jobId,
    }).then((response) => {
      if (response.data.code === 1) {
        console.log("Edit successfully");
        setJobId(response.data.data.id);
        Swal.fire({
          icon: "success",
          title: "Your changes have been saved",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(function(){
          navigate('/client/applicants/job-details-preview');
     },3000);
      }
    });
  }
  };

  const check_Title_Job_Valid = () => {
    if (valueTitleJob.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Title of Job must be entered!"));
  }

  const check_Description_Job_Valid = () => {
    if (valueDescribeJob.length > 0) {
      return Promise.resolve();
    }
    
    return Promise.reject(new Error("Description of Job must be entered!"));
  }

  const check_FileUrl_Valid = () => {
    if (valueFileUrl.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("File url must be entered!"));
  }

  const check_DateTime_Valid = () => {
    if (valueStartTime.length > 0 && valueEndTime.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Please select StartTime and EndTime!'));
  }

  return (
    <>
      <Header style={{ background: "#094654", height: "80px" }}>
        <TopNavigation />
      </Header>
      <Form
          name="form-editJob"
          autoComplete="off"
          scrollToFirstError={true}
      >
      <div className="edit-job">
        <div className="edit-job-header">
          <span>Review</span>
          <Button
            htmlType="submit"
            onClick={handleEditDataJob}
            style={{
              float: "right",
              marginTop: "15px",
              borderRadius: "10px",
              marginRight: "10px",
              backgroundColor: "#3C8224",
              color: "#ffff",
            }}
          >
            Save Job Post
          </Button>
        </div>
        <Divider />
        <div className="edit-job-title">
          <span>Title</span>
          <Form.Item
              name="input-titleJob"
              rules={[
                {
                  validator: check_Title_Job_Valid,
                },
              ]}
          >
          <Input
            defaultValue={valueTitleJob}
            onChange={handleChangeEditTitle}
            style={{ width: "480px", marginTop: "40px", 
                    float: "left", marginLeft:'15px',
                    }}
          />
          </Form.Item>
        </div>
        <Divider />
        <div className="edit-job-time">
          <span style={{float:'left',fontSize:'18px',
                        marginTop:'20px', marginLeft:'20px',
                    }}
          >Time of Job</span> 
          {/*Form Item - Time of Job*/}
          <Form.Item
            name="rangepicker-time"
            rules={[
              {
                validator: check_DateTime_Valid,
              },
            ]}
          >
              <RangePicker style={{width:'400px', border:'1px solid black',
                                    marginTop:'55px'
                                  }}
                        disabledDate={disabledDate}
                        defaultValue={[moment(valueStartTime, DateTimeFormat), moment(valueEndTime, DateTimeFormat)]}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), 
                            moment('11:59:59', 'HH:mm:ss')]
                            }}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange = {onChangeDateTimeJob}
                        onOk = {onOkDateTimeJob}
                    />
          </Form.Item>         
        </div>
        <Divider/>
        <div className="edit-job-describe">
          <span
            style={{
              float: "left",
              fontSize: "20px",
              fontWeight: "500",
              marginLeft: "15px",
              marginBottom: "15px",
            }}
          >
            Describe your job
          </span>
          <Form.Item
              name="textArea-Description"
              rules={[
                {
                  validator: check_Description_Job_Valid,
                }
              ]}
          >
          <Input.TextArea
            maxLength={1000}
            rows={10}
            style={{
              width: "500px",
              borderRadius: "6px",
              marginTop: "45px",
              marginLeft: "10px",
              float:'left',
            }}
            defaultValue={valueDescribeJob}
            onChange={handleChangeEditDescription}
          />
          </Form.Item>
            </div>
            <Divider/>
            <div className="edit-job-fileUrl">
          <span
            style={{
              float: "left",
              fontSize: "20px",
              fontWeight: "500",
              marginLeft: "15px",
              marginBottom: "15px",
              marginTop: "10px",
            }}
          >
            Upload file document
          </span>
          <Form.Item
                name="input-fileUrl"
                rules={[
                  {
                    validator: check_FileUrl_Valid,
                  }
                ]}
          >
          <Input
            style={{
              float:'left',
              marginLeft:'-80px',
              marginTop: "60px",
              width: "500px",
            }}
            defaultValue={valueFileUrl}
            onChange={handleChangeEditFileUrl}
          />
          </Form.Item>
        </div>
        <Divider />
          <div className="skills-edit">
            <span
              style={{
                float: "left",
                marginLeft: "25px",
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Skills
            </span>
            <Modal
              title="Edit Skills"
              visible={showFormSkills}
              onCancel={() => handleChangeEditSkill()}
              cancelButtonProps={{ shape: "round" }}
              okButtonProps={{ shape: "round" }}
              onOk={() => handleSaveSkill()}
              okText="Save"
            >
              <Form
                style={{ width: "400px" }}
                form={formClose}
                autoComplete="off"
              >
                <Form.Item label="Selected Skills">
                  {selectedCates.map((data) => (
                    <Tag
                      key={data.id}
                      closable
                      onClose={() => handleDeleteCate(data)}
                    >
                      {data.name}
                    </Tag>
                  ))}

                  {selectedSkills.map((data) => (
                    <Space
                      style={{
                        display: "inline-block",
                        marginLeft: "15px",
                        marginTop: "10px",
                      }}
                    >
                      <Tag
                        key={data.skillId}
                        closable
                        onClose={() => handleDeleteSkill(data)}
                      >
                        {data.skilName}
                      </Tag>
                    </Space>
                  ))}
                </Form.Item>

                <Form.Item>
                  <Space direction="vertical">
                    <Collapse
                      style={{ width: "100%" }}
                      collapsible="header"
                      onChange={onChangeCollapse}
                    >
                      <Panel header="Popular Skills">
                        {popularJobs.map((data) => (
                          <Space
                            style={{
                              display: "inline-block",
                              marginLeft: "15px",
                              marginTop: "10px",
                            }}
                          >
                            <Tag key={data.id} value={data.id}>
                              
                              <CheckableTag
                                key={data.id}
                                onClick={() => handleClickCategory(data)}
                              >
                                <PlusOutlined />
                                {data.name}
                              </CheckableTag>
                            </Tag>
                          </Space>
                        ))}
                      </Panel>
                    </Collapse>

                    <Collapse collapsible="header">
                      <Panel header={nameJob}>
                        {skillJobs.map((data) => (
                          <Space
                            style={{
                              display: "inline-block",
                              marginLeft: "15px",
                              marginTop: "10px",
                            }}
                          >
                            <Tag key={data.skillId} value={data.skillId}>
                              
                              <CheckableTag
                                key={data.skillId}
                                onClick={() => handleClickSkill(data)}
                              >
                                <PlusOutlined />
                                {data.skilName}
                              </CheckableTag>
                            </Tag>
                          </Space>
                        ))}
                      </Panel>
                    </Collapse>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>

            <Button
              style={{
                float: "left",
                marginTop: "20px",
                marginLeft: "10px",
                borderRadius: "50%",
              }}
              icon={<EditOutlined />}
              onClick={handleChangeEditSkill}
            />
            <div
              style={{
                display: "flex",
                float: "left",
                listStyle: "none",
                padding: 0.5,
                margin: 0,
                marginTop: "70px",
                marginLeft: "-70px",
              }}
            >
              <Chip
                key={valueCategoryJobId}
                sx={{ marginLeft: "10px" }}
                label={valueCategory}
              />

              {valueSkills.map((data) => (
                <ListItem key={data.skillId} value={data.skillId}>
                  <Chip
                    sx={{ marginLeft: "10px", marginTop: "-10px" }}
                    label={data.skilName}
                  />
                </ListItem>
              ))}
            </div>
          </div>
                <Divider/>
          <div className="scope-edit">
            <span
              style={{
                float: "left",
                marginTop: "15px",
                marginLeft: "-150px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Scope
            </span>

            <Modal
              title="Edit scope"
              visible={showFormScope}
              onCancel={() => setShowFormScope(false)}
              cancelButtonProps={{ shape: "round" }}
              okButtonProps={{ shape: "round" }}
              onOk={() => handleSaveScope()}
              okText="Save"
            >
              <Form form={formClose} autoComplete="off">
                <Form.Item label="Job Type">
                  <Radio.Group
                    value={Term_tmp}
                    onChange={(e) => setTerm_tmp(e.target.value)}
                  >
                    <Radio value={"0"}>ShortTime</Radio>
                    <Radio value={"1"}>LongTime</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Scope">
                  <Radio.Group
                    value={Scope_tmp}
                    onChange={(e) => setScope_tmp(e.target.value)}
                  >
                    <Radio value={"1"}>Small</Radio>
                    <Radio value={"0"}>Medium</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Experience">
                  <Radio.Group
                    value={Experience_tmp}
                    onChange={(e) => setExperience_tmp(e.target.value)}
                  >
                    <Radio value={"0"}>Entry</Radio>
                    <Radio value={"1"}>Intermediate</Radio>
                    <Radio value={"2"}>Expert</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>

            <Button
              style={{
                float: "left",
                marginTop: "20px",
                marginLeft: "-90px",
                borderRadius: "50%",
              }}
              icon={<EditOutlined />}
              onClick={handleChangeEditScope}
            />

            <span
              style={{
                display: "flex",
                float: "left",
                listStyle: "none",
                padding: 0.5,
                margin: 0,
                marginTop: "70px",
                marginLeft: "-70px",
                fontSize:'18px'
              }}
            >
              {valueTermJob === "0" ? "ShortTime" : "LongTime"},
              {valueScopeJob === "0" ? "Medium Scope" : "Small Scope"},
              {valueExperienceJob === "0"
                ? "Entry Level"
                : valueExperienceJob === "1"
                ? "Intermediate Level"
                : "Expert Level"}
            </span>
          </div>
          <Divider/>
          <div className="budget-edit">
            <span
              style={{
                float: "left",
                marginTop: "15px",
                marginLeft:'30px',
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Budget
            </span>

            <Modal
              title="Edit budget"
              visible={showFormBudget}
              onCancel={() => setShowFormBudget(false)}
              cancelButtonProps={{ shape: "round" }}
              okButtonProps={{ shape: "round" }}
              onOk={() => handleSaveBudget()}
              okText="Save"
            >
              <Form form={formClose} autoComplete="off">
                <Form.Item label="Pay Type : ">
                  <Radio.Group
                    value={Paytype_tmp}
                    onChange={(e) => setPaytype_tmp(e.target.value)}
                  
                  >
                    <Radio value={"0"}>For Job</Radio>
                    <Radio value={"1"}>Four Hour</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item>
                  {Paytype_tmp === "1" ? (
                    <Input.Group style={{ marginLeft: "50px" }}>
                      <Row gutter={200}>
                        <Col span={5}>
                          <Input
                            onChange={(e) => setMinBudget_tmp(e.target.value)}
                            value={MinBudget_tmp}
                            placeholder="From"
                            prefix="$"
                            suffix="/hr"
                            style={{ width: "121px" }}
                          />
                        </Col>
                        <Col span={5}>
                          <Input
                            onChange={(e) => setMaxBudget_tmp(e.target.value)}
                            value={MaxBudget_tmp}
                            placeholder="To"
                            prefix="$"
                            suffix="/hr"
                            style={{ width: "121px" }}
                          />
                        </Col>
                      </Row>
                    </Input.Group>
                  ) : (
                    <Input
                      onChange={(e) => setJobBudget_tmp(e.target.value)}
                      value={JobBudget_tmp}
                      placeholder="JobBudget"
                      prefix="$"
                      suffix="/job"
                      style={{ width: "150px" }}
                    />
                  )}
                </Form.Item>
              </Form>
            </Modal>

            <Button
              style={{
                float: "left",
                marginTop: "20px",
                marginLeft: "20px",
                borderRadius: "50%",
              }}
              icon={<EditOutlined />}
              onClick={handleChangeEditBudget}
            />

            <span
              style={{
              display: "flex",
                float: "left",
                listStyle: "none",
                padding: 0.5,
                margin: 0,
                marginTop: "70px",
                marginLeft: "-70px",
                fontSize:'18px',
            }}
            >
              {valuePayTypeJob === "1"
                ? "From: $" +
                  valueMinBudgetJob +
                  "- To: $" +
                  valueMaxBudgetJob +
                  "/hr"
                : "JobBudget : $ " + valueJobBudget + "/job"}
            </span>
          </div>
          <Button
            htmlType="submit"
            onClick={handleEditDataJob}
            style={{
              float: "right",
              marginTop: "20px",
              marginRight: "40px",
              borderRadius: "10px",
              backgroundColor: "#3C8224",
              color: "#ffff",
            }}
          >
            Save Job Post
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditJob;
