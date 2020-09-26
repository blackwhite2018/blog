export interface ArticleAuthor {
  username: string;
  image: string;
}

export interface Article {
  author: ArticleAuthor;
  slug: string;
  title: string;
  body: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  favoritesCount: number;
  tagList: string[];
}

export interface ArticleReducerAction {
  type: string;
  payload: Article[];
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
