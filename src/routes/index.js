import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import Route from './routes';

import Login from '../pages/Login';
import Main from '../pages/Main';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/usuarios" component={Main} isPrivate />
    </Switch>
  );
}

Routes.propTypes = {};
