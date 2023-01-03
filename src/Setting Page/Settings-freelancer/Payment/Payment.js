import React from 'react';
import {Button, Divider} from '@mui/material';
import '../Payment/Payment.css';
import TopNavigation from '../../../Home Page - Freelancer/Top Navigation';
import SideBar from '../../../Setting Page/Settings-freelancer/Sidebar/Sidebar';
import { Header } from 'antd/lib/layout/layout';


const Payment = () => {

  return (
    <>
    <Header style={{background: "#094654"}}>
    <TopNavigation/>
   </Header>
   <SideBar/>
   <div className='payment'>
   
        <ul style={{color:'black', fontWeight:'600'}}>Billing &amp; payments</ul>
        <div className='billingForms'>
    <div className='headerBilling'>
    <p style={{color:'black', fontWeight:'600'}}>Billing Methods</p>
    <Button 
            
                style={{borderRadius: 35,
                    color: "#3C8224",
                    border: "2px #F1F2F4 solid",
                    height: 60,
                    marginTop:'10px',
                    marginRight: 30,
                    marginBottom:'10px'
                }}
        >Add a new billing method </Button>
        </div>
            <Divider variant='mid'/>
            <div className='paymentinfo'>
                <p>You have not set up any billing methods yet. </p>    
            </div>
        </div>
   </div>
   </>
  )
}

export default Payment;