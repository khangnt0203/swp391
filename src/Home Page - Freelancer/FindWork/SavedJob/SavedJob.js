import React from 'react';
import {Divider} from '@mui/material';
import { useState } from 'react';
import '../SavedJob/SavedJob.css';
import {Link} from 'react-router-dom';
import TopNavigation from '../../Top Navigation';
import {Header} from 'antd/lib/layout/layout';
const SavedJob = () => {

    const [savedJobs, setSavedJobs] = useState("Keep track of jobs you're interested in. Select the heart icon on a job post to save it for later.");
    
    
    return (
        <>
        <Header>
            <TopNavigation/>
        </Header>
        <div className='Savejob'>
            <div className='Header-savejob'>
                <Link className='sp1' to="/freelancer/search-job"><span>Search</span></Link>
                <Link className='sp2' to="/freelancer/saved-job"><span>Saved Jobs</span></Link>
            </div>
            <Divider/>
            <div className='Body-savejob'>
                <p>{savedJobs}</p>
                
            </div>
        </div>
        </>
    )
}

export default SavedJob;