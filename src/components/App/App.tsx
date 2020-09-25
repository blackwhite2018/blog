import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { articleUpdateAsync } from '../../redux/actions/actions';

import ArticleList from '../ArticleList';
import ArticleView from '../ArticleView';
import './index.css';

const App: React.FC = () => {
  const dispatch = useDispatch<Function>();
  const page: number = useSelector((state: any) => state.articles.page);

  useEffect(() => {
    articleUpdateAsync(dispatch, page);
  }, [dispatch, page]);

  return (
    <div className="wrapper">
      <header className="header wrapper__header">
        <a href="/">
          <h6 className="header__title">Realworld Blog</h6>
        </a>
        <div className="controls">
          <input
            type="button"
            value="Sign In"
            className="btn btn-signin controls__btn-signin"
          />
          <input type="button" value="Sign Out" className="btn btn-signout" />
        </div>
      </header>
      <main className="main">
        <Router>
          <Switch>
            <Route path="/" component={ArticleList} exact />
            <Route path="/articles" component={ArticleList} exact />
            <Route path="/articles/:slug" component={ArticleView} />

            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default App;
