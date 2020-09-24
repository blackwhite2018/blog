import { ARTICLE_UPDATE } from './actionTypes';
import { Article, ArticleReducerAction } from '../../types';

export const articleUpdate = (articles: Article[]): ArticleReducerAction => ({
  type: ARTICLE_UPDATE,
  payload: articles,
});

export const articleUpdateAsync = (dispatch: any): void => {
  fetch('https://conduit.productionready.io/api/articles?limit=20')
    .then(response => response.json())
    .then(data => {
      const { articles } = data;
      dispatch(articleUpdate(articles));
    })
    .catch(console.error);
};
