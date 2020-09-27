import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown/with-html';
import { format } from 'date-fns';
import { Spin, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchArticalDelete } from '../../redux/actions/actions';
import Tags from '../Tags';
import {
  Article as ArticleType,
  ArticleViewMatchParamsType,
} from '../../types';
// @ts-ignore
import likeBtn from './Vector.svg';
import './index.css';

const fetchData = async (url: string): Promise<ArticleType | null> => {
  try {
    const response = await fetch(url);
    const { article } = await response.json();
    return article;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ArticleView: React.FC = () => {
  const [article, setArticle] = useState<ArticleType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug } = useParams<ArticleViewMatchParamsType>();
  const history = useHistory();
  const token = useSelector((state: any) => state.user.user.token);
  const isAuth = useSelector((state: any) => state.user.isAuthentication);
  const authUsername = useSelector((state: any) => state.user.user.username);

  const loadData = async (url: string): Promise<void> => {
    const data: ArticleType | null = await fetchData(url);

    if (data) {
      setArticle(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loadData(`https://conduit.productionready.io/api/articles/${slug}`);
  }, []);

  if (!isLoading) return <Spin indicator={antIcon} />;

  const {
    title,
    favoritesCount,
    tagList,
    description,
    body,
    updatedAt,
    author: { username, image },
  }: any = article;

  function confirm() {
    if (article?.slug) {
      fetchArticalDelete(article.slug, token);
      history.push('/');
    }
  }

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
        <div className="article-info__desc">
          <p className="article-info__text">{description}</p>
        </div>
        <div className="article-info__desc">
          <ReactMarkdown source={body} escapeHtml={false} />
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
        {isAuth && authUsername === username && (
          <>
            <Popconfirm
              title="Are you sure to delete this article?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <input
                type="button"
                value="Delete"
                className="btn btn-article-delete"
              />
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
              <input
                type="button"
                value="Edit"
                className="btn btn-article-edit"
              />
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default ArticleView;
