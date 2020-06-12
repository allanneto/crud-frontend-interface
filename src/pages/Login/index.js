import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Button from '../../components/SubmitButton';
import * as Styled from './styles';
import Logo from '../../assets/Logo.svg';

function Login() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória.'),
  });

  return (
    <Styled.Container>
      <img src={Logo} alt="" />
      <Form onSubmit="" schema={schema}>
        <Styled.Label>E-mail</Styled.Label>
        <Input name="email" type="text" placeholder="exemplo@email.com" />

        <Styled.Label>Senha</Styled.Label>
        <Input name="password" type="password" placeholder="Insira a senha" />

        <Button text="ENTRAR" />
      </Form>
    </Styled.Container>
  );
}

export default Login;
