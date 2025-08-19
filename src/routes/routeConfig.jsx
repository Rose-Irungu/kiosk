import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import VisitorPage from "../pages/VisitorPage";
import Verify from "../pages/Verify";
import Bye from "../pages/Bye";
import Error from "../pages/Error";
import Welcomeback from "../pages/Welcomeback";
import LoginForm from "../components/forms/LoginForm";
import RegistrationForm from "../components/forms/RegistrationForm";
import ResidentRegistration from "../components/forms/ResidentRegistration";
import SecurityRegistration from "../components/forms/SecurityRegistration";
import ForgotPassword from "../components/forms/ForgotPassword";
import ForgotPasswordError from "../components/forms/ForgotPasswordError";
import ResetEmail from "../components/forms/ResetEmail";
import ResetPassword from "../components/forms/ResetPassword";
import GuestRegSuccessPage from "../pages/Registration/GuestRegSuccessPage";
import GuestRegistrationPage from "../pages/Registration/GuestRegistrationPage";
// Admin routes
import Dashboard from "../pages/Dashboardpages/Dashboard";
import UsersPage from "../pages/Dashboardpages/userspage";
import VisitorLogs from "../pages/Dashboardpages/VisitorLogs";
import Incident_Reports from "../pages/Dashboardpages/Incident_Reports";
import Settings from "../pages/Dashboardpages/Settings";
import Emergencypage from "../pages/Dashboardpages/Emergencypage";
import HelpPage from "../pages/Dashboardpages/Help";
import FacilityProfilePage from "../pages/Dashboardpages/FacilityProfilePage";

// Security routes
import SecurityOverview from "../pages/SecurityPages/SecurityOverview";
import SecurityDashboard from "../pages/SecurityPages/Securitydashboard";
import CheckinCheckout from "../pages/SecurityPages/CheckinCheckout";
import View from "../pages/SecurityPages/View";
import EmergencyPageSecurity from "../pages/SecurityPages/Emergencypage";
import SecuritySettingPage from "../pages/SecurityPages/SecuritySettingPage";
import VisitorRegistration from "../pages/SecurityPages/VisitorRegistration";
import VisitorsExpected from "../pages/SecurityPages/VisitorsExpected";
import CheckedOutVisitors from "../pages/SecurityPages/CheckedOutVisitors";
import SecurityHelpPage from "../pages/SecurityPages/Help";
import SecurityIncidentPage from "../pages/SecurityPages/Incidentpage";

// Resident/Tenant routes
import ResidentDashboard from "../pages/ResidentPages/ResidentDashboard";
import ResidentSettings from "../pages/ResidentPages/ResidentSettings";
import SafetyProtocols from "../pages/ResidentPages/SafetyProtocols";
import LoggedDevices from "../pages/ResidentPages/LoggedDevices";
import ResidentEmergencypage from "../pages/ResidentPages/ResidentEmergencyPage";
import VisitorManagement from "../pages/ResidentPages/VisitorManagement";
import GuestList from "../pages/ResidentPages/GuestList";
import ReportIncidentPage from "../pages/ResidentPages/ReportPage";
import PastReportsPage from "../pages/ResidentPages/PastReports";
import Intro from "../pages/Website/Intro";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import Card1 from "../components/Card1";
import Card2 from "../components/Card2";
import Card3 from "../components/Card3";
import CardA from "../components/ResidentComponents/ResidentCards/CardA";
import MyGuestsFrame from "../components/ResidentComponents/ResidentCards/MyGuestsFrame";

// import {Edit} from "../components/ResidentComponents/ResidentCards/Edit";
import Card4 from "../components/Card4";
import Card6 from "../components/Card6";
import { DashboardTable } from "../components/tables/DashboardTable";
import SecuritySidebar from "../components/SecurityComponents/SecuritySidebar";
import LiveLogsTable from "../components/SecurityComponents/LiveLogsTable";
import SecurityLayout from "../components/SecurityComponents/SecurityLayout";
import ViewCard1 from "../components/SecurityComponents/ViewCard1";
import ViewCard2 from "../components/SecurityComponents/ViewCard2";
import ViewCard3 from "../components/SecurityComponents/ViewCard3";

import Visitors from "../components/tables/Visitors";
import Emergencies from "../components/tables/Emergencies";
import Incident from "../components/tables/Incident";
import Triggers from "../components/tables/Triggers";
import TriggersSecurity from "../components/tables/TriggersSecurity";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";
import UserProfile from "../components/UserProfile";


/*import Users from "../components/tables/Users";
import Layout from "../components/layout/Layout";
import Header1 from "../components/layout/Header1";
import ProfileMenu from "../components/layout/ProfileMenu";
import Sidebar from "../components/layout/Sidebar";
import SystemPreferences from "../components/SystemPreference";
import SessionManagement from "../components/SessionManagement";
import ExpectedVisitors from "../components/tables/ExpectedVisitors";*/



import AlertCard from "../components/ResidentComponents/AlertCard";
import EmergencyAlert from "../components/ResidentComponents/EmergencyAlert";
import EmergencyContacts from "../components/ResidentComponents/EmergencyContacts";
import ResidentSidebar from "../components/ResidentComponents/ResidentSidebar";
import ResidentHeader from "../components/ResidentComponents/ResidentHeader";
import ResidentLayout from "../components/ResidentComponents/ResidentLayout";
import FireAlertForm from "../components/ResidentComponents/FireAlertForm";
import Security_form from "../components/ResidentComponents/Security_form";
import ReportIncidentCard from "../pages/ResidentPages/ReportIncidentCard";
import UserForm from "../components/forms/form";
// import ReportIncidentCard from "../components/ReportIncidentCard";
// import EmergencyFeedback from "../components/ResidentComponents/EmergencyFeedback";



