import React from 'react';
import { render, act, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('App Component', () => {
  it('Find email label', async () => {
    const { getByText, getByTestId } = render(<App />);

    const emailLabel = getByText('E-mail');

    expect(emailLabel).toBeInTheDocument();
  });

  it('Send form without e-mail', async () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('ENTRAR'));

    await actWait();

    const emailError = getByText('O e-mail é obrigatório.');

    expect(emailError).toBeInTheDocument();
  });
});

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/ENTRAR/i);
//   expect(linkElement).toBeInTheDocument();
// });
