import React from 'react';

import Header from '../../../components/Header';
import * as Styled from './styles';

function Default({ children }) {
  return (
    <Styled.Container>
      <Header />
      {children}
    </Styled.Container>
  );
}

export default Default;
