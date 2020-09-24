export interface ArticleAuthor {
  username: string;
  image: string;
}

export interface Article {
  author: ArticleAuthor;
  slug: string;
  title: string;
  body: string;
  createdAt: string;
  updateAt: string;
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
