import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { user_loading: true };
    case USER_LOGIN_SUCCESS:
      return { user_loading: false, userInfo: action.payload ,user_login_success:true};
    case USER_LOGIN_FAIL:
      return { user_loading: false, user_error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { register_loading: true };
    case USER_REGISTER_SUCCESS:
      return { register_loading: false, register_userInfo: action.payload,user_register_success:true };
    case USER_REGISTER_FAIL:
      return { register_loading: false, register_error: action.payload };
    default:
      return state;
  }
};
