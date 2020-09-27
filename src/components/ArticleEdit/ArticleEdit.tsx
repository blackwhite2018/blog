import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchArticalUpdate } from '../../redux/actions/actions';

import { ArticleForm } from '..';

const ArticleEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { slug }: any = useParams();
  const token = useSelector((state: any) => state.user.user.token);
  const isAuthentication = useSelector<boolean>(
    (state: any) => state.user.isAuthentication
  );
  const article = useSelector((state: any) =>
    state.articles.articles.find((article: any) => article.slug === slug)
  );
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = (value: any) => {
    const newArticle = {
      article: { ...value },
    };
    newArticle.article.tagList = [...tags];
    fetchArticalUpdate(dispatch, slug, newArticle, token);
    history.push('/');
  };

  if (!isAuthentication) history.push('/log-in');

  return (
    <ArticleForm
      header="Edit article"
      onSubmit={onSubmit}
      setTags={setTags}
      article={article}
    />
  );
};

export default ArticleEdit;
