import {
  FETCH_USER_REGISTER_ERROR,
  FETCH_USER_AUTHENTICATION,
  FETCH_USER_AUTHENTICATION_ERROR,
  FETCH_USER_AUTHORIZED,
  USER_LOGOUT,
} from './actionTypes';
import { API_URL, API_REQUIRED_HEADERS } from '../../config';

export const userAuthenticationSync = (user: any) => ({
  type: FETCH_USER_AUTHENTICATION,
  payload: user,
});

export const userAuthenticationError = (error: any) => ({
  type: FETCH_USER_AUTHENTICATION_ERROR,
  payload: error,
});

export const userRegisterError = (error: any) => ({
  type: FETCH_USER_REGISTER_ERROR,
  payload: error,
});

export const userAuthorized = (authorized: boolean) => ({
  type: FETCH_USER_AUTHORIZED,
  payload: authorized,
});

export const userAuthentication = (dispatch: Function, user: any) => {
  fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: API_REQUIRED_HEADERS,
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(user => {
      if (user.user.token) {
        dispatch(userAuthenticationSync(user));
        dispatch(userAuthenticationError(false));
        dispatch(userAuthorized(true));
        localStorage.setItem(
          'uuid',
          JSON.stringify({ token: user.user.token })
        );
      } else {
        dispatch(userAuthenticationError(true));
      }
    })
    .catch(console.error);
};

export const userRegistration = (dispatch: Function, user: any) => {
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: API_REQUIRED_HEADERS,
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(user => {
      if (user.user.token) {
        dispatch(userRegisterError(false));
      } else {
        dispatch(userRegisterError(true));
      }
    })
    .catch(console.error);
};

export const userLogOut = () => {
  localStorage.removeItem('uuid');
  return {
    type: USER_LOGOUT,
  };
};

export const userUpdateProfile = (
  dispatch: Function,
  userProfile: any,
  token: string
) => {
  fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: Object.assign(API_REQUIRED_HEADERS, {
      Authorization: `Token ${token}`,
    }),
    body: JSON.stringify(userProfile),
  })
    .then(response => response.json())
    .then(user => {
      if (user.user) dispatch(userAuthenticationSync(user));
    })
    .catch(console.error);
};

export const userLogInAuto = (dispatch: Function) => {
  try {
    const uuid: string | null = localStorage.getItem('uuid');

    if (uuid) {
      const { token }: any = JSON.parse(uuid);

      if (token) {
        fetch(`${API_URL}/user`, {
          headers: Object.assign(API_REQUIRED_HEADERS, {
            Authorization: `Token ${token}`,
          }),
        })
          .then(response => response.json())
          .then(user => {
            dispatch(userAuthenticationSync(user));
            dispatch(userAuthorized(true));
          })
          .catch(console.error);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
