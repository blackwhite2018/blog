import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { articlePageUpdate, articleLoad } from '../../redux/actions/actions';

import { Article as ArticleType } from '../../types';
import Article from '../Article';
import './index.css';
import 'antd/dist/antd.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<Function>();
  const articles: ArticleType[] = useSelector(
    (state: any) => state.articles.articles
  );
  const isLoading: boolean = useSelector(
    (state: any) => state.articles.isLoading
  );
  const totalPage: number = useSelector(
    (state: any) => state.articles.totalPage
  );

  const handleChangePagination = (page: number): void => {
    dispatch(articlePageUpdate(page));
    dispatch(articleLoad(false));
  };

  if (articles && isLoading) {
    return (
      <>
        <div className="article-list">
          {articles.map((article: ArticleType) => (
            <Article key={nanoid()} {...article} />
          ))}
        </div>
        <Pagination
          onChange={handleChangePagination}
          size="small"
          showQuickJumper={false}
          total={totalPage}
        />
      </>
    );
  }
  return <Spin indicator={antIcon} />;
};

export default ArticleList;
