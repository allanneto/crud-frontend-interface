import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

function AuthLayout({ children }) {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
}

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
