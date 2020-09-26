import {
  FETCH_USER_AUTHENTICATION,
  FETCH_USER_AUTHENTICATION_ERROR,
  FETCH_USER_REGISTER_ERROR,
  FETCH_USER_AUTHORIZED,
  USER_LOGOUT,
} from '../actions/actionTypes';

const initialState = {
  user: {},
  isAuthentication: false,
  isAuthenticationOkey: true,
  isRegisterOkey: true,
};

const userReducer = (state = initialState, { type, payload }: any) => {
  const newState = { ...state };

  switch (type) {
    case FETCH_USER_AUTHENTICATION:
      return Object.assign(newState, { user: payload.user });
    case FETCH_USER_AUTHENTICATION_ERROR:
      return Object.assign(newState, { isAuthenticationOkey: false });
    case FETCH_USER_AUTHORIZED:
      return Object.assign(newState, { isAuthentication: payload });
    case FETCH_USER_REGISTER_ERROR:
      return Object.assign(newState, { isRegisterOkey: false });
    case USER_LOGOUT:
      return initialState;
    default:
      return newState;
  }
};

export default userReducer;
