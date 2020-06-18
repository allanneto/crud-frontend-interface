import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import Update from "../../components/Forms/Update";

import * as Styled from "./styles";
import api from "../../services/api";

function Main() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    nome: "--------",
    cpf: "--------",
    email: "--------",
    endereco: {
      rua: "--------",
      numero: "--------",
      bairro: "--------",
      cidade: "--------",
    },
  });
  const [option, setOption] = useState("");
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [end, setEnd] = useState(20);

  const loadUsers = async () => {
    const response = await api.get(`/usuarios?_start=0&_end=${end}`);

    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = (type) => {
    setOption(type);
    setOpen((current) => !current);
  };

  const handleSelect = (user) => {
    setUser(user);
    setSelected(user.id);
  };

  const handleDelete = async () => {
    await api.delete(`/usuarios/${user.id}`);

    loadUsers();
    setOpen(false);

    return toast.success("Usuario deletado com sucesso!");
  };

  const modalOption = () => {
    if (option === "edit") {
      return <Update setOpen={setOpen} loggedUser={user} />;
    }
    if (option === "delete") {
      return (
        <Styled.DeleteBox>
          <Styled.Title>Confirmar exclusão</Styled.Title>
          <Styled.DeleteButton onClick={handleDelete}>
            EXCLUIR
          </Styled.DeleteButton>
        </Styled.DeleteBox>
      );
    }
  };

  const handleSearch = async () => {
    if (search.length === 0) {
      loadUsers();

      return toast.error("Por favor inserir um nome para efetuar a busca.");
    }

    const response = await api.get(`/usuarios?q=${search}`);

    setUsers(response.data);

    return toast.success("Busca finalizada.");
  };

  const handleScroll = async () => {
    const newStart = end + 1;
    const newEnd = end + 20;

    const response = await api.get(
      `/usuarios?_start=${newStart}&_end=${newEnd}`,
    );

    console.log(response.data);

    setUsers(response.data);
  };

  return (
    <>
      <Styled.Container>
        <Styled.Profile>
          <Styled.Avatar />
          <Styled.User>
            <Styled.HWrapper>
              <Styled.VWrapper>
                <Styled.Label>Nome</Styled.Label>
                <Styled.Info>{user.nome}</Styled.Info>
              </Styled.VWrapper>
              <Styled.VWrapper>
                <Styled.Label>CPF</Styled.Label>
                <Styled.Info>{user.cpf}</Styled.Info>
              </Styled.VWrapper>
            </Styled.HWrapper>
            <Styled.Label>E-mail</Styled.Label>
            <Styled.Info>{user.email}</Styled.Info>
            <Styled.Label>Endereço</Styled.Label>
            <Styled.Info>
              {user.endereco.rua}, {user.endereco.numero} -{" "}
              {user.endereco.bairro}
            </Styled.Info>
            <Styled.Label>Cidade</Styled.Label>
            <Styled.Info>{user.endereco.cidade}</Styled.Info>
          </Styled.User>
        </Styled.Profile>

        <Styled.SearchBar>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <FaSearch onClick={handleSearch} size={20} color="#b61316" />
        </Styled.SearchBar>

        <Styled.Scroll onYReachEnd={handleScroll}>
          <Styled.Table>
            <tbody>
              <Styled.HeadRow>
                <Styled.Head>Nome</Styled.Head>
                <Styled.Head>CPF</Styled.Head>
                <Styled.Head>E-mail</Styled.Head>
                <Styled.Head>Cidade</Styled.Head>
                <Styled.Head>Ações</Styled.Head>
              </Styled.HeadRow>
              {users.length === 0
                ? (
                  <Styled.Row>
                    <Styled.Item />
                    <Styled.Item />
                    <Styled.Item />
                    <Styled.Item />
                    <Styled.Item />
                  </Styled.Row>
                )
                : (
                  users.map((user) => (
                    <Styled.Row
                      value={user.id}
                      selected={selected}
                      onClick={() => handleSelect(user)}
                    >
                      <Styled.Item>{user.nome}</Styled.Item>
                      <Styled.Item>{user.cpf}</Styled.Item>
                      <Styled.Item>{user.email}</Styled.Item>
                      <Styled.Item>{user.endereco.cidade}</Styled.Item>
                      <Styled.Item>
                        <FaEdit
                          onClick={() => handleOpen("edit")}
                          size={15}
                          color="#7159c1"
                        />
                        <FaTrashAlt
                          onClick={() => handleOpen("delete")}
                          size={15}
                          color="#b61316"
                        />
                      </Styled.Item>
                    </Styled.Row>
                  ))
                )}
            </tbody>
          </Styled.Table>
        </Styled.Scroll>
      </Styled.Container>
      <Modal open={open} setOpen={setOpen}>
        <Styled.Content>{modalOption()}</Styled.Content>
      </Modal>
    </>
  );
}

export default Main;
