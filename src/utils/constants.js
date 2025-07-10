export const API_ENDPOINTS = {
  VISITOR_CHECKIN: '/visits/checkin/',
  VISITOR_CHECKOUT: '/visits/checkout/',
  INVITE_VISITOR: '/visitors/send-invite/',
  REGISTER_VISITOR: '/visitors/register/',
  GET_VISITOR: '/visitors/get_visitor/',
  // VISITOR_DETAILS: '/kiosk/visitor/details/',
  // VISITOR_QR_CODE: '/kiosk/visitor/qrcode/',
  // VISITOR_LIST: '/kiosk/visitor/list/'

  //users
  ADD_USER: '/user/create/',
  ALL_USERS: '/user/all_users/',
  DELETE_USER: '/user/delete/',
  UPDATE_USER: '/user/update/',

}

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://292695e84858.ngrok-free.app'
