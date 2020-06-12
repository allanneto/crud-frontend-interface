import React from 'react';
import PropTypes from 'prop-types';
import Login from '../../Login';

import * as Styled from './styles';

function AuthLayout({ children }) {
  return (
    <Styled.Wrapper>
      <Login>{children}</Login>
    </Styled.Wrapper>
  );
}

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
