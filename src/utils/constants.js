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

  // Auth
  LOGIN: '/user/login/',
  CHANGE_PASSWORD: '/user/change_password/',
  LOG_OUT: '/user/delete/{user_id}/',

  // Emergencies
  EMERGENCY_LIST: '/incidence-and-emergency/emergency-list/',
  EMERGENCY_UPDATE: '/incidence-and-emergency/update-emergency/{id}/',

  //Incidence Management
  INCIDENCE_LIST: '/incidence-and-emergency/incidence-list/',
  
  // security registering visitor
  SECURITY_REGISTER_VISITOR: '/visitors/security-check-in/'

  //Security dashboard 
  // CREATE_EMERGENCY: '/incidence-and-emergency/create-emergency/',
  //                  
}

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://292695e84858.ngrok-free.app'
