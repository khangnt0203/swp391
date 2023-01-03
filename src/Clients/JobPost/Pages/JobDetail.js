import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../Styles/JobDetail.css';
import { Divider, Chip } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PaidIcon from '@mui/icons-material/Paid';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import TopNavigation from '../../../Home Page - Client/Top Navigation';
import { deleteJob, getAuth, put } from '../../../Utils/httpHelper';
import { styled } from '@mui/material/styles';
import { getJobId, SetTitleJob, SetDescribeJob, 
    SetFileUrl, SetCategory,SetCategoryId ,SetScopeJob, 
    SetExperienceJob, SetMinBudget, SetMaxBudget, 
    SetTermJob, SetSkillsId, getCategory, SetSkills, 
    getCategoryId, SetPayType, SetJobBudget, SetStartTime, 
    setJobId ,SetEndTime, SetStatus } from '../../../Utils/Auth';
import { Radio, Space, Button, Modal, Form, Layout, Input } from 'antd';
import Swal from 'sweetalert2';
const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(1),
}));
 const {Header} = Layout;
const JobDetail = () => {
    const [jobId]= useState(getJobId());
    const [CatesName, setCatesName] = useState('');
    const [listSkills, setListSkills] = useState([]);
    const [listDataJobs, setListDataJobs] = useState([]);
    
{/*Close Job event*/}
    const navigate = useNavigate();

    const handleShowForm = () => {
        Swal.fire({
            title: "Do you want to delete this Job?",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            showLoaderOnConfirm:true,
            confirmButtonText: "Yes, Close job",
        
        }).then((result) => {
            if (result.isConfirmed) {
                deleteJobPosting(jobId);
                
            }
        })
    }

    const handleEditData = () => {
        SetTitleJob(listDataJobs.title);
        SetDescribeJob(listDataJobs.description);
        SetFileUrl(listDataJobs.fileUrl);
        SetSkills(listSkills);
        SetCategory(CatesName);
        SetCategoryId(listDataJobs.categoryId);
        SetTermJob(listDataJobs.typeWork);
        SetExperienceJob(listDataJobs.levelWorker);
        SetScopeJob(listDataJobs.scope);
        SetPayType(listDataJobs.typeBudget);
        SetMaxBudget(listDataJobs.maxBudget);
        SetMinBudget(listDataJobs.minBudget);
        SetJobBudget(listDataJobs.jobBudget);
        SetStartTime(listDataJobs.estimatedStartTime);
        SetEndTime(listDataJobs.estimatedTimeToEnd);
        }

    useEffect(()=> {

        getDataJob(jobId);
        getSkillJob(jobId);
    },[]);

    const getDataJob = (jobId) => {
        getAuth(`/Job?jobId=${jobId}`).then((response) => {
            if (response.data.code === 1) {
                console.log('successfully-review');
                setListDataJobs(response.data.data);
                setCatesName(response.data.data.categoryName);
                console.log(response.data.data);
               
            }
        });
    }

    const getSkillJob = (jobId) => {
        let map = new Map();
        getAuth(`/Job/Skills?jobId=${jobId}`).then((response) => {
            if (response.data.code === 1) {
                response.data.data.map((skill) => {
                    map.set(skill.skillId, skill);
                });
                setListSkills([...map.values()]);
                console.log([...map.values()]);
            }
        });
        setListSkills([...map.values()]);
        console.log([...map.values()]);
    }

    const getStatusJob = (jobId) => {
        put(`/Job/Status`,{
            id: jobId,
            status: 1,
        }).then((response) => {
            if (response.data.code === 1) {
                console.log("Status Inactive started.");
                SetStatus("1");

            }
        })
    }

    const deleteJobPosting = (jobId) => {
        deleteJob(`/Job?id=${jobId}`).then((response) => {
                if (response.data.code === 1) {
                    console.log(response.data.message);
                    console.log("Delete Job successfully")
                    Swal.fire({
                        title: "Deleted",
                        text: "Your Job has been deleted",
                        icon: "success",
                        timer: 3000,
                    })
                    setTimeout(function(){
                        navigate('/client');
                   },3000);
                }
        });
    }

    const handleSaveJobId = (jobId) => {
        getStatusJob(jobId);
        setJobId(jobId);
        console.log(jobId);
    }

    /*const getCategoryByID = () => {
        getAuth(`/Category?CategoryId=2`).then((response) => {
            if (response.data.code === 1) {
                setListCates(response.data.data);
                console.log(response.data.data);
            }
        });
    }*/

    /*const getSkillByID = () => {
        getAuth(`/Skill?CategoryId=${getCategoryId()}`).then((response) => {
            let map = new Map();
            if (response.data.code === 1) {
                setListSkills(response.data.data);
            }
        });
    }*/
    return(
        <>
        <Header
        style={{ background: "#094654", height: "80px" }}
      >
        <TopNavigation />
      </Header>
      <div className='Review-job'>
        <div className='job-detail'>
        
            <div className='left-jobDetail'>
                <div className='title'>
                {/*Title*/ }
                    <span style={{color:'#14A800'}}>{listDataJobs.title}</span>
                </div>
                <Divider/>
                <div className='descripstion'>
                {/*Description*/}
                    <span style={{textAlign:'left'}}>{listDataJobs.description}</span>
                </div>
                <Divider/>
                <div className='options-describe'>
                  <div className='terms'>
                    <AccessTimeFilledIcon sx ={{marginLeft:'22px'}}/>
                    <span style={{fontWeight:'600'}}>Terms</span>
                    <span style={{fontWeight:'100'}}>{listDataJobs.typeWork=== 0? 'ShortTime': 'LongTime'}</span>
                  </div>
                
                <div className='level'>
                    <ExpandCircleDownIcon sx={{marginLeft:'25px'}}/>
                    <span style={{fontWeight:'600'}}>Experience</span>
                    <span style={{fontWeight:'100'}}>{listDataJobs.levelWorker === 0 ? "Entry" : listDataJobs.levelWorker === 1 ? "Intermediate" : "Expert" }</span>
                </div>
                <div className='budget-describe'>
                    <PaidIcon sx={{marginLeft:'22px'}}/>
                    <span style={{fontWeight:'600'}}>Budget</span>
                    {listDataJobs.typeBudget === 1 ? (<span style={{fontWeight:'100'}}>${listDataJobs.minBudget} - ${listDataJobs.maxBudget} /hr</span>)
                        : (<span style={{ fontWeight: "100" }}> ${listDataJobs.jobBudget} /Job</span>)}
                    
                </div>
                </div>
                <Divider/>
                <div className='skill-expertise'>
                <span>Skills and Expertise</span>
                <div style={{display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    padding: 0.5,
                                    margin:0,
                                    marginTop:'18px'
                                    }}>
                                    
                                   <Chip sx={{marginLeft:'10px'}} label={CatesName}/>

                                   
                                    {listSkills.map((data) => 
                                        <ListItem key={data.skillId}>         
                                        <Chip key={data.skillId} sx={{marginLeft:'10px', marginTop:'-20px'}} label={data.skilName}/>
                                        </ListItem>
                                    
                                    )}
                                    
                                   
                                    
                                    
                                   
                    </div>

                    
                </div>
            
            </div>
            
            <div className='right-jobDetail'>
               <div className='edit-posting'><EditIcon /> <Link style={{color:'#14A800', textDecoration:'none'}} onClick={handleEditData} to='/client/job-details/edit-job'>Edit posting</Link></div>
               <div className='remove-posting'>
                {/*<Modal   title="Close Job"
                    visible={showForm}
                    onCancel={() => setShowForm(false)}
                    footer = {false}
                >
                <Form form={formClose} autoComplete="off">
                <Form.Item
                    label="Reason for closing"
                    rules={[{required: true, message:"Slect one reason for closing your job"}]}
                >
                    <Radio.Group onChange={handleChange} value={value}>
                        <Space direction='vertical'>
                        <Radio value={1}>Accidental job posting creation</Radio>
                        <Radio value={2}>All positions filled</Radio>
                        <Radio value={3}>Filled by alternate source</Radio>
                        <Radio value={4}>No freelancer for requested skill</Radio>
                        <Radio value={5}>Project was cancelled</Radio>            
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{
                            float:'right',
                            marginLeft:'10px',
                            border:'1px solid #e0e0e0',
                            borderRadius:'14px',
                            color:'#3C8224',
                        }}

                        onClick={() => {
                            setShowForm(false);
                        }}
                    >
                            Cancel
                    </Button>
                    <Button
                        style={{
                            float:'right',
                            marginLeft:'10px',
                            backgroundColor:'#e0e0e0',
                            color:'#a0a0a0',
                            borderRadius:'14px',
                            
                        }}
                        onClick={() => {
                            setShowForm(false);
                            deleteJobPosting();
                        }}

                        disabled={isCheckReason === 'false' ? true: false }
                    >
                            Yes, Close Job
                    </Button>
                </Form.Item>
                </Form>
                </Modal>*/}
               <Button 
                style={{border:'0', color:'#14A800'}} 
                icon={<ClearIcon/>}  
                onClick={handleShowForm}
                >
                    Remove posting
                </Button>
               </div>
            </div>

            <div className='link-document'>
            <span style={{fontWeight:'600'}}>Document Requirement Link</span>
                 <Input 
                    style={{width:'270px'}} 
                    value={listDataJobs.fileUrl} 
                    disabled
                        
                    />
            </div>

            <div className='activity-onthisJob'>
                  <span style={{fontSize:'17px', fontWeight:'600'}}>Activity on this Job</span>
                        <span style={{display:'block'}}>{listDataJobs.status === 0 ? "Processing" : ""}</span>
            </div>
            <Link onClick={() => handleSaveJobId(jobId)} to='/client/applicants/job-details'
                style={{fontSize:'18px', fontWeight:'600',
                textDecoration:'none', color:'#ffff',
                backgroundColor:'#14a800', height:'50px',
                display:'block', width:'100px', 
                float:'right', marginRight:'100px',
                marginTop:'25px', paddingTop:'8px',
                borderRadius:'18px'}} >Submit</Link>
        </div>
        
        </div>
        </>
    )
}

export default JobDetail;