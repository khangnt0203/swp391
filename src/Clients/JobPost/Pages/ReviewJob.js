import React from 'react';
import '../Styles/ReviewJob.css';
import {Link, useNavigate} from 'react-router-dom';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import {Input,Layout, Form, Button, message } from 'antd';
import { GetTermJob,getTitleJob, getSkills,getSkillsId, getScopeJob, 
    getCategory,getCategoryId,getExperienceJob, getJobBudget, 
    getMinBudget,getMaxBudget ,getPayType, SetDescribeJob, 
    SetFileUrl, setJobId, getTimeJob, getStartTime, getEndTime} from '../../../Utils/Auth';
import { postJob } from '../../../Utils/httpHelper';
import Swal from 'sweetalert2';
import TopNavigation from '../../../Home Page - Client/Top Navigation';
const {Header} = Layout;

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(1),
}));

const ReviewJob = () => {
    const listSkills = getSkills();
    const listCates = getCategory();
    const skills = getSkillsId();
    const Cate =  getCategoryId();
    
    const [titleJob, setTitleJob] = React.useState(getTitleJob());
    const [describeJob, setDescribeJob] = React.useState('');
    const [fileUrl, setFileUrl] = React.useState('');
    const [minBudget] =  React.useState(getMinBudget());
    const [maxBudget] = React.useState( getMaxBudget());
    const [jobBudget] = React.useState(getJobBudget());
    const [payType] = React.useState(getPayType());
    const [scope] = React.useState(getScopeJob());
    const [experience] = React.useState(getExperienceJob());
    const [terms] = React.useState(GetTermJob());
    const [startTime] = React.useState(getStartTime());
    const [endTime] = React.useState(getEndTime());

    const navigate = useNavigate();

    const handleChangeTitleJob = (e) =>{
        setTitleJob(e.target.value);
            console.log("Title : " + e.target.value);
    }
    const handleChangeDescribe = (e) => {
        setDescribeJob(e.target.value);
        SetDescribeJob(e.target.value);
    }

    const handleChangeUrl = (e) => {
        
        setFileUrl(e.target.value);
        SetFileUrl(e.target.value);
       
    }
    
    const checkTitleJob = () => {
        if (titleJob.length > 0) {
            return Promise.resolve();
        } 
        return Promise.reject(new Error("Title of Job must be entered!"));
    }

    const handlePostJob = () => {
       /* let skillss = new Array( parseInt(skills));*/
       let parseStartTime = new Date(startTime);
       let parseEndTime = new Date(endTime);
       let ISOStartTime = parseStartTime.toISOString();
       let ISOEndTime = parseEndTime.toISOString();
        let Cates = parseInt(Cate);
        let parseMinBudget = parseInt(minBudget);
        let parseMaxBudget = parseInt(maxBudget);
        let parseJobBudget = parseInt(jobBudget);

        if (titleJob.length > 0 && describeJob.length > 0 && fileUrl.length > 0) {
        postJob(`/Job`, {
            title: titleJob,
            description: describeJob,
            type: (terms === '0' ? 0 : 1) ,
            level: (experience === '0' ? 0 : experience === '1' ? 1 : 2) ,
            scope: (scope === '0' ? 0 : 1) ,
            categoryId: Cates,
            skillExpertise:  skills,
            typeBudget: (payType === '0' ? 0 : 1),
            maxMember: 5,
            minBudget:  parseMinBudget,
            maxBudget: parseMaxBudget,
            jobBudget: parseJobBudget,
            fileUrl: fileUrl,
            estimatedStartTime: ISOStartTime,
            estimatedTimeToEnd: ISOEndTime,
        }).then((response) => {
            if(response.data.code === 1) {
               console.log('successfully');
               console.log(response.data.data.id);
                setJobId(response.data.data.id);
                navigate("/client/applicants/job-details-preview");
            } else {
                console.log(message.error);
                console.log(response.data.data);
            }
        })
    }
        
    }

    return(
        <>
        <div className='ReviewJob'>
            <Header style={{background: "#094654",  width:'100%' }}>
                <TopNavigation/>
            </Header>
            <Form
                scrollToFirstError ={true}  
                name="basic-review" 
                autoComplete='off'
            >
            <div className='reviewJob'>
                <div className='header-review'>
                    <span>Now just finish and review your job post.</span>
                    <div className='button-postJob'><Link to="/client/applicants/job-details-preview">Preview</Link></div>
                    
                </div>
                <Divider/>
                <div className='content-review'>
                    <div className='content-title-review'>
                        <span>Title</span>
                        <Form.Item
                            name="input-titleJob"
                            rules={[
                                {
                                    validator: checkTitleJob,
                                },
                                
                            ]}
                        >
                        <Input 
                            defaultValue={titleJob} 
                            onChange={handleChangeTitleJob} 
                            size='large' 
                            style={{width:'400px', float:'left', 
                                    marginLeft:'20px', marginTop:'15px'
                                    }}
                                    
                        />
                        </Form.Item>
                    </div>
                    <Divider/>
                    <div className='content-describe-review'>
                        <span className='des-title'>Describe your job </span>
                        <span className='des-alt'>This is how talent figures out what you need and why you’re great to work with!</span>
                        
                        <Form.Item
                                name="textArea-description"
                                rules={[
                                    {
                                        required : true, 
                                        message : "Description of Job must be entered!",
                                    },
                                ]}
                        >
                        <Input.TextArea
                            maxLength={1000}
                            rows={10}
                            value={describeJob}
                            placeholder='Already have a job description? Please it here!'
                            onChange={handleChangeDescribe}
                            style={{width:'500px', borderRadius:'6px',
                                    marginTop:'25px', float:'left', marginLeft:'30px'
                                  
                            }}
                        />
                        </Form.Item>
                        <span style={{ fontWeight:'600',display:'block',textAlign:'left',marginTop:'20px', marginLeft:'30px'}}>Upload file document</span>
                        <Form.Item
                                name="input-fileUrl"
                                rules={[
                                    {
                                        required: true,
                                        message : "You must add more file url document for more info job!",
                                    },
                                    
                                ]}
                        >
                        <Input 
                            type="url" 
                            value={fileUrl} 
                            onChange={handleChangeUrl} 
                            style={{ float:'left',marginTop:'40px', 
                                    marginLeft:'30px' ,width:'400px'
                                   }} 
                            placeholder='Input your url requirement google docs in here.'/>
                        </Form.Item>
                            
                    </div>
                    <Divider/>
                    <div className='content-options-review'>
                        <div className='content-skills'>
                            <span>Skills</span>
                            <div style={{display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    padding: 0.5,
                                    margin:0
                                    }}>
                                    {listCates.map((job) => 

                                        <ListItem key={job.id}>
                                            <Chip sx= {{marginLeft:'10px'}} label={job.name} />
                                        </ListItem>
                                    )}
                                    <div style={{display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    padding: 0.5,
                                    margin:0
                                    }}>
                                    {listSkills.map((data) => 
                                        <ListItem key={data.skillId}>         
                                        <Chip sx={{marginLeft:'10px'}} label={data.skilName}/>
                                        </ListItem>
                                    
                                )}
                                    </div>
                           
                        
                        </div>
                        </div>
                        <div className='content-scope'>
                            <span className='scope-title'>Scope</span>
                            <span className='scope-content'>
                            <ListItem style={{display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    padding: 0.5,
                                    margin:0
                                    }}>
                                <Chip sx={{marginLeft:'10px'}} label={scope === '0' ? "Medium" : "Small"}/>
                                <Chip sx={{marginLeft:'10px'}} label={experience === '0' ? "Entry Level" : experience === '1' ? "Intermediate Level" : "Expert Level"}/>
                            </ListItem>
                            
                             </span>
                        </div> 
                        <div className='content-budget'>
                            <span className='budget-title'>Budget</span>
                            <span className='budget-content'>
                                <span style={{marginLeft:'20px',display:'block',textAlign:'left'}} >

                                { payType === '1'  
                                   ?  "From: $" + minBudget + "- To: $" + maxBudget + "/hr"  
                                    :  "JobBudget : $ " + jobBudget + "/job" }

                                </span>
                            </span>
                        </div>
                    </div>
                    <Divider/>
                    <div className='footer-review'>
                         <div className='prev-button'>
                            <Link to="/client/job-post/description" >Back</Link>
                         </div>       
                         <div className='button-postJob'>
                         <Button
                            htmlType='submit'  
                            onClick={handlePostJob} 
                           /* href="/client/applicants/job-details-preview"*/
                            style={{color:'#ffff', borderRadius:'18px',
                                        width:150, height:40, 
                                     fontSize:'15px',backgroundColor:'#14a800',   
                                }}
                          >
                                Preview</Button>
                         </div>
                    </div>
                </div>
            </div>
            </Form>
            </div>
        </>
    )
}

export default ReviewJob;