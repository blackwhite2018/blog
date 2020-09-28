import {
  ARTICLE_UPDATE,
  ARTICLE_PAGE,
  ARTICAL_TOTAL_PAGE_UPDATE,
  FETCH_ARTICAL_LOAD,
  ARTICLE_UPDATE_NEW,
  ARTICLE_DELETE,
  FETCH_ARTICLE_LIKE_FAVORITE_UPDATE,
} from '../actions/actionTypes';
import { IArticle, IArticleReducer } from '../../types';

const initialState: IArticleReducer = {
  page: 1,
  totalPage: 0,
  articles: [],
  isLoading: false,
  tags: [],
};

const articleReducer = (
  state = initialState,
  { type, payload }: any
): IArticleReducer => {
  const newState: IArticleReducer = { ...state };

  switch (type) {
    case ARTICLE_UPDATE:
      return Object.assign(newState, { articles: payload });
    case ARTICLE_PAGE:
      return Object.assign(newState, { page: payload });
    case ARTICAL_TOTAL_PAGE_UPDATE:
      return Object.assign(newState, { totalPage: payload });
    case FETCH_ARTICAL_LOAD:
      return Object.assign(newState, { isLoading: payload });
    case ARTICLE_UPDATE_NEW:
      return Object.assign(newState, {
        articles: [payload, ...newState.articles],
      });
    case ARTICLE_DELETE:
      return Object.assign(newState, {
        articles: [payload, ...newState.articles],
      });
    case FETCH_ARTICLE_LIKE_FAVORITE_UPDATE:
      const index: number = newState.articles.findIndex(
        (article: any) => article.slug === payload.slug
      );
      if (index !== -1) {
        const newArticles: IArticle[] = [...newState.articles];
        newArticles[index] = payload.value;
        newState.articles = newArticles;
      }
      return newState;
    default:
      return newState;
  }
};

export default articleReducer;
