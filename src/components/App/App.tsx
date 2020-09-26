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
} from '../../redux/actions/actions';

import { ArticleList, ArticleView, SignIn, SignUp, Profile } from '..';
import './index.css';
// @ts-ignore
import userPhotoDefault from './Rectangle 1.svg';

const App: React.FC = () => {
  const dispatch = useDispatch<Function>();
  const page: number = useSelector((state: any) => state.articles.page);
  const isAuthentication = useSelector(
    (state: any) => state.user.isAuthentication
  );
  const user = useSelector((state: any) => state.user.user);

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
            <Route path="/articles" component={ArticleList} exact />
            <Route path="/articles/:slug" component={ArticleView} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/profile" component={Profile} />

            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
