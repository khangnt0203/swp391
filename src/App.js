import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Login Page";
import HomePageFreelancer from "./Home Page - Freelancer";
import PrivateRoute from "./Utils/PrivateRoute";
import SignUpPage from "./Sign up Page";
import ClientSignup from "./Sign up Page/Client-Signup";
import FreelancerSignup from "./Sign up Page/Freelancer-Signup";
import ActiveAccountPage from "./Active Account Page";
import Profile from "./Home Page - Freelancer/Profile";
import ProfileClient from "./Home Page - Client/ProfileClient";
import HomePage from "./HomePage";
import JobCategoryPage from "./JobCategoryPage";
import SubmitProposal from "./Home Page - Freelancer/Submit Proposal";
import FreelancerCategoryPage from "./FreelancerCategoryPage";
import AdminPage from "./Admin Page";
import SettingPage from "./Setting Page/Settings-freelancer/SettingPage";
import Payment from "./Setting Page/Settings-freelancer/Payment/Payment";
import ContactInfo from "./Setting Page/Settings-freelancer/ContactInfo/ContactInfo";
import ProfileSetting from "./Setting Page/Settings-freelancer/Profile Setting/ProfileSetting";
import PasswordSecurity from "./Setting Page/Settings-freelancer/PasswordSecurity/PasswordSecurity";
import SavedJob from "./Home Page - Freelancer/FindWork/SavedJob/SavedJob";
import SearchJob from "./Home Page - Freelancer/FindWork/SavedJob/SearchJob";
import HomePageClient from "./Home Page - Client";
import GettingStarted from "./Clients/JobPost/Pages/GettingStarted";
import Description from "./Clients/JobPost/Pages/Description";
import ReviewJob from "./Clients/JobPost/Pages/ReviewJob";
import JobDetail from "./Clients/JobPost/Pages/JobDetail";
import JobDetail_Submitted from "./Clients/JobPost/Pages/JobDetail_Submitted";
import EditJob from "./Clients/JobPost/Pages/EditJob";

import FreelanceCovenant from './Home Page - Freelancer/FreelanceCovenant';
import ProposalCovenant from './Home Page - Client/ProposalCovenant';
import AllJobPosting from "./Clients/ViewAllJob/Pages/AllJobPosting";
import ClientReport from './Home Page - Client/ClientReport'
import FreelancerReport from "./Home Page - Freelancer/FreelancerReport";

import React from "react";
import { FooterContainer } from "./containers/footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-client" element={<ClientSignup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile-freelancer" element={<Profile />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-client" element={<ClientSignup />} />

          <Route path="/signup-freelancer" element={<FreelancerSignup />} />
          <Route path="/active-account" element={<ActiveAccountPage />} />
          <Route path="/JobCategoryPage" element={<JobCategoryPage />} />
          <Route
            path="/FreelancerCategoryPage"
            element={<FreelancerCategoryPage />}
          />

          {/* trang nào phải login xong mới được vào thì bỏ trong private */}
          <Route element={<PrivateRoute />}>
            <Route path="/freelancer" element={<HomePageFreelancer />} />
            <Route path="/profile-freelancer" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/freelancer/settings" element={<SettingPage />} />
            <Route path="/freelancer/settings/payments" element={<Payment />} />
            <Route
              path="/freelancer/settings/contact-info"
              element={<ContactInfo />}
            />
            <Route
              path="/freelancer/settings/profile-settings"
              element={<ProfileSetting />}
            />
            <Route
              path="/freelancer/settings/password-security"
              element={<PasswordSecurity />}
            />
            <Route path="/freelancer/saved-job" element={<SavedJob />} />
            <Route path="/freelancer/search-job" element={<SearchJob />} />
            <Route path="/freelancer/report" element={<FreelancerReport/>} />
            <Route path="/submit-proposal" element={<SubmitProposal />} />

            <Route path='/freelancer/my-covenant' element={<FreelanceCovenant/>}/>
            <Route path='/client' element={<HomePageClient/>}/>
            <Route path='/client/job-post/getting-started' element={<GettingStarted/>}/>
            <Route path='/client/job-post/description' element={<Description/>} />
            <Route path='/client/job-post/review' element={<ReviewJob/>} />
            <Route path='/client/applicants/job-details-preview' element={<JobDetail/>} />
            <Route path='/client/applicants/job-details' element={<JobDetail_Submitted/>}/>
            <Route path='/client/job-details/edit-job' element={<EditJob/>}/>
            <Route path='/profile-client' element={<ProfileClient />} />
            <Route path="/client/all-posting-jobs" element={<AllJobPosting/>}/>
            <Route path='/client/job/covenant' element={<ProposalCovenant />} />
            <Route path='/client/report' element={<ClientReport />} />

            <Route
              path="/freelancer/my-covenant"
              element={<FreelanceCovenant />}
            />
            <Route path="/client" element={<HomePageClient />} />
            <Route
              path="/client/job-post/getting-started"
              element={<GettingStarted />}
            />
            <Route
              path="/client/job-post/description"
              element={<Description />}
            />
            <Route path="/client/job-post/review" element={<ReviewJob />} />
            <Route
              path="/client/applicants/job-details"
              element={<JobDetail />}
            />
            <Route path="/client/job-details/edit-job" element={<EditJob />} />
            <Route path="/profile-client" element={<ProfileClient />} />
            <Route path="/client/job/covenant" element={<ProposalCovenant />} />

          </Route>
        </Routes>

        <>
          <FooterContainer />
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
