import {
  ARTICLE_UPDATE,
  ARTICLE_PAGE,
  ARTICAL_TOTAL_PAGE_UPDATE,
  FETCH_ARTICAL_LOAD,
  ARTICLE_UPDATE_NEW,
  FETCH_ARTICLE_LIKE_FAVORITE_UPDATE,
} from './actionTypes';
import { API_URL, API_REQUIRED_HEADERS } from '../../config';
import { IArticle, ArticleReducerAction } from '../../types';

export const articleLikeFavoriteUpdate = (slug: string, value: boolean) => ({
  type: FETCH_ARTICLE_LIKE_FAVORITE_UPDATE,
  payload: {
    slug,
    value,
  },
});

export const updateArticle = (article: any) => ({
  type: ARTICLE_UPDATE_NEW,
  payload: article,
});

export const articleUpdate = (articles: IArticle[]): ArticleReducerAction => ({
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

export const articlePageUpdate = (page: number) => ({
  type: ARTICLE_PAGE,
  payload: page,
});

export const articleUpdateAsync = (dispatch: Function, page: number): void => {
  fetch(`${API_URL}/articles?limit=20&offset=${page * 20}`)
    .then(response => response.json())
    .then(data => {
      const { articles, articlesCount } = data;
      dispatch(articleTotalPageUpdate(articlesCount));
      dispatch(articleUpdate(articles));
      dispatch(articleLoad(true));
    })
    .catch(console.error);
};

export const fetchArticalUpdate = (
  dispatch: Function,
  slug: string,
  newArtical: any,
  token: string
) => {
  fetch(`${API_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: Object.assign(API_REQUIRED_HEADERS, {
      Authorization: `Token ${token}`,
    }),
    body: JSON.stringify(newArtical),
  })
    .then(response => response.json())
    .then(data => {
      console.log(2, data);
    })
    .catch(console.error);
};

export const fetchArticalCreate = (
  dispatch: Function,
  newArticle: any,
  token: string
) => {
  fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: Object.assign(API_REQUIRED_HEADERS, {
      Authorization: `Token ${token}`,
    }),
    body: JSON.stringify(newArticle),
  })
    .then(response => response.json())
    .then(data => {
      if (data.article) dispatch(updateArticle(data.article));
    })
    .catch(console.error);
};

export const fetchArticalDelete = (
  dispatch: Function,
  slug: string,
  token: string
) => {
  fetch(`${API_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: Object.assign(API_REQUIRED_HEADERS, {
      Authorization: `Token ${token}`,
    }),
  })
    .then(response => response.json())
    .then(data => {
      articleUpdateAsync(dispatch, 0);
    })
    .catch(console.error);
};

export const fetchArticleLike = (
  dispatch: Function,
  slug: string,
  token: string,
  value: boolean
) => {
  fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: value ? 'POST' : 'DELETE',
    headers: Object.assign(API_REQUIRED_HEADERS, {
      Authorization: `Token ${token}`,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.article) dispatch(articleLikeFavoriteUpdate(slug, data.article));
    })
    .catch(console.error);
};
