import React, { useState, useEffect } from "react";
import { Https, Login } from "../../Services/Axios";
import "./Table.css";
function TableFuncionario({ token }) {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    if (token) {
      BuscarFuncionarios();
    }
  }, []);

  async function BuscarFuncionarios() {
    try {
      const res = await Https.get("api/funcionarios/todos-os-dados", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFuncionarios(res.data);
    } catch (error) {
      console.error("Erro ao buscar funcionarios:", error);
    }
  }

  return (
    <div className="table-container">
      <h1>Funcionários Completo</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Admissão</th>
            <th>Função</th>
            <th>Salário</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.id}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.sobreNome}</td>
              <td>{funcionario.created}</td>
              <td>{funcionario.funcao}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableFuncionario;
