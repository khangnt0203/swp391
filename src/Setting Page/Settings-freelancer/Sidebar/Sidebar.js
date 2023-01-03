import React from 'react'
import '../Sidebar/Sidebar.css';
import {Link} from 'react-router-dom';
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='billing-part'>
        <ul className='1m'>Billing</ul>
           <Link to="/freelancer/settings/payments">Billing &amp; Payments</Link> 
      </div>
      <div className='user-part'>
        <ul className='2m'>User Settings</ul>
          <Link to="/freelancer/settings/contact-info">Contact Info</Link>
            <br/><br/>
          <Link to="/freelancer/settings/profile-settings">Profile Settings</Link>
            <br/><br/>
          <Link to="/freelancer/settings/password-security">Password &amp; Security</Link>
          </div>
    </div>
  )
}

export default Sidebar;