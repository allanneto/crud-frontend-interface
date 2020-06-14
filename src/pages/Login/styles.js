import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div.attrs((props) => ({
  error: props.error,
}))`
  display: flex;
  padding: 20px;
  flex-direction: column;

  background: #eee;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  max-width: 400px;
  border-radius: 8px;
  border: 1px solid #ccc;

  img {
    max-height: 300px;
  }

  form {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;

    input {
      font-size: 16px;
      border: 1px solid #000;
      border-radius: 4px;

      padding: 5px;
      width: 100%;

      ${(props) =>
        props.error
          ? css`
              border: 1px solid #ff0000;
            `
          : css``}
    }

    span {
      margin-top: 3px;
      color: #e43;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const SignUp = styled.span`
  color: ${colors.tertiary};
  font-weight: bold;
  margin-top: 15px;
  font-size: 18px;

  cursor: pointer;
`;
