import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  border: 0;
  border-radius: 4px;
  background: ${lighten(0.1, '#2e282a')};
  margin-top: 20px;

  color: #fad8d6;
  padding: 10px;
  font-size: 16px;

  transition: 600ms;

  &:hover {
    background: #17bebb;
    color: #2e282a;
    font-weight: bold;
  }
`;
