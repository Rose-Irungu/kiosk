export const API_ENDPOINTS = {
  VISITOR_CHECKIN: '/kiosk/visitor/checkin/',
  VISITOR_CHECKOUT: '/kiosk/visitor/checkout/',
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
