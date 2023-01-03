import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import TopNavigation from '../../../Home Page - Client/Top Navigation';
import {Layout,Menu, Tabs, List, Space} from 'antd';
import {Chip} from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import BiotechIcon from '@mui/icons-material/Biotech';
import PaidIcon from '@mui/icons-material/Paid';
import AnimationIcon from '@mui/icons-material/Animation';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import '../Styles/AllJobPosting.css';
import { setJobId } from '../../../Utils/Auth';
import { getAuth } from '../../../Utils/httpHelper';
const {Header} = Layout;
const {TabPane} = Tabs;
    
 const IconText = ({icon, text}) => (
        <Space>
            {icon}
            {text}
        </Space>
    );    


const AllJobPosting = () => {

    const [listCategories, setListCategories] = React.useState([]);
    const [categoryIdJob, setCategoryIdJob] = React.useState('4');
    const [statusJob, setStatusJob] = React.useState('0');
    const [listJobs, setListJobs] = React.useState([]);

        useEffect (() =>{
                getAllCategoryJob();
                getPostJobByCategoryAndId(categoryIdJob, statusJob);
        },[categoryIdJob, statusJob]);

        const getAllCategoryJob = () => {
            let map = new Map();
            
            getAuth(`/Category?CategoryId=2`).then((response) => {
                if (response.data.code === 1) {
                    console.log("Get All Job successfully!");
                    response.data.data.map((category) => {
                        map.set(category.id, category);
                    });
                    setListCategories([...map.values()]);
                }
            });
        }

        const getPostJobByCategoryAndId = (categoryIdJob, statusJob) => {
            let map = new Map();
            let CategoryId_tmp = parseInt(categoryIdJob);
            let StatusJob_tmp = parseInt(statusJob);
            getAuth(`/Job/Client/MyJobs?status=${StatusJob_tmp}&categoryId=${CategoryId_tmp}&skip=0&take=111`).then((response) => {
                if (response.data.code === 1) {
                    console.log("Load lists of PostJobs successfully.");

                    response.data.data.map((job) => {
                        map.set(job.id, job);
                    });
                    setListJobs([...map.values()]);
                }
            });
        }


        const onChangeStatus = (key) => {
            console.log(key);
            setStatusJob(key);

          };
         
        const onChangeCategory = ({key}) => {
            console.log(key);
            setCategoryIdJob(key);
        }
        
        const handleSaveJobId = (jobId) => {
                console.log("JobID: " + jobId);
                setJobId(jobId);
        }
    return(
        <>
            <Header style={{background: "#094654",  width:'100%' }}>
                <TopNavigation/>
            </Header>
            <div className="All-Job-Posting">
                <div className='Form-Job-Posting'>  
                        <span style={{fontSize:'25px', fontWeight:'600',
                                        float:'left', marginLeft:'20px',
                                        marginTop:'20px'
                        }}>Your Posting Jobs</span>
                    <div className="Menu-Category-Job">
                        <Menu
                            style={{
                                width: 260,
                                marginLeft:'28px',
                                marginTop:'60px',
                                border:'1px solid #e0e0e0',
                            }}
                            defaultSelectedKeys={['4']}
                            mode="inline"
                            onClick={onChangeCategory}
                        >
                         {   listCategories.map((category) => 
                             <Menu.Item key={category.id} >
                                {category.name}
                             </Menu.Item>
                            )
                         }
                        </Menu>
                        </div>
                        <div className="Tab-Status-Job">
                        <Tabs defaultActiveKey='0' style={{width:'700px', height:'650px', border:'1px solid #e0e0e0'}} onChange={onChangeStatus} type="card" tabPosition='top'>
                            <TabPane tab="Processing" key='0' >
                            <List
                                style={{textAlign:'left'}}
                                itemLayout='vertical'
                                size='large'
                                pagination={{onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                                responsive: false,
                                }}
                                dataSource={listJobs}
                                renderItem={(item) => (
                             
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={<AccessTimeFilledIcon style={{color:'green'}}/>} text={item.type === 1 ? "LongTime" : "ShortTime" } key="list-vertical-star-o" />,
                                <IconText icon={<ExpandCircleDownIcon style={{color:'green'}}/>} text={item.level === 0 ? "Entry Level" : item.level === 1 ? "Intermediate Level" : "Expert Level"} key="list-vertical-like-o" />,
                                <IconText icon={<BiotechIcon style={{color:'green'}}/>} text={item.scope === 0 ? "Medium Scope" : "Small Scope"} key="list-vertical-scope" />,
                                <IconText icon={<PaidIcon style={{color:'green'}}/>} text={item.typeBudget === 0 ? "$ " + item.jobBudget + " /Job" : "$ " + item.minBudget + " - $ " + item.maxBudget +" /hr"} key="list-vertical-message" />,
                                <IconText icon={<AnimationIcon style={{color:'green'}}/>} text="Processing" key="0"/>,
                                <IconText icon={<TimelapseIcon style={{color:'green'}}/>} text={item.estimatedStartTime.toString().split("T")[0] + " - " + item.estimatedTimeToEnd.toString().split("T")[0]} key="list-vertical-time-o"/>,
                                <Space>
                                <Chip label={item.categoryName}/>,
                                </Space>

                            ]}
                        >
                            <List.Item.Meta
                                title={<Link onClick={() => handleSaveJobId(item.id)} to="/client/applicants/job-details-preview" style={{fontSize:'16px', textDecoration:'none'}}>{item.title}</Link>}
                                description={item.description}
                                />
                        </List.Item>
                    )}

                 />
                            </TabPane>
                            <TabPane tab="InProgress" key='1'>
                            <List
                                style={{textAlign:'left'}}
                                itemLayout='vertical'
                                size='large'
                                pagination={{onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                                responsive: false,
                                }}
                                dataSource={listJobs}
                                renderItem={(item) => (
                             
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={<AccessTimeFilledIcon style={{color:'green'}}/>} text={item.type === 1 ? "LongTime" : "ShortTime" } key="list-vertical-star-o" />,
                                <IconText icon={<ExpandCircleDownIcon style={{color:'green'}}/>} text={item.level === 0 ? "Entry Level" : item.level === 1 ? "Intermediate Level" : "Expert Level"} key="list-vertical-like-o" />,
                                <IconText icon={<BiotechIcon style={{color:'green'}}/>} text={item.scope === 0 ? "Medium Scope" : "Small Scope"} key="list-vertical-scope" />,
                                <IconText icon={<PaidIcon style={{color:'green'}}/>} text={item.typeBudget === 0 ? "$ " + item.jobBudget + " /Job" : "$ " + item.minBudget + " - $ " + item.maxBudget +" /hr"} key="list-vertical-message" />,
                                <IconText icon={<AnimationIcon style={{color:'green'}}/>} text="InProgress"/>,
                                <IconText icon={<TimelapseIcon style={{color:'green'}}/>} text={item.estimatedStartTime.toString().split("T")[0] + " - " + item.estimatedTimeToEnd.toString().split("T")[0]} key="list-vertical-time-o"/>,
                                <Space>
                                <Chip label={item.categoryName}/>,
                                </Space>

                            ]}
                        >
                            <List.Item.Meta
                                title={<Link onClick={() => handleSaveJobId(item.id)} to="/client/applicants/job-details" style={{fontSize:'16px', textDecoration:'none'}}>{item.title}</Link>}
                                description={item.description}
                                />
                        </List.Item>
                    )}

                 />
                            </TabPane>
                            <TabPane tab="Finished" key='2'>
                            <List
                                style={{textAlign:'left'}}
                                itemLayout='vertical'
                                size='large'
                                pagination={{onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                                responsive: false,
                                }}
                                dataSource={listJobs}
                                renderItem={(item) => (
                             
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={<AccessTimeFilledIcon style={{color:'green'}}/>} text={item.type === 1 ? "LongTime" : "ShortTime" } key="list-vertical-star-o" />,
                                <IconText icon={<ExpandCircleDownIcon style={{color:'green'}}/>} text={item.level === 0 ? "Entry Level" : item.level === 1 ? "Intermediate Level" : "Expert Level"} key="list-vertical-like-o" />,
                                <IconText icon={<BiotechIcon style={{color:'green'}}/>} text={item.scope === 0 ? "Medium Scope" : "Small Scope"} key="list-vertical-scope" />,
                                <IconText icon={<PaidIcon style={{color:'green'}}/>} text={item.typeBudget === 0 ? "$ " + item.jobBudget + " /Job" : "$ " + item.minBudget + " - $ " + item.maxBudget +" /hr"} key="list-vertical-message" />,
                                <IconText icon={<AnimationIcon style={{color:'green'}}/>} text="Finished"/>,
                                <IconText icon={<TimelapseIcon style={{color:'green'}}/>} text={item.estimatedStartTime.toString().split("T")[0] + " - " + item.estimatedTimeToEnd.toString().split("T")[0]} key="list-vertical-time-o"/>,
                                <Space>
                                <Chip label={item.categoryName}/>,
                                </Space>

                            ]}
                        >
                            <List.Item.Meta
                                title={<Link onClick={() => handleSaveJobId(item.id)} to="/client/applicants/job-details-preview" style={{fontSize:'16px', textDecoration:'none'}}>{item.title}</Link>}
                                description={item.description}
                                />
                        </List.Item>
                    )}

                 />
                            </TabPane>
                        </Tabs>
                        </div>
             </div>       
            </div>
        </>
    )
}

export default AllJobPosting;