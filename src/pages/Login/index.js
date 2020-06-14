import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/SubmitButton';
import Modal from '../../components/Modal';
import Register from '../../components/Forms/Register';

import * as Styled from './styles';

import Logo from '../../assets/Logo.svg';

function Login() {
  const [open, setOpen] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória.'),
  });

  const handleNavigate = () => {
    const user = {
      name: 'Allan',
      token: '2sowtoken',
    };

    localStorage.setItem('user', JSON.stringify(user));

    document.location.reload(true);
  };

  return (
    <>
      <Styled.Container>
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
