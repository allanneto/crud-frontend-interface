import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;

  background: #eee;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

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
