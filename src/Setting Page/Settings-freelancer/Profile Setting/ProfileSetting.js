import React, {useState} from 'react';
import '../Profile Setting/ProfileSetting.css';
import {Link} from 'react-router-dom';
import {Divider, MenuItem, FormControl, Select} from '@mui/material';
import TopNavigation from "../../../Home Page - Freelancer/Top Navigation";
import Sidebar from '../Sidebar/Sidebar';
import {Header} from 'antd/lib/layout/layout';
function ProfileSetting() {
    const [status_V, setStatus_V] = useState('public');
    const [status_P, setStatus_P] = useState('1_B');
    const handleChange = (event) => {
        setStatus_V(event.target.value);
    };
    const handleChange1 = (event) => {
        setStatus_P(event.target.value);
    };

  return (
    <>
    <Header style={{background: "#094654"}}>
        <TopNavigation/>
    </Header>
    <Sidebar/>
    <div className="profileSetting">
      <div className="myprofile">
        <div className="headMyprofile">
            <p style={{fontWeight:'600', color:'black'}}>My profile</p>
            <Link to="/">View my profile as others see it</Link>
        </div>
        <Divider/>
        <div className="bodyMyprofile">
            <div className="bodyMyprofile_visibility">
            <ul>Visibility</ul>
            <FormControl sx={{ m: 1, minWidth: 400}}
                
            >
                <Select
                 onChange={handleChange} 
                 size="small"
                 value={status_V}
                 displayEmpty
                 >
                    <MenuItem value={"public"}>Public</MenuItem>
                    <MenuItem value={"private"}>Private</MenuItem>

                </Select>
            </FormControl>
            </div>
            <div className="bodyMyprofile_project">
            <ul>Project preference</ul>
            <FormControl sx={{ m: 1, minWidth: 400}}
                
            >
                <Select
                 onChange={handleChange1} 
                 size="small"
                 value={status_P}
                 displayEmpty
                 >
                    <MenuItem value={"1_B"}>Both short-term and long-term projects</MenuItem>
                    <MenuItem value={"2_B"}>Long-term projects(+3 months)</MenuItem>
                    <MenuItem value={"3_B"}>Short-term projects(less than 3 months)</MenuItem>

                </Select>
            </FormControl>
            </div>
        </div>
      </div>
      <div className="experienceLevel">
        <div className="headExperience">
        <p style={{fontWeight:'600', color:'black'}}>Experience level</p>
        </div>
      
        <Divider/>
        <br/>
        <div className="bodyExperience">
            <button style={{width:150, height: 150}}>
                Entry level
                <p>I am relatively to this field</p>
            </button>
            <button style={{width:150, height: 150}}>
                Intermediate
                <p>I have substantial experience in this field</p>
            </button>
            <button style={{width:150, height: 150}}>
                Expert
                <p>I have comprehensive and deep expertise in this field</p>
            </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileSetting;