import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { articleUpdateAsync } from '../../redux/actions/actions';

import ArticleList from '../ArticleList';
import './index.css';

const App: React.FC = () => {
  const dispatch = useDispatch<Function>();

  useEffect(() => {
    articleUpdateAsync(dispatch);
  }, [dispatch]);

  return (
    <div className="wrapper">
      <header className="header wrapper__header">
        <h6 className="header__title">Realworld Blog</h6>
        <div className="controls">
          <input
            type="button"
            value="Sign In"
            className="btn btn-signin controls__btn-signin"
          />
          <input type="button" value="Sign Out" className="btn btn-signout" />
        </div>
      </header>
      <Router>
        <Route path="/" component={ArticleList} exact />
        <Route path="/articles" component={ArticleList} />
      </Router>
    </div>
  );
};

export default App;
