import {
  ARTICLE_UPDATE,
  ARTICLE_PAGE,
  ARTICAL_TOTAL_PAGE_UPDATE,
  FETCH_ARTICAL_LOAD,
  ARTICLE_UPDATE_NEW,
  ARTICLE_DELETE,
} from '../actions/actionTypes';

const initialState: any = {
  page: 0,
  totalPage: 0,
  articles: [],
  isLoading: false,
  tags: [],
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
    case ARTICLE_UPDATE_NEW:
      return Object.assign(newState, {
        articles: [payload, ...newState.articles],
      });
    case ARTICLE_DELETE:
      return Object.assign(newState, {
        articles: [payload, ...newState.articles],
      });
    // case FETCH_TAGS_LOAD:
    //   return Object.assign(newState, { tags: payload });
    default:
      return newState;
  }
};

export default articleReducer;
