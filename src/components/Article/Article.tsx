import React from 'react';
import { Article as ArticleType } from '../../types';
import Tags from '../Tags';
import './index.css';
// @ts-ignore
import likeBtn from './Vector.svg';
// add props slug
const Article: React.FC<ArticleType> = ({
  title,
  body,
  updateAt,
  favoritesCount,
  tagList,
  author: { username, image },
}) => {
  return (
    <article className="article">
      <div className="article-info">
        <div className="article-info__header">
          <h5 className="article-info__title">{title}</h5>
          <span className="article-info__likes">
            <img
              src={likeBtn}
              alt="like btn"
              className="article-info__likes-btn"
            />
            <span className="article-info__likes-count">{favoritesCount}</span>
          </span>
        </div>
        <div className="tags">
          <Tags tagList={tagList} />
        </div>
        <div className="article-info__desc">{body}</div>
      </div>
      <div className="article-user">
        <div className="user-info">
          <h6 className="user-info__name">{username}</h6>
          <p className="user-info__update">{updateAt}</p>
        </div>
        <div className="article-user__photo">
          <img src={image} alt={username} className="article-user__img" />
        </div>
      </div>
    </article>
  );
};

export default Article;
