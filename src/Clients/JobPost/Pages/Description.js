import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../Styles/Description.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import {Input, Form, DatePicker, Layout, Button, Radio} from 'antd';
import moment from 'moment';
import { DollarOutlined } from '@ant-design/icons';
import { GetTermJob, SetTitleJob, SetScopeJob, SetExperienceJob,
    SetJobBudget,SetMinBudget,SetMaxBudget,SetPayType, SetSkills, 
    SetSkillsId,SetCategory,SetCategoryId, SetTimeJob, SetStartTime, SetEndTime} from '../../../Utils/Auth';
import { getAuth } from '../../../Utils/httpHelper';
import TopNavigation from '../../../Home Page - Client/Top Navigation';

const {Header} = Layout;
const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

const {RangePicker} = DatePicker;

const Description = () => {

    const [listJob,setListJob] = React.useState([]);
    const [listSkillCate, setListSkilCate] = React.useState([]);

    const [job,setJob] = React.useState();
    const [skill,setSkill] = React.useState([]);

    const [nameJob, setNameJob] = React.useState('');

    const [listCategory, setListCategory] = React.useState([]);
    const[listSkills, setListSkills] = React.useState([]);

    const [editFrontEndHidden, setFrontEndEditHidden] = useState(true);
    const [title, setTitle] = React.useState('');
    const [scope, setScope] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [payType, setPayType] = React.useState('0');
    

    const[minBudget, setMinBudget] = React.useState('0');
    const[maxBudget, setMaxBudget] = React.useState('0');
    const[jobBudget, setJobBudget] = React.useState('0');
    const[timeJob, setTimeJob] = React.useState([]);
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    
    const navigate = useNavigate();
    useEffect(()=> {
        getListJobByCate();
        getListSkillByJob(job);
    },[job]);
      
    
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current < moment().endOf('day');
      };

      
    
      const getListJobByCate = () => {
        let map = new Map();
        getAuth(`/Category?CategoryId=2`).then((response) => {
            if (response.data.code === 1) {
                response.data.data.map((job) => {
                    map.set(job.id, job);
                });
                setListJob([...map.values()]);
            }
        });
      }

      const getListSkillByJob = (job) => {
        let map = new Map();
        getAuth(`/Skill?CategoryId=${job}`).then((response) => {
            if (response.data.code === 1 ) {
                response.data.data.skills.map((skill) => {
                    map.set(skill.skillId, skill);
                });
                setListSkilCate([...map.values()]);
            }
        });
      }

    
    const handleClickCate = (job) => () => {
        setListCategory(preveArray => [...preveArray, job]);
        setJob(job.id);
        setNameJob(job.name);
        setFrontEndEditHidden(false);
    };

    const handleClickSkill = (data) => () => {
        
        setListSkills(preveArray => [...preveArray, data]);
        setSkill(preveArray => [...preveArray, data.skillId]);

    }

    const handleDeleteCate = (chipToDelete) => () => {
        setListCategory((chips) => chips.filter((chip) => 
        chip.id!== chipToDelete.id))
        
        setFrontEndEditHidden(true);
    };

    const handleDeleteSkill = (chipToDelete) => () => {
        setListSkills((chips) => chips.filter((chip) => 
            chip.skillId!== chipToDelete.skillId))
        
    };


    const handleChangeTitle = (e) => {
        setTitle( e.target.value);
        
    }

    const handleChangeScope = (e) => {
        setScope(e.target.value);
        console.log("Scope : " + e.target.value);
        
    }

    const handleChangeExperience = (e) => {
        setExperience(e.target.value);
        console.log("Experience : " + e.target.value);
        
    }

    const handleChangePayType = (e) => {
        setPayType(e.target.value);
        console.log( "PayType : " + e.target.value);
        
    }

    const handleChangeJobBudget = (e) => {
        console.log("JobBudget : " +  e.target.value );
        const newNumberJobBudget = parseInt(e.target.value || '0', 10);

        if (Number.isNaN(jobBudget)) {
            return;
        } else {
            setJobBudget(newNumberJobBudget);
        }
    };

    const handleChangeMinBudget = (e) => {
        const newNumberMinBudget = parseInt(e.target.value || '0', 10);

        if (Number.isNaN(minBudget)) {
            return;
        } else {
            setMinBudget(newNumberMinBudget);
        }
    };

    const handleChangeMaxBudget = (e) => {
        const newNumberMaxBudget = parseInt(e.target.value || '0', 10);

        if (Number.isNaN(maxBudget)) {
            return;
        } else {
            setMaxBudget(newNumberMaxBudget);
        }
    }

    const onChangeDateTimeJob = (value, dateString) => {
        console.log('Formatted Selected Time: ', dateString);
        setTimeJob(dateString);
        setStartTime(dateString[0]);
        setEndTime(dateString[1]);
        console.log('Selected Time: ', value);
    };
    
    const onOkDateTimeJob = (value) => {
      console.log('onOk: ', value);
    };

    const checkJobBudget = () => {
        if (jobBudget > 0) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Job Budget must be greater than zero!'));
    }

    const check_Min_Max_Budget = () => {
        if (minBudget > maxBudget) {
            return Promise.reject(new Error('Min Budget must be less than Max Budget!'));
        } else if (minBudget <= 0 || maxBudget <= 0 ) {
            return Promise.reject(new Error('Budget must be greater than zero!'));
        } else if (minBudget > 0 && maxBudget > 0) {
            return Promise.resolve();
        }

    }

    const handleClickReview = () => {


        SetTitleJob(title);
        SetScopeJob(scope);
        SetExperienceJob(experience);
        SetPayType(payType);
        SetJobBudget(jobBudget);
        SetMinBudget(minBudget);
        SetMaxBudget(maxBudget);
        SetCategory(listCategory);
        SetCategoryId(job);
        SetSkills(listSkills);
        SetSkillsId(skill);
        SetTimeJob(timeJob);
        SetStartTime(startTime);
        SetEndTime(endTime);

        if ((title.length > 0 && startTime.length > 0 && 
            endTime.length > 0 && scope.length > 0 && 
            experience.length > 0 ) || 
            (payType === 0 && jobBudget > 0) || (payType === 1 && minBudget<maxBudget && minBudget > 0 && maxBudget > 0)) {
                navigate('/client/job-post/review');
            }
    };

     return (
        <>
        <Header style={{background: "#094654",  width:'100%' }}>
            <TopNavigation/>
        </Header>
        <Form 
            scrollToFirstError={true}
            name="basic" 
            autoComplete='off'
        >
        <div className='description'>
            <div className='title'>
                <span>Write a title for your job post</span>
                <Form.Item
                    name="input-titleJob"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your title of your Post Job!',
                        },
                    ]}
                
                >
                    <Input value={title} onChange={handleChangeTitle} size='large' style={{width:'800px', border:'1px solid black'}} bordered />
                </Form.Item>
                    <span style={{fontSize:'20px', fontWeight:'600'}}>StartTime and EndTime</span>
                    <Form.Item
                        name="date-picker-Job"
                       rules={[
                        {
                            type:'array',
                            required: true,
                            message: "Please select your project's time!",
                        },
                       ]}
                    >
                    <RangePicker style={{width:'400px', border:'1px solid black'}}
                        disabledDate={disabledDate}
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
            <div className='selected-skills'>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                            }}
                        component="ul"
                            >
                        {listCategory.map((job) => 
                            
                            <ListItem key={job.id}>
                                <Chip label={job.name} onDelete={handleDeleteCate(job)}/>
                            </ListItem>
                        
                          )}
                        

                        </Paper>

                        <Paper sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                            }}
                        component="ul">

                          {listSkills.map((data) => 
                          
                                <ListItem key={data.skillId} value={data.skillId}>
                                    <Chip label={data.skilName} onDelete={handleDeleteSkill(data)}/>
                                </ListItem>
                          )}
                          </Paper>
                        
            </div>
            <div className='skills'>
            {/* Popular skills */}
            <span> Select skills for job</span>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Popular skills</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                            }}
                        component="ul"
                            >
                        {listJob.map((job) => 
                            <ListItem key={job.id} value={job.id}>
                                <Chip label={job.name} onClick={handleClickCate(job)}/>
                            </ListItem>
                        )}
                        </Paper>
                    </AccordionDetails>
                </Accordion>
                {/* Front-End Development Languages */}
                
                <Accordion hidden={editFrontEndHidden}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{nameJob} Skills</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                            }}
                        component="ul"
                            >
                        {listSkillCate.map((data) => 
                            <ListItem key={data.skillId} value={data.skillId}>
                                <Chip label={data.skilName} onClick={handleClickSkill(data)}/>
                            </ListItem>
                        )}
                        </Paper>
                    </AccordionDetails>
                </Accordion>

                
                {/* Front-end Development Skills */}
            </div>

            <div className='scope-jobpost'>
            <span>Scope your job</span>
           
            <Form.Item 
                name="radio-scope"
                rules={[
                    {
                        required: true,
                        message: "Please select your project's scope!",
                    }
                ]}
            >
                <Radio.Group 
                        value={scope}
                        onChange={handleChangeScope}
                        style={{textAlign:'left', marginLeft:'-280px'}}
                >
                    <Radio style={{fontSize:'18px'}} value={0}>Medium</Radio>
                    <span style={{display:'block',textAlign:'left', 
                                    marginLeft:'40px',fontSize:'17px'}}>
                        Well-defined projects (ex. a landing page)
                    </span>
                    <Radio style={{fontSize:'18px'}} value={1}>Small</Radio>
                    <span style={{display:'block',textAlign:'left', 
                                    marginLeft:'40px', marginBottom:'15px', 
                                    fontSize:'17px'}}>
                        Quick and straightforward tasks (ex. update text and images on a webpage)
                    </span>
                </Radio.Group>
           </Form.Item>
  
            </div>
            <div className='level-experience'>
                <span>What level of experience will it need?</span>
                <Form.Item 
                    name="radio-experienceLevel"
                    rules={[
                        {
                            required : true,
                            message : "Please choose level of candidate!"
                        },
                    ]}
                >
                       <Radio.Group 
                            value={experience}
                            onChange = {handleChangeExperience}
                            style={{textAlign:'left', marginLeft:'-280px'}}
                       >
                            <Radio style={{fontSize:'18px'}} value={0}>Entry</Radio>
                            <span style={{display:'block',textAlign:'left', 
                                            marginLeft:'40px',fontSize:'17px'}}>
                                Looking for someone relatively new to this field 
                            </span>
                            <Radio style={{fontSize:'18px'}} value={1}>Intermediate</Radio>
                            <span style={{ display:'block',textAlign:'left', 
                                            marginLeft:'40px',fontSize:'17px', 
                                            marginBottom:'15px'}}>
                                Looking for substantial experience in this field
                            </span>
                            <Radio style={{fontSize:'18px'}} value={2}>Expert</Radio>
                            <span style={{display:'block',textAlign:'left', 
                                            marginLeft:'40px',fontSize:'17px', 
                                            marginBottom:'15px'}}>
                                Looking for comprehensive and deep expertise in this field
                            </span>
                       </Radio.Group>     
                </Form.Item>
            </div>
                
            <div className='budget'>
                <span>Budget of your job</span>
                <Form.Item 
                    name="radio-budget"
                    rules={[
                        {
                            required: true,
                            message: "Please select project's budget!",
                        }
                    ]}
                >
                    <Radio.Group
                        value={payType}
                        onChange={handleChangePayType}
                        style={{textAlign:'left', marginLeft:'-500px'}}
                    >
                        <Radio style={{fontSize:'18px'}} value={0}>Pay For Job</Radio>
                        <Radio style={{fontSize:'18px'}} value={1}>Pay For Hour</Radio>
                    </Radio.Group>
                </Form.Item>

                { payType === 1 ?
                    <Form.Item
                        name="input-MinMaxBudget" 
                        rules={[
                        {
                            validator: check_Min_Max_Budget,
                        },
                        
                    ]}
                >
                        <span>
                            <Input
                                type="text"
                                value={minBudget}
                                onChange = {handleChangeMinBudget}
                                style={{
                                        width: 150,
                                        height: 40,
                                        marginRight: 18,
                                        fontSize: '18px',
                                        }}
                                prefix={<DollarOutlined/>}
                                suffix="/hr"
                            />
                        </span>

                        <span>
                            <Input
                                type="text"
                                value={maxBudget}
                                onChange = {handleChangeMaxBudget}
                                style={{
                                        width: 150,
                                        height: 40,
                                        fontSize:'18px',
                                        }}
                                prefix={<DollarOutlined/>}
                                suffix="/hr"
                            />
                        </span>
                     </Form.Item>

                     :
                     /*Form Item - Job Budget*/                   
                     <Form.Item
                        name="inputjobBudget" 
                        rules={[
                                    {
                                        validator: checkJobBudget,
                                    },
                                ]}
                    >
                        <span>
                            <Input
                            type="text"
                            value={jobBudget}
                            onChange = {handleChangeJobBudget}
                            style={{
                                    width: 150,
                                    height: 40,
                                    fontSize:'18px',
                                    }}
                            prefix="$"
                            suffix="/job"
                            />
                        </span>
                    </Form.Item>
                }

            </div>
            <div className='button-options'>
               
            <Button
                        href="/client/job-post/getting-started"
                        style={{marginRight:'18px', width:100, 
                                fontSize:'17px', fontWeight:'500',
                                borderRadius:'18px', color:'#14A800',
                                backgroundColor:'#ffff',
                        }}
                     >
                        Back
                    </Button>
                 
                    <Button 
                        htmlType='submit' 
                        onClick={handleClickReview} 
                        style={{fontWeight:'500', fontSize:'17px',
                                width:150, borderRadius:'18px',
                                backgroundColor:'#14A800', color:'#ffff',
                                paddingBottom:'15px'
                        }}
                    
                    >
                        Review Job Post
                    </Button>
            </div>
        </div>
        </Form>
        </>
    )
}

export default Description;