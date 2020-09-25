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
