import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
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
    const { getByText } = render(<App />);
    const emailLabel = getByText('E-mail');

    expect(emailLabel).toBeInTheDocument();
  });

  it('Send form without e-mail', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('ENTRAR'));

    await actWait();

    const emailError = getByText('O e-mail é obrigatório.');

    expect(emailError).toBeInTheDocument();
  });

  it('Send form with invalid e-mail', async () => {
    const { getByText, getByTestId } = render(<App />);

    const emailInput = getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'allan@allan' } });

    await actWait();

    fireEvent.click(getByText('ENTRAR'));

    await actWait();

    const emailError = getByText('Insira um e-mail válido.');

    expect(emailError).toBeInTheDocument();
  });

  it('Fill e-mail and send form without password', async () => {
    const { getByText, getByTestId } = render(<App />);

    const emailInput = getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'allan@allan.com' } });

    await actWait();

    fireEvent.click(getByText('ENTRAR'));

    await actWait();

    const passwordError = getByText('A senha é obrigatória.');

    expect(passwordError).toBeInTheDocument();
  });

  it('should be able to signup', async () => {
    const { getByTestId, getByLabelText } = render(<App />);

    const signup = getByTestId('register-input');

    fireEvent.click(signup);

    await actWait();

    const cpfField = getByLabelText('CPF');

    expect(cpfField).toBeInTheDocument();
  });
});
