import {
  ARTICLE_UPDATE,
  ARTICLE_PAGE,
  ARTICAL_TOTAL_PAGE_UPDATE,
  FETCH_ARTICAL_LOAD,
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
