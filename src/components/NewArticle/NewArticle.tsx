import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchArticalCreate } from '../../redux/actions/actions';

import { ArticleForm } from '..';
import './index.css';

const NewArticle: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.user.token);
  const isAuthentication = useSelector<boolean>(
    (state: any) => state.user.isAuthentication
  );
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = (value: any) => {
    const newArticle = {
      article: { ...value },
    };
    newArticle.article.tagList = [...tags];
    fetchArticalCreate(dispatch, newArticle, token);
    history.push('/');
  };

  if (!isAuthentication) history.push('/log-in');

  return (
    <ArticleForm
      onSubmit={onSubmit}
      setTags={setTags}
      header="Create new article"
      article={{
        title: '',
        description: '',
        body: '',
        tags,
      }}
    />
  );
};

export default NewArticle;
