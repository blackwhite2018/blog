import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  articleUpdateAsync,
  userLogOut,
  userLogInAuto,
} from '../../../redux/actions';

import {
  ArticleList,
  ArticleView,
  SignIn,
  SignUp,
  Profile,
  NewArticle,
  ArticleEdit,
} from '../..';
import './index.css';
// @ts-ignore
import userPhotoDefault from './Rectangle 1.svg';
import { IUserProfile, IStore } from '../../../types';

const App: React.FC = () => {
  const dispatch: Function = useDispatch();
  const page: number = useSelector((state: any) => state.articles.page);
  const isAuthentication: boolean = useSelector(
    (state: any) => state.user.isAuthentication
  );
  const user: IUserProfile = useSelector((state: any) => state.user.user);

  useEffect(() => {
    userLogInAuto(dispatch);
  }, []);

  useEffect(() => {
    articleUpdateAsync(dispatch, page);
  }, [dispatch, page]);

  const handleClickLogOut = () => {
    dispatch(userLogOut());
  };

  let Controls;

  if (isAuthentication) {
    const { username, image } = user;
    Controls = (
      <>
        <Link to="/new-article">
          <input
            type="button"
            value="Create article"
            className="btn btn-create-article"
          />
        </Link>
        <div className="article-user">
          <div className="user-info">
            <Link to="/profile">
              <h6 className="user-info__name">{username}</h6>
            </Link>
          </div>
          <div className="article-user__photo">
            <Link to="/profile">
              <img
                src={image || userPhotoDefault}
                alt={username}
                className="article-user__img"
              />
            </Link>
          </div>
        </div>
        <input
          type="button"
          onClick={handleClickLogOut}
          value="Log Out"
          className="btn btn-logout"
        />
      </>
    );
  } else {
    Controls = (
      <>
        <Link to="/sign-in">
          <input
            type="button"
            value="Sign In"
            className="btn btn-signin controls__btn-signin"
          />
        </Link>
        <Link to="/sign-up">
          <input type="button" value="Sign Up" className="btn btn-signup" />
        </Link>
      </>
    );
  }

  return (
    <div className="wrapper">
      <Router>
        <header className="header wrapper__header">
          <Link to="/">
            <h6 className="header__title">Realworld Blog</h6>
          </Link>
          <div className="controls">{Controls}</div>
        </header>
        <main className="main">
          <Switch>
            <Route path="/" component={ArticleList} exact />
            <Route path="/articles" exact component={ArticleList} />
            <Route path="/articles/:slug" exact component={ArticleView} />
            <Route path="/articles/:slug/edit" component={ArticleEdit} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/new-article" component={NewArticle} />

            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
