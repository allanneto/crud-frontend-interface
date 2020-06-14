import React from 'react';

import * as Styled from './styles';

export default function Modal({ children, open, setOpen }) {
  const handleClose = () => {
    setOpen((current) => !current);
  };

  return (
    open && (
      <Styled.Container>
        <Styled.Card>
          {children}
          <Styled.Icon onClick={handleClose} />
        </Styled.Card>
      </Styled.Container>
    )
  );
}
