import React from 'react'
import '../PasswordSecurity/PasswordSecurity.css';
import {Divider, Avatar} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TopNavigation from '../../../Home Page - Freelancer/Top Navigation';
import {Header} from 'antd/lib/layout/layout';
import Sidebar from '../Sidebar/Sidebar';
import {Link} from 'react-router-dom';
function PasswordSecurity() {
  return (
    <>
    <Header style={{background: "#094654"}}>
        <TopNavigation/>
    </Header>
    <Sidebar/>
    <div className='passwordSecurity'>
        <p>Password &amp; security</p>
        <div className='authenticatedOptions'>
        <div className='headAuthenticated'>
            <p>Authentication options</p>
        </div>
        <Divider/>
        <div className='bodyAuthenticated'>
            <div className='titlebodyAuthenticated'>
                <p>Password</p>
                <Avatar sx={{
                    marginRight: 5,
                    marginTop: 3,
                    width: 26,
                    height: 26,
                    cursor:'pointer'
                }}><BorderColorIcon fontSize='small'/></Avatar>
            </div>
            <div className='contentbodyAuthenticated'>
                <CheckCircleIcon sx={{color: '#3C8224'}}/>
                <ul>Password has been set</ul>
                
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default PasswordSecurity;