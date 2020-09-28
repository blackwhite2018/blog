import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { articlePageUpdate, articleLoad } from '../../../redux/actions';

import { IArticle } from '../../../types';
import Article from '../../Article';
import './index.css';
import 'antd/dist/antd.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<Function>();
  const articles: IArticle[] = useSelector(
    (state: any) => state.articles.articles
  );
  const isLoading: boolean = useSelector(
    (state: any) => state.articles.isLoading
  );
  const totalPage: number = useSelector(
    (state: any) => state.articles.totalPage
  );
  const currentPage: number = useSelector((state: any) => state.articles.page);

  const handleChangePagination = (page: number): void => {
    dispatch(articlePageUpdate(page));
    dispatch(articleLoad(false));
  };

  if (articles && isLoading) {
    return (
      <>
        <div className="article-list">
          {articles.map((article: IArticle) => (
            <Article key={nanoid()} {...article} />
          ))}
        </div>
        <Pagination
          onChange={handleChangePagination}
          size="small"
          total={totalPage}
          showSizeChanger
          pageSize={20}
          current={currentPage}
        />
      </>
    );
  }
  return <Spin indicator={antIcon} />;
};

export default ArticleList;
