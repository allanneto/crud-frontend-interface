import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/SubmitButton';
import Modal from '../../components/Modal';
import Register from '../../components/Forms/Register';

import * as Styled from './styles';
import api from '../../services/api';
import Logo from '../../assets/Logo.svg';

function Login() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória.'),
  });

  const handleNavigate = async (data) => {
    const response = await api.get('/usuarios');

    const users = response.data;

    const userIndex = users.findIndex((user) => user.email === data.email);

    console.log(userIndex);

    if (userIndex < 0) {
      return setError((current) => !current);
    }

    const user = users[userIndex];

    if (data.password !== user.senha) {
      return setError((current) => !current);
    }

    localStorage.setItem(
      'user',
      JSON.stringify({
        name: user.nome,
        email: user.email,
        token: 'test2sow',
      })
    );

    document.location.reload(true);
  };

  return (
    <>
      <Styled.Container error={error}>
        <img src={Logo} alt="" />
        <Form onSubmit={handleNavigate} schema={schema}>
          <Styled.Label>E-mail</Styled.Label>
          <Input
            data-testid="email-input"
            name="email"
            type="text"
            placeholder="exemplo@email.com"
          />

          <Styled.Label>Senha</Styled.Label>
          <Input
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="Insira a senha"
          />

          <Button text="ENTRAR" />
        </Form>
        <Styled.SignUp
          data-testid="register-input"
          onClick={() => setOpen((current) => !current)}
        >
          Cadastrar agora
        </Styled.SignUp>
      </Styled.Container>
      <Modal open={open} setOpen={setOpen}>
        <Register setOpen={setOpen} />
      </Modal>
    </>
  );
}

export default Login;
