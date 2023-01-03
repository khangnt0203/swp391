import React, { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { getToken } from "../../Utils/Auth";
import '../ContentDetail/style.css';
import {Link} from 'react-router-dom';
import { Divider, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dropdown, Menu, Tabs, List, Space, Avatar} from 'antd';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PaidIcon from '@mui/icons-material/Paid';
import AnimationIcon from '@mui/icons-material/Animation';
import BiotechIcon from '@mui/icons-material/Biotech';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { getAuth, getJob, getSkillofFreelancer } from '../../Utils/httpHelper';
import { setJobId } from '../../Utils/Auth';
const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(1),
}));
const {TabPane} = Tabs;

const IconText = ({icon ,text}) => (
    <Space style={{fontSize:'17px', fontWeight:'600'}}>
        {icon}
        {text}
    </Space>
);


export default function() {

    const [listJob, setListJob] = React.useState([]);
    const [listFreelance, setListFreelance] = React.useState([]);
    const [listSkills, setListSkills] = React.useState([]);

    useEffect(() => {
        getAllPostJob();
        getFrelancerBySkill();
    },[]);

    const getAllPostJob = () => {
        let map = new Map();
       
        getAuth(`/Job/Client/MyJobs?status=0&skip=0&take=111`).then((response) => {
            if (response.data.code === 1) {
                console.log("Load lists of PostJobs 1 successfully.");

                response.data.data.map((job) => {
                    map.set(job.id, job);
                });
                setListJob([...map.values()]);
            }
        });
    
    }

    const getFrelancerBySkill = () => {
        let map = new Map();
        getAuth(`/User/Freelance/skill?skillId=-1&skip=0&take=111`).then((response) => {
            if (response.data.code === 1) {
                response.data.data.map((freelance) => {
                    map.set(freelance.id, freelance);
                })
                    setListFreelance([...map.values()]);
            }
        });
    }

    const SkillText = ({userID}) => {
        getSkillofFreelancer(`/AccountProfile/Skills`, userID).then((resonse) => {
            if (resonse.data.code === 1) {
                resonse.data.data.map((skill) => {
                    <ListItem>
                        <Chip key={skill.skillId} label={skill.skilName}/>
                    </ListItem>
                })
            }
        });
    }
    
    const handleSaveJob = (item) => {
        setJobId(item.id);
        console.log(item.id);
    }


    let decode = jwtDecode(getToken(), {payload:true});
    let name = decode.sub;
    return(
        <div>
            <div className='welcome-client'>
            
                <span style={{display:'block', fontSize:'26px', fontWeight:'600', 
                letterSpacing:'0.6px', lineHeight:'32px'}}>Your Dashboard</span>

                <span style={{fontWeight:'400'}}>{name}</span>
            </div>
            <div style={{display:'block'}} className='btn-post-job'>
                <Link to ='/client/job-post/getting-started'>Post a Job</Link>
            </div>

            <Tabs defaultActiveKey="1" centered onChange={(e) =>console.log(e.target.value)}
                type="card" tabBarGutter ={20} size="large"  tabBarStyle={{color:'green', fontSize:'16px', fontWeight:'600'}}>
                <TabPane tab="Job" key="1">
                <div className='posting-jobs'>
                <div className='header-posting'>
                    <span >Your Postings</span>
                    <Link to='/client/all-posting-jobs'>See all postings</Link>
                    
                </div>
                <Divider/>
                <List
                    style={{textAlign:'left'}}
                    itemLayout='vertical'
                    size='large'
                    pagination={{onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    responsive: true,
                    }}
                    dataSource={listJob}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={<AccessTimeFilledIcon style={{color:'green'}}/>} text={item.type === 1 ? "LongTime" : "ShortTime" } key="list-vertical-star-o" />,
                                <IconText icon={<ExpandCircleDownIcon style={{color:'green'}} />} text={item.level === 0 ? "Entry Level" : item.level === 1 ? "Intermediate Level" : "Expert Level"} key="list-vertical-like-o" />,
                                <IconText icon={<BiotechIcon style={{color:'green'}}/>} text={item.scope === 0 ? "Medium Scope" : "Small Scope"} key="list-vertical-scope" />,
                                <IconText icon={<PaidIcon style={{color:'green'}}/>} text={item.typeBudget === 0 ? "$ " + item.jobBudget + " /Job" : "$ " + item.minBudget + " - $ " + item.maxBudget +" /hr"} key="list-vertical-message" />,
                                <IconText icon={<AnimationIcon style={{color:'green'}}/>} text="Processing" key="0"/>,
                                <IconText icon={<TimelapseIcon style={{color:'green'}}/>} text={item.estimatedStartTime.toString().split("T")[0] + " - " + item.estimatedTimeToEnd.toString().split("T")[0]} key="list-vertical-time-o"/>,
                                
                            ]}
                            
                        >
                            <List.Item.Meta
                                title={<Link  onClick={() => handleSaveJob(item)} to="/client/applicants/job-details-preview" style={{fontSize:'17px', textDecoration:'none'}}>{item.title}</Link>}
                                description={<span style={{fontSize:'17px'}}>{item.description}</span>}
                                />
                        </List.Item>
                    )}

                
                    
                />
                {/*<div className='content-posting'>
                    <span style={{display:'block', float:'left',
                            marginLeft:'25px', marginTop:'20px',
                            fontSize:'18px', fontWeight:'600'
                    }}>Build web applicaion with Flutter</span>
                    <Dropdown.Button style={{display:'block', float:'right', 
                    marginTop:'20px', marginRight:'25px'}} overlay={menu} />
                    <div className='detail-content-posting'>
                        <span style={{display:'block', marginTop:'10px', 
                        marginLeft:'10px', fontSize:'14px', letterSpacing:'0.6px'}}>Public - Hourly</span>
                        <span style={{fontSize:'14px', letterSpacing:'0.6px'}}>
                            <Link style={{display:'inline-block'}} to="/client/proposals">57</Link>
                            Proposals
                        </span>
                    </div>
                </div>*/}
            </div>
                </TabPane>

                <TabPane tab="Freelancer" key="2">
                <div className='draft-postJob'>
                    <div className='header-draft-postJob'>
                        <span>Freelancers</span>
                        <Link to="/">See all freelancers</Link>
                    </div>
                    <Divider/>
                    {/*<div className='content-draft-postJob'>
                        <span style={{fontSize:'18px', fontWeight:'600'}}>Build mobile application with React Native</span>
                        <Dropdown.Button style={{display:'block', float:'right', 
                        marginRight:'20px', marginTop:'-30px', 
                        marginBottom:'100px'}} overlay={menu_Draft} />
                    </div>*/}
                    <List
                    style={{textAlign:'left'}}
                    itemLayout='vertical'
                    size='large'
                    pagination={{onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                    responsive: true,
                    }}
                    dataSource={listFreelance}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                               
                                <Chip label={item.major} key={item.id}/>,
                                <SkillText userID={item.id}/>,  
                            ]}
                            
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.imageUrl}/>}
                                title={<Link to="/client/applicants/job-details-preview" style={{fontSize:'17px', textDecoration:'none'}}>{item.firstname + " " + item.lastname}</Link>}
                                description={<span style={{fontSize:'17px'}}>{item.content}</span>}
                                />
                        </List.Item>
                    )}

                
                    
                />
                    
            </div>
                </TabPane>
            </Tabs>
            </div>
        

    );
}