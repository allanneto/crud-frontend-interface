import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import Register from '../../components/Forms/Register';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('Register component', () => {
  it('should get an error with invalid email', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Register />
    );

    const button = getByTestId('submit-button');

    const emailInput = getByPlaceholderText('exemplo@email.com');

    fireEvent.change(emailInput, { target: { value: 'allan.com' } });

    await actWait();

    fireEvent.click(button);

    await actWait();

    const emailError = getByText('Insira um e-mail válido.');

    expect(emailError).toBeInTheDocument();
  });

  it('should get an error with invalid cpf', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Register />
    );

    const button = getByTestId('submit-button');

    const cpfInput = getByPlaceholderText('000.000.000-00');

    fireEvent.change(cpfInput, { target: { value: 12345315 } });

    await actWait();

    fireEvent.click(button);

    await actWait();

    const cpfError = getByText('CPF no padrão correto');

    expect(cpfError).toBeInTheDocument();
  });

  it('should get an error in password with less than 4 characters', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Register />
    );

    const button = getByTestId('submit-button');

    const passwordInput = getByPlaceholderText('*******');

    fireEvent.change(passwordInput, { target: { value: 'ala' } });

    await actWait();

    fireEvent.click(button);

    await actWait();

    const passwordError = getByText('Min. 4 caracteres');

    expect(passwordError).toBeInTheDocument();
  });

  it('should get an error if street is unfilled', async () => {
    const { getByTestId, getByText } = render(<Register />);

    const button = getByTestId('submit-button');

    fireEvent.click(button);

    await actWait();

    const streetError = getByText('Rua obrigatório!');

    expect(streetError).toBeInTheDocument();
  });
});
