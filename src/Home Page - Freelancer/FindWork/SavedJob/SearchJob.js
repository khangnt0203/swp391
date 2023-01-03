import React from 'react';
import { Link } from 'react-router-dom';
import {Divider, FormControlLabel, Checkbox, Avatar} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useState } from 'react';
import '../SavedJob/SearchJob.css';
import {FaSearch} from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';



const SearchJob = () => {
    const Categories_Network = [
        "Database Management", "DevOps & Solutions Architechture",
        "Information Security", "Network & System Administrator"
    ];

    const Categories_Web_Mobile = [
        "Blockchain, NTF & Crypto", "Desktop Application Development",
        "Ecommerce Development", "Mobile Development",
        "QA & Testing", "Web & Mobile Design"
    ];
    const[jobs, setJobs] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const network_C = Categories_Network.map((item) => <FormControlLabel control={<Checkbox/>} label={item}/>)
    const Web_Mobile_C = Categories_Web_Mobile.map((item) => <FormControlLabel control={<Checkbox/>} label={item}/>)
    return (
        <div className='Searchjob'>
            <div className='filter'>
                <span style={{fontSize: 25, marginLeft: 15}}>Filter By</span>
                <div className='category'>
                    <div className='network-Category'>
                        <span style={{marginLeft: 5}}>Networking & IT</span>
                        <li>{network_C}</li>
                    </div>
                    <Divider/>
                    <div className='web-mobile-Category'>
                    <span style={{marginLeft: 5}}>Web, Mobile &amp; Software Dev</span>
                        <li>{Web_Mobile_C}</li>
                    </div>
                </div>
            </div>
            <div className='Search-content'>
            <div className='Header-searchjob'>
                <Link className='sp11' to="/searchjobs"><span>Search</span></Link>
                <Link className='sp22' to="/savedjobs"><span>Saved Jobs</span></Link>
            </div>
            <Divider/>
            <div className='Body-searchjob'>
                <div className='search'>
                <input
                    placeholder='Search for Jobs'
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                
                />
                <FaSearch
                 
                 className='img' 
                 style={{fontSize: 32,
                    backgroundColor: 'green',
                    color: 'white'
                 }}/>
                </div>
                <Divider/>
                <div className='jobs'>
                    <span className='namejob'>Datamining-Latif Ahmed</span>
                    <span className='desjob'>Hourly: $4.00 - Intermediate - Est. Time: 1 to 3 months</span>
                   
                    <Avatar className='liked'>
                        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                    </Avatar>
                    
                </div>
                <div className='jobs'>
                    <span className='namejob'>Datamining-Latif Ahmed</span>
                    <span className='desjob'>Hourly: $4.00 - Intermediate - Est. Time: 1 to 3 months</span>
                   
                    <Avatar className='liked'>
                        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                    </Avatar>
                    
                </div>
                <div className='jobs'>
                    <span className='namejob'>Datamining-Latif Ahmed</span>
                    <span className='desjob'>Hourly: $4.00 - Intermediate - Est. Time: 1 to 3 months</span>
                   
                    <Avatar className='liked'>
                        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                    </Avatar>
                    
                </div>
                <div className="pagination-jobs">
                 <Divider sx={{marginTop:2}}/>
                 <Pagination sx={{marginTop:2, marginLeft: 28}} count={10} size="large"/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SearchJob;