import { ARTICLE_UPDATE } from '../actions/actionTypes';
import { Article, ArticleReducerAction } from '../../types';

const initialState: Article[] = [];

const articleReducer = (
  state = initialState,
  { type, payload }: ArticleReducerAction
): Article[] => {
  switch (type) {
    case ARTICLE_UPDATE:
      return payload;
    default:
      return state;
  }
};

export default articleReducer;
