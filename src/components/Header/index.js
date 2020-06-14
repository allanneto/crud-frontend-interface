import React, { useEffect, useState } from 'react';

import * as Styled from './styles';
import history from '../../services/history';

function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const signedUser = JSON.parse(localStorage.getItem('user'));

    setUser(signedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');

    window.location.reload();
  };

  return (
    <Styled.Container>
      <Styled.Logo>CRUDev</Styled.Logo>
      <Styled.Profile>
        <Styled.Name>{user.name}</Styled.Name>
        <Styled.Logout onClick={handleLogout}>Sair</Styled.Logout>
      </Styled.Profile>
    </Styled.Container>
  );
}

export default Header;
