/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../pages/_layouts/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const Layout = AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
