import {
  ARTICLE_UPDATE,
  ARTICLE_PAGE,
  ARTICAL_TOTAL_PAGE_UPDATE,
  FETCH_ARTICAL_LOAD,
} from '../actions/actionTypes';

const initialState: any = {
  page: 0,
  totalPage: 0,
  articles: [],
  isLoading: false,
};

const articleReducer = (state = initialState, { type, payload }: any): any => {
  const newState = { ...state };
  switch (type) {
    case ARTICLE_UPDATE:
      return Object.assign(newState, { articles: payload });
    case ARTICLE_PAGE:
      return Object.assign(newState, { page: payload });
    case ARTICAL_TOTAL_PAGE_UPDATE:
      return Object.assign(newState, { totalPage: payload });
    case FETCH_ARTICAL_LOAD:
      return Object.assign(newState, { isLoading: payload });
    default:
      return newState;
  }
};

export default articleReducer;
