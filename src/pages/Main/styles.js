import styled, { css } from 'styled-components';
import { FaUserSecret } from 'react-icons/fa';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 100px 200px;

  @media (max-width: 1200px) {
    padding: 50px 100px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  width: 500px;
  max-width: 550px;
  background: ${colors.quaternary};
  border-radius: 8px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

export const Avatar = styled(FaUserSecret)`
  height: 180px;
  width: 180px;

  color: ${colors.baseText};
`;

export const User = styled.div`
  display: flex;
  flex: 1;
  padding: 0 10px 5px 10px;
  flex-direction: column;
  margin: 10px;

  background: ${colors.secondary};

  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
`;

export const HWrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    &:first-child {
      margin-right: 40px;
    }
  }
`;

export const VWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Label = styled.strong`
  margin-top: 8px;
`;

export const Info = styled.span``;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

export const HeadRow = styled.tr`
  margin-top: 20px;

  opacity: 1;

  width: 100%;
  justify-content: space-between;
`;

export const Head = styled.th.attrs({
  scope: 'col',
})`
  font-size: 16px;
  text-align: left;
  padding: 10px;
  background: #fff;

  border-radius: 4px;
  padding-left: 10px;
`;

export const Row = styled.tr.attrs((props) => ({
  selected: props.selected,
  value: props.value,
}))`
  width: 100%;
  height: 40px;

  border: 1px solid #7159c1;
  justify-content: space-between;

  border-radius: 4px;
  background: #fff;
  opacity: 1;

  ${(props) =>
    props.selected === props.value
      ? css`
          border: 2px solid ${colors.quaternary};
        `
      : css`
          border: 1px solid #ddd;
        `}
`;

export const Item = styled.td.attrs({})`
  position: relative;
  text-align: left;

  color: #666666;
  font-size: 16px;
  padding-left: 10px;

  svg {
    cursor: pointer;

    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

export const DeleteBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const DeleteButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;

  align-items: center;

  justify-content: center;

  width: 100px;

  height: 30px;

  margin-top: 5px;

  border: 0;

  background: #de3b3b;

  border-radius: 4px;

  color: #fff;

  font-size: 16px;

  font-weight: bold;

  &:hover {
    background: ${darken(0.1, '#de3b3b')};
  }
`;

export const Title = styled.h3`
  align-self: center;
  margin: 10px 0;
`;
