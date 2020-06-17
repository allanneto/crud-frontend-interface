import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import * as Styled from './styles';
import api from '../../../services/api';

import formatCep from '../../../util/cepMask';
import formatCpf from '../../../util/cpfMask';

import SubmitButton from '../../SubmitButton';

function Update({ setOpen, loggedUser }) {
  const [address, setAddress] = useState([]);
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [unique, setUnique] = useState(true);
  const [error, setError] = useState([
    {
      name: false,
      email: false,
      password: false,
      cep: false,
      number: false,
      street: false,
    },
  ]);

  const formRef = useRef(null);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório!'),
    email: Yup.string()
      .email('Insira um e-mail válido.')
      .required('Email obrigatório!'),
    password: Yup.string()
      .min(4, 'Min. 4 caracteres')
      .required('Senha obrigatório!'),
    cpf: Yup.string()
      .min(14, 'CPF no padrão correto ')
      .required('CPF obrigatório!'),
    cep: Yup.string().required('CEP obrigatório!'),
    number: Yup.string().required('Número obrigatório!'),
    street: Yup.string().required('Rua obrigatório!'),
  });

  const handleGetCep = async (value) => {
    setError({ cep: false });
    setUnique(true);

    const getCep = value;

    setCep(formatCep(getCep));

    if (getCep.length === 9) {
      const response = await axios.get(
        `http://viacep.com.br/ws/${getCep}/json/`
      );

      const { data } = response;

      if (data.erro) {
        return setError({ cep: true });
      }

      setAddress({
        ...address,
        number: '',
        street: data.logradouro,
        city: data.localidade,
        district: data.bairro,
        postal_code: getCep,
        formattedCep: cep,
      });

      console.log('Alo');
      if (!data.logradouro) {
        setUnique(false);
        setError({
          street: true,
        });
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = {
        nome: data.name,
        email: data.email,
        cpf: data.cpf,
        senha: data.password,
        endereco: {
          cep: address.postal_code,
          rua: address.street,
          numero: data.number,
          bairro: address.district,
          cidade: address.city,
        },
      };

      await api.post(`/usuarios/${user.id}`, user);

      setOpen((current) => !current);
      return toast.success('Usuário criado com sucesso!');
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }

      setError({
        name: validationErrors.name,
        email: validationErrors.email,
        cep: validationErrors.cep,
        cpf: validationErrors.cpf,
        password: validationErrors.password,
        street: validationErrors.street,
        number: validationErrors.number,
        district: validationErrors.district,
        city: validationErrors.city,
      });
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>Atualizar Dados</Styled.Title>
      <Form ref={formRef} onSubmit={handleSubmit} schema={schema}>
        <Styled.HWrapper>
          <Styled.Input
            label="Nome"
            name="name"
            type="text"
            placeholder={loggedUser.nome}
            error={error.name}
          />
          <Styled.Input
            label="CPF"
            name="cpf"
            maxLength="14"
            type="text"
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            placeholder={loggedUser.cpf}
            value={cpf}
            error={error.cpf}
          />

          <Styled.Input
            label="E-mail"
            name="email"
            type="text"
            placeholder={loggedUser.email}
            error={error.email}
          />
          <Styled.Input
            label="Senha"
            name="password"
            type="password"
            placeholder="*******"
            error={error.password}
            defaultValue={loggedUser.senha}
          />
        </Styled.HWrapper>
        <Styled.AdrressWrapper>
          <Styled.Input
            label="CEP"
            name="cep"
            maxLength="9"
            type="text/number"
            placeholder={loggedUser.endereco.cep}
            error={error.cep}
            onChange={(e) => handleGetCep(e.target.value)}
          />
          <Styled.Input
            label="Rua"
            name="street"
            type="text"
            placeholder={loggedUser.endereco.rua}
            error={error.street}
            onChange={(e) =>
              setError({ street: false }) &&
              setAddress({ street: e.target.value })
            }
          />
          <Styled.Input
            label="Número"
            name="number"
            type="text"
            placeholder={loggedUser.endereco.numero}
            onChange={(e) =>
              setError({ number: false }) &&
              setAddress({ number: e.target.value })
            }
            error={error.number}
          />
        </Styled.AdrressWrapper>

        <Styled.HWrapper>
          <Styled.Input
            label="Bairro"
            name="district"
            type="text"
            placeholder={loggedUser.endereco.bairro}
            disabled
            value={address.district}
          />

          <Styled.Input
            label="Cidade"
            name="city"
            type="text"
            placeholder={loggedUser.endereco.cidade}
            value={address.city}
            disabled
          />
        </Styled.HWrapper>

        <SubmitButton text="Salvar Dados" type="submit" />
      </Form>
    </Styled.Container>
  );
}

export default Update;

Update.propTypes = {
  setOpen: PropTypes.func,
};
