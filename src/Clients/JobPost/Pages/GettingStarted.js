import React, { createContext } from 'react';
import {Divider, Hidden} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import {Link} from 'react-router-dom';
import {Radio} from 'antd';
import { useState } from 'react';
import '../Styles/GettingStarted.css';
import { SetTermJob } from '../../../Utils/Auth';
import TopNavigation from '../../../Home Page - Client/Top Navigation';
import {Layout, Form, Button} from 'antd';
 const {Header} = Layout;
  const GettingStarted = () => {
        
    const [enableButon, setEnableButton] = React.useState(true);

    const handleClick = (e) => {
        SetTermJob(e.target.value);
        setEnableButton(false);
    }
    return(
        <>
        <Header style={{background: "#094654",  width:'100%' }}>
            <TopNavigation/>
        </Header>
        <div className='gettingStarted'>
        <Form>
            <div className='header-started'>
                <span>Getting Started</span>
            </div>
            <Divider/>
            <div className='content-start'>
            <span>What would you like to do?</span>

            <Form.Item
                name="radio-button-typeWork"
                rules={[
                    {
                        required: true,
                        message: "Please choose your work type!",
                    },
                ]}
            >
            <Radio.Group size='large' style={{width:'1000px'}}>
            <div className='short-term' >
              <Radio.Button onClick={handleClick} className='shortTerm-button'  value={0} style={{width:'300px', height:'164px', borderRadius:'8px'}}>
                <AccessTimeIcon sx={{display:'block', margin:'auto', marginTop:'15px'}}/>
                <span style={{display:'block', marginTop:'10px'}}>Short term or part time work</span>
                <span style={{display:'block'}}>Less than 30 hrs/week</span>
                <span style={{display:'block'}}>Less than 3 months</span>
                
                </Radio.Button>
            </div>

            <div  className='long-term'>
              <Radio.Button onClick={handleClick} className='longTerm-button' value={1} style={{width:'300px', height:'164px', borderRadius:'8px'}}>
                <InsertInvitationIcon  sx={{display:'block', margin:'auto', marginTop:'15px'}}/>
                <span style={{display:'block', marginTop:'10px'}}>Designated, longer term work</span>
                <span style={{display:'block'}}>More than 30 hrs/week</span>
                <span>3+ months</span>
            
                </Radio.Button>
            </div>
            </Radio.Group>
            </Form.Item>

            </div>
            <Divider/>
            <div className='footer-start'>
                <Link className='cancel' to="/client">Cancel</Link>
                <Form.Item>
               <Button style={{fontSize:'15px',backgroundColor:'green', color:'white', width:'120px', height:'38px', marginRight:'24px', marginTop:'5px'}} shape='round' htmlType="submit" href="/client/job-post/description" disabled={enableButon}>Continue</Button>
                </Form.Item>
            </div>
            </Form>
        </div>
        </>
    );
}
export default GettingStarted;