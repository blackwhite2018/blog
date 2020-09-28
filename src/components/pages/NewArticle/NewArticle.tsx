import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchArticalCreate } from '../../../redux/actions';
import { IArticle } from '../../../types';

import { ArticleForm } from '../..';
import './index.css';

const NewArticle: React.FC = () => {
  const history = useHistory();
  const dispatch: Function = useDispatch();
  const token: string = useSelector((state: any) => state.user.user.token);
  const isAuthentication = useSelector<boolean>(
    (state: any) => state.user.isAuthentication
  );
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = (value: IArticle): void => {
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