export const publicRoutes = [
    {path: '/', element: <LandingPage />},
    { path: '/home', element: <Home /> },
    { path: '/intro', element: <Intro /> },
    { path: '/loginform', element: <LoginForm /> },
    { path: '/registrationform', element: <RegistrationForm /> },
    { path: '/forgotpassword', element: <ForgotPassword /> },
    { path: '/forgotpassworderror', element: <ForgotPasswordError /> },
    { path: '/resetemail', element: <ResetEmail /> },
    { path: '/reset-password/:uid/:token/', element: <ResetPassword /> },
    { path: '/guestregsuccess', element: <GuestRegSuccessPage /> },
    { path: '/guestform', element: <GuestRegistrationPage /> },
    { path: '/guestform/:token', element: <GuestRegistrationPage /> },
    { path: '/visitorpage', element: <VisitorPage /> },
    { path: '/verify', element: <Verify /> },
    { path: '/welcomeback', element: <Welcomeback /> },
    { path: '/bye', element: <Bye /> },
    { path: '/error', element: <Error /> },

    // Unsure / public-facing utility or demo routes (move if needed)
    { path: '/navigation', element: <Navigation /> },       
    { path: '/card1', element: <Card1 /> },                 
    { path: '/card2', element: <Card2 /> },                 
    { path: '/card3', element: <Card3 /> },                 
    { path: '/card4', element: <Card4 /> },                 
    { path: '/card6', element: <Card6 /> },                 
    { path: '/chart', element: <Chart /> },                 
    { path: '/chart2', element: <Chart2 /> },               
    { path: '/header', element: <Header /> },               
    { path: '/navbar', element: <Navbar /> },               
    { path: '/dashboardtable', element: <DashboardTable /> }, 
    { path: '/incident', element: <Incident /> },           
    { path: '/report', element: <ReportIncidentCard /> },   
    { path: '/userprofile', element: <UserProfile /> },     
];


export const adminRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/userspage', element: <UsersPage /> },
    { path: '/visitorlogs', element: <VisitorLogs /> },
    { path: '/incident_report', element: <Incident_Reports /> },
    { path: '/settings', element: <Settings /> },
    { path: '/emergencypage', element: <Emergencypage /> },
    { path: '/help', element: <HelpPage /> },
    { path: '/facilityprofile', element: <FacilityProfilePage /> },
    { path: '/userform', element: <UserForm />},
    { path: '/residentregistration', element: <ResidentRegistration />},
     { path: '/securityregistration', element: <SecurityRegistration />},
    


    // Admin-only utilities
    { path: '/visitors', element: <Visitors /> },
    { path: '/emergencies', element: <Emergencies /> },
    { path: '/triggers', element: <Triggers /> },
];


export const securityRoutes = [
    { path: '/security', element: <SecurityOverview /> },
    { path: '/security/dashboard', element: <SecurityDashboard /> },
    { path: '/checkincheckout', element: <CheckinCheckout /> },
    { path: '/view', element: <View /> },
    { path: '/security/emergencypage', element: <EmergencyPageSecurity /> },
    { path: '/security/settings', element: <SecuritySettingPage /> },
    { path: '/visitorregistration', element: <VisitorRegistration /> },
    { path: '/visitorsexpected', element: <VisitorsExpected /> },
    { path: '/checkedoutvisitors', element: <CheckedOutVisitors /> },
    { path: '/security/help', element: <SecurityHelpPage /> },
    { path: '/security/incident', element: <SecurityIncidentPage /> },
    { path: '/triggers/security', element: <TriggersSecurity /> },

    // Security utilities
    { path: '/securitylayout', element: <SecurityLayout /> },
    { path: '/securitysidebar', element: <SecuritySidebar /> },
    { path: '/viewcard1', element: <ViewCard1 /> },
    { path: '/viewcard2', element: <ViewCard2 /> },
    { path: '/viewcard3', element: <ViewCard3 /> },
    { path: '/livelogstable', element: <LiveLogsTable /> },
];


export const tenantRoutes = [
    { path: '/resident/dashboard', element: <ResidentDashboard /> },
    { path: '/resident/settings', element: <ResidentSettings /> },
    { path: '/resident/safetyprotocols', element: <SafetyProtocols /> },
    { path: '/resident/loggeddevices', element: <LoggedDevices /> },
    { path: '/resident/emergencypage', element: <ResidentEmergencypage /> },
    { path: '/resident/visitormanagement', element: <VisitorManagement /> },
    { path: '/resident/guestlist', element: <GuestList /> },
    { path: '/resident/incident', element: <ReportIncidentPage /> },
    { path: '/past', element: <PastReportsPage /> },

    // Resident utilities
    { path: '/resident/alert-card', element: <AlertCard /> },
    { path: '/resident/emergency/alert', element: <EmergencyAlert /> },
    { path: '/resident/emergency/contacts', element: <EmergencyContacts /> },
    { path: '/resident/layout', element: <ResidentLayout /> },
    { path: '/resident/header', element: <ResidentHeader /> },
    { path: '/resident/sidebar', element: <ResidentSidebar /> },
    { path: '/resident/fire-alert', element: <FireAlertForm /> },
    { path: '/resident/security-form', element: <Security_form /> },
    { path: '/CardA', element: <CardA /> },
    { path: '/MyGuestsFrame', element: <MyGuestsFrame /> },
    // { path: '/Edit', element: <Edit /> },
    // { path: '/emergency/feedback', element: <EmergencyFeedback />},
];
