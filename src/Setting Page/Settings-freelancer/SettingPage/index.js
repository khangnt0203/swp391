import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import '../SettingPage/styles-main.css';
import TopNavigation from '../../../Home Page - Freelancer/Top Navigation';
import SideBar from '../../../Setting Page/Settings-freelancer/Sidebar/Sidebar';
const SettingPage = () => {
    return(
        <div>
        <Header style={{background: "#094654"}}>
            <TopNavigation/>
        </Header>
            <SideBar/>
            
        </div>
    )
}

export default SettingPage;