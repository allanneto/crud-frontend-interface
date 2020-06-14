import styled, { css } from 'styled-components';
import OrignalInput from '../SimpleInput';

export const Container = styled.div`
  display: flex;
  padding: 20px;

  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;

    label {
      margin: 10px 0 0 0;
    }
  }
`;

export const Title = styled.h2`
  align-self: center;
  margin-bottom: 10px;
`;

export const Input = styled(OrignalInput).attrs((props) => ({
  error: props.error,
}))`
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 4px;

  padding: 10px;
  width: 100%;

  ${(props) =>
    props.error
      ? css`
          border: 1px solid #ff0000;
        `
      : css``}
`;

export const HWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
export const AdrressWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;
