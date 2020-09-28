import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown/with-html';
import { format } from 'date-fns';
import { Spin, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchArticalDelete, fetchArticleLike } from '../../../redux/actions';
import { Tags, LikeBtn } from '../..';
import { API_URL } from '../../../config';
import { IArticle, ArticleViewMatchParamsType } from '../../../types';
import './index.css';

const fetchData = async (url: string): Promise<IArticle | null> => {
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

const loadData = async (
  url: string,
  setArticle: Function,
  setIsLoading: Function
): Promise<void> => {
  const data: IArticle | null = await fetchData(url);

  if (data) {
    setArticle(data);
    setIsLoading(true);
  }
};

const ArticleView: React.FC = () => {
  const [article, setArticle] = useState<IArticle>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { slug } = useParams<ArticleViewMatchParamsType>();
  const history = useHistory();
  const dispatch = useDispatch();
  const token: string = useSelector((state: any) => state.user.user.token);
  const isAuth: boolean = useSelector(
    (state: any) => state.user.isAuthentication
  );
  const authUsername: string = useSelector(
    (state: any) => state.user.user.username
  );

  useEffect(() => {
    loadData(`${API_URL}/articles/${slug}`, setArticle, setIsLoading);
  }, []);

  if (!isLoading) return <Spin indicator={antIcon} />;

  const {
    title,
    favoritesCount,
    favorited,
    tagList,
    description,
    body,
    updatedAt,
    author: { username, image },
  }: any = article;

  const handleLikeArticle = (): void => {
    setIsFavorite(!favorited);
    fetchArticleLike(dispatch, slug, token, !favorited);
  };

  const confirm = (): void => {
    if (article?.slug) {
      fetchArticalDelete(dispatch, article.slug, token);
      history.push('/');
    }
  };

  return (
    <article className="article">
      <div className="article-info">
        <div className="article-info__header">
          <h5 className="article-info__title">{title}</h5>
          <span className="article-info__likes">
            <LikeBtn
              favorited={isFavorite}
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
