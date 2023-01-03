import React from 'react';
import {Avatar, Divider} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import '../ContactInfo/ContactInfo.css';
import {Link} from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import TopNavigation from '../../../Home Page - Freelancer/Top Navigation';
import Sidebar from '../Sidebar/Sidebar';
function ContactInfo() {
    
  return (
    <>
        <Header style={{background: "#094654"}}>
            <TopNavigation/>
        </Header>
        <Sidebar/>
    <div className="contactinfo">
     <ul>Contact info</ul>
        <div className="account">
            <div className='headerAccount'>
                <p style={{fontWeight:'600', color:'black'}}>Account</p>
                <Avatar sx={{
                    marginRight: 5,
                    marginTop: 3,
                    width: 26,
                    height: 26,
                    cursor:'pointer'
                }}><BorderColorIcon fontSize='small'/></Avatar>
            </div>
            <Divider/>
            <div className='bodyAccount'>
            <div className='userID'>
                    <p>User ID</p>
                    <li>a2292d43</li>
            </div> 
            <div className='name'>
                <p>Name</p>
                <li>Triet Nguyen</li>
            </div>
            <div className='email'>
                <p>Email</p>
                 <li>t******98@fpt.edu.vn</li>
            </div>
            </div>
            <Link to="/">Close my account</Link>
        </div>
        <br/>
        <div className="location">
             <div className="headerLocation">
                <p style={{fontWeight:'600', color:'black'}}>Location</p>
                <Avatar sx={{
                    marginRight: 5,
                    marginTop: 3,
                    width: 26,
                    height: 26,
                    cursor:'pointer'
                }}><BorderColorIcon fontSize='small'/></Avatar>
             </div>
             <Divider/>
             <div className="bodyLocation">
                <ul style={{fontSize:'20px'}}>Time Zone</ul>
                <p>UTC+07:00 Bangkok, Jakarta, Hanoi</p>
                <ul style={{fontSize:'20px'}}>Address</ul>
                <p>Quang Trung, P.14, Go Vap, Ho Chi Minh
Ho Chi Minh City, SG
Vietnam</p>
                <ul style={{fontSize:'20px'}}>Phone</ul>
                <p>+84 394172454</p>
             </div>       
        </div>
        
   </div>
   </>
  )
}

export default ContactInfo;