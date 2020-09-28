import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticleLike } from '../../redux/actions';
import { IArticle } from '../../types';
import { Tags, LikeBtn } from '..';
import './index.css';

const Article: React.FC<IArticle> = ({
  slug,
  title,
  description,
  updatedAt,
  favoritesCount,
  tagList,
  favorited,
  author: { username, image },
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorited);
  const token: string = useSelector((state: any) => state.user.user.token);
  const dispatch: Function = useDispatch();

  const handleLikeArticle = () => {
    setIsFavorite(!isFavorite);
    fetchArticleLike(dispatch, slug, token, !isFavorite);
  };

  return (
    <article className="article">
      <div className="article-info">
        <div className="article-info__header">
          <Link to={`articles/${slug}`}>
            <h5 className="article-info__title">{title}</h5>
          </Link>
          <span className="article-info__likes">
            <LikeBtn
              favorited={favorited}
              handleLikeArticle={handleLikeArticle}
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
      <div className="article-container">
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
      </div>
    </article>
  );
};

export default Article;
