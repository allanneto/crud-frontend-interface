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

  it('Form submission with all fields filled should redirect to users', async () => {
    const { getByText, getByTestId } = render(<App />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'allan@allan.com' } });
    fireEvent.change(passwordInput, { target: { value: 'allan' } });

    await actWait();

    fireEvent.click(getByText('ENTRAR'));

    await actWait();

    const redirectText = getByText('CHEGOU HEIN');

    expect(redirectText).toBeInTheDocument();
  });
});
