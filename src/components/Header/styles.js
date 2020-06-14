import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  height: 80px;
  width: 100vw;
  background: ${colors.secondary};

  padding: 0 200px;

  @media (max-width: 1200px) {
    padding: 0 100px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`;

export const Logo = styled.h1`
  color: ${colors.tertiary};
  font-style: italic;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.strong`
  font-size: 20px;
`;

export const Logout = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #b61316;

  padding-left: 10px;
  margin-left: 10px;

  cursor: pointer;
  border-left: 2px solid #000;
`;
