import {
  ARTICLE_UPDATE,
  ARTICLE_PAGE,
  ARTICAL_TOTAL_PAGE_UPDATE,
  FETCH_ARTICAL_LOAD,
  FETCH_USER_REGISTER_ERROR,
  FETCH_USER_AUTHENTICATION,
  FETCH_USER_AUTHENTICATION_ERROR,
  FETCH_USER_AUTHORIZED,
  USER_LOGOUT,
} from './actionTypes';
import { Article, ArticleReducerAction } from '../../types';

export const articleUpdate = (articles: Article[]): ArticleReducerAction => ({
  type: ARTICLE_UPDATE,
  payload: articles,
});

export const articleTotalPageUpdate = (page: number) => ({
  type: ARTICAL_TOTAL_PAGE_UPDATE,
  payload: page,
});

export const articleLoad = (isLoading: boolean) => ({
  type: FETCH_ARTICAL_LOAD,
  payload: isLoading,
});

export const articleUpdateAsync = (dispatch: any, page: number): void => {
  fetch(
    `https://conduit.productionready.io/api/articles?limit=20&offset=${
      page * 20
    }`
  )
    .then(response => response.json())
    .then(data => {
      const { articles, articlesCount } = data;
      dispatch(articleTotalPageUpdate(articlesCount));
      dispatch(articleUpdate(articles));
      dispatch(articleLoad(true));
    })
    .catch(console.error);
};

export const articlePageUpdate = (page: number) => ({
  type: ARTICLE_PAGE,
  payload: page,
});

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
  fetch('https://conduit.productionready.io/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
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
  fetch('https://conduit.productionready.io/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
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
  fetch('https://conduit.productionready.io/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(userProfile),
  })
    .then(response => response.json())
    .then(user => {
      dispatch(userAuthenticationSync(user));
    })
    .catch(console.error);
};

export const userLogInAuto = (dispatch: Function) => {
  try {
    const uuid: string | null = localStorage.getItem('uuid');

    if (uuid) {
      const { token }: any = JSON.parse(uuid);

      if (token) {
        fetch('https://conduit.productionready.io/api/user', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Token ${token}`,
          },
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
