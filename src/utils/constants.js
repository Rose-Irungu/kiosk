export const API_ENDPOINTS = {
  VISITOR_CHECKIN: '/visits/checkin/',
  VISITOR_CHECKOUT: '/visits/checkout/',
  INVITE_VISITOR: '/visitors/send-invite/',
  REGISTER_VISITOR: '/visitors/register/',
  GET_VISITOR: '/visitors/get_visitor/',
  GET_ALL_VISITORS : '/visitors/all-visitors/',
  //  GET_CURRENT_VISITORS: '/visitors/current',
  // GET_ACTIVE_INCIDENTS: '/incidents/active',
  // GET_EMERGENCIES_TODAY: '/emergencies/today',
  // GET_TOTAL_ACTIVE_USERS: '/users/active',
  // GET_LATEST_PANIC_ALERT: '/emergencies/latest-panic',
  // RESOLVE_PANIC_ALERT: '/emergencies/resolve-panic',

  //users
  ADD_USER: '/user/create/',
  ALL_USERS: '/user/all_users/',
  DELETE_USER: '/user/delete/',
  UPDATE_USER: '/user/update/',
  SENT_PASSWORD_RESET: '/user/password-reset/'

  // Auth
  LOGIN: '/auth/login/',

  // Emergencies
  EMERGENCY_LIST: '/incidence-and-emergency/emergency-list/',
  EMERGENCY_UPDATE: '/incidence-and-emergency/update-emergency/{id}/',

}

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://292695e84858.ngrok-free.app'
