import React, { useState, useEffect } from "react";
import { Https, Login } from "../../Services/Axios";
function TableFuncionario({ token }) {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    if (token) {
      BuscarFuncionarios();
    }
  }, []);

  async function BuscarFuncionarios() {
    try {
      const res = await Https.get("api/funcionarios", {
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
      <h1>Funcionários Simples</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Função</th>
            <th>Salário</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.sobreNome}</td>
              <td>{funcionario.funcao}</td>
              <td>{funcionario.salario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableFuncionario;
