import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { Article as ArticleType } from '../../types';
import Tags from '../Tags';
import './index.css';
// @ts-ignore
import likeBtn from './Vector.svg';

const Article: React.FC<ArticleType> = ({
  slug,
  title,
  description,
  updatedAt,
  favoritesCount,
  tagList,
  author: { username, image },
}) => {
  return (
    <article className="article">
      <div className="article-info">
        <div className="article-info__header">
          <Link to={`articles/${slug}`}>
            <h5 className="article-info__title">{title}</h5>
          </Link>
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
        <div className="article-info__desc">
          <p className="article-info__text">{description}</p>
        </div>
      </div>
      <div className="article-user">
        <div className="user-info">
          <h6 className="user-info__name">{username}</h6>
          <p className="user-info__update">
            {format(new Date(updatedAt), 'MMMM dd, yyyy')}
          </p>
        </div>
        <div className="article-user__photo">
          <img src={image} alt={username} className="article-user__img" />
        </div>
      </div>
    </article>
  );
};

export default Article;
