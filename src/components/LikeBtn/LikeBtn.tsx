import React from 'react';
import { LikeBtnProps } from '../../types';
// @ts-ignore
import likeBtn from './Vector.svg';
// @ts-ignore
import likeBtnActive from './path4.svg';

const LikeBtn: React.FC<LikeBtnProps> = ({ favorited, handleLikeArticle }) => (
  <img
    src={favorited ? likeBtnActive : likeBtn}
    alt="like btn"
    onClick={handleLikeArticle}
    className="article-info__likes-btn"
  />
);

export default LikeBtn;
