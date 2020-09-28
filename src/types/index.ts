export interface ArticleAuthor {
  username: string;
  image: string;
}

export interface IArticle {
  author: ArticleAuthor;
  slug: string;
  title: string;
  body: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  favoritesCount: number;
  favorited: boolean;
  tagList: string[];
}

export interface ArticleReducerAction {
  type: string;
  payload: IArticle[];
}

export interface TagsTypes {
  tagList: string[];
}

export interface TagTypesProps {
  value: string;
}

export interface ArticleViewMatchParamsType {
  slug: string;
}

export interface IFormSignUpSubmit {
  username: string;
  email: string;
  password: string;
  'repeat-password': string;
  agree: boolean;
}

export interface IFormSignInSubmit {
  email: string;
  password: string;
}

export interface IFormProfileSubmit {
  username: string;
  email: string;
  password: string;
  url: string;
}

export interface IUserProfile {
  bio: string | null;
  createdAt: string;
  updatesAt: string;
  email: string;
  id: number;
  image: string | null;
  token: string;
  username: string;
}

export interface IUserReducer {
  user: IUserProfile | {};
  isAuthentication: boolean;
  isAuthenticationOkey: boolean;
  isRegisterOkey: boolean;
}

export interface IArticleReducer {
  page: number;
  totalPage: number;
  articles: IArticle[];
  isLoading: boolean;
  tags: string[];
}

export interface IStore {
  user: IUserReducer;
  articles: IArticleReducer;
}

export interface ArticleEditParams {
  slug: string;
}

export interface LikeBtnProps {
  favorited: boolean;
  handleLikeArticle: () => void;
}
