import ResidentDashboard from "../pages/ResidentPages/ResidentDashboard"

export const API_ENDPOINTS = {
  VISITOR_CHECKIN: '/visits/checkin/',
  VISITOR_CHECKOUT: '/visits/checkout/',
  INVITE_VISITOR: '/visitors/send-invite/',
  REGISTER_VISITOR: '/visitors/register/',
  MOST_VISITED_UNITS: '/visits/most-visited-units/',
  GET_VISITOR: '/visitors/get_visitor/',
  GET_ALL_VISITORS : '/visitors/all-visitors/',
  DASHBOARD_STATISTICS: '/statistics/active-users/count/',

 
  //users
  ADD_USER: '/user/create/',
  ALL_USERS: '/user/all_users/',
  DELETE_USER: '/user/delete/',
  UPDATE_USER: '/user/update/',
  SENT_PASSWORD_RESET: '/user/password-reset/',
  GET_UNITS: '/visitors/units/',

  // Auth
  LOGIN: '/user/login/',
  CHANGE_PASSWORD: '/user/change_password/',
  LOG_OUT: '/user/device-management/',

  // Emergencies
  EMERGENCY_LIST: '/incidence-and-emergency/emergency-list/',
  EMERGENCY_UPDATE: '/incidence-and-emergency/update-emergency/{id}/',

  //Incidence Management
  INCIDENCE_LIST: '/incidence-and-emergency/incidence-list/',
  RESIDENT_LIST: '/user/logs/',
  TAKE_EMERGENCY_ROLL_CALL: '/incidence-and-emergency/take-emergency-rollcall/',
  SECURITY_INCIDENCE: '/incidence-and-emergency/view-my-incidence/',
  // security registering visitor
  SECURITY_REGISTER_VISITOR: '/visitors/security-check-in/',
  VISIT_LOGS: '/visits/visit-logs/',
  VISITS_USER: '/visits/visits-user/',
  APPROVE_VISITOR: '/visitors/approve-visitor/',
  BLACKLIST_VISITOR: '/visitors/blacklist/',
  UN_BLACKLIST_VISITOR: '/visitors/unblacklist/',


  //Security dashboard 
  CREATE_EMERGENCY: '/incidence-and-emergency/create-emergency/',
  CREATE_INCIDENCE: '/incidence-and-emergency/create-incidence/',
  STATISTICS: '/statistics/active-users/count/',

  //Check Out Visitors Table
  GET_CHECKOUT_VISITORS: '/statistics/security/dashboard/',

  //Resident dashboard
  ALL_VISITORS: '/visits/visits-user/',

 // Resident Blacklisted peeps
  BLACKLIST_PEEPS: '/visitors/all-blacklisted/',
  Resident_Incidence: '/incidence-and-emergency/view-my-incidence/',

}

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://292695e84858.ngrok-free.app'
