import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import UsersPage from '../components/Users/UsersPage';
import ReposPage from '../components/Repos/ReposPage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path='/' component={UsersPage} />
        <Route exact path='/repos' component={ReposPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;