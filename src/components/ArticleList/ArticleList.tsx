import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { Article as ArticleType } from '../../types';
import Article from '../Article';
import './index.css';

const ArticleList: React.FC = () => {
  const articles = useSelector((state: any) => state.articles);

  return (
    <div className="article-list">
      {articles.map((article: ArticleType) => (
        <Article key={nanoid()} {...article} />
      ))}
    </div>
  );
};

export default ArticleList;
