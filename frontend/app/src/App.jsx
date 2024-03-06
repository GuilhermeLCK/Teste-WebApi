import { React, useState, useEffect } from "react";
import TableFuncionario from "./Components/TableFuncionario/TableFuncionario";
import TableFuncionarioCompleto from "./Components/TableFuncionarioCompleto/TableFuncionario";
import { BeatLoader } from "react-spinners";

import { Https, Login } from "./Services/Axios";

import Form from "./Components/Form/Form";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [simples, setSimples] = useState(false);
  const [completo, setCompleto] = useState(false);
  const [form, setForm] = useState(false);

  const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");

  function handleSimples() {
    setCompleto(false);
    setForm(false);
    setSimples(true);
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }

  function handleCompleto() {
    setSimples(false);
    setForm(false);
    setLoad(true);
    setCompleto(true);

    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }
  function handleForm() {
    setSimples(false);
    setCompleto(false);
    setForm(true);
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }

  function handleLimpar() {
    setCompleto(false);
    setSimples(false);
    setForm(false);
  }

  useEffect(() => {
    SolicitarToken();
  }, [token]);

  async function SolicitarToken() {
    try {
      let res = await Https.post(
        `api/auth?username=${Login.username}&password=${Login.password}`
      );

      console.log(res.data);
      setToken(res.data);
    } catch (error) {
      toast.error("Error ao solicitar Token");
      console.error("Erro:", error);
    }
  }

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />

      <div className="container-listapp">
        <button className="button-app" onClick={handleForm}>
          Cadastrar Funcionários (Simples)
        </button>
        <button className="button-app" onClick={handleSimples}>
          Listar Funcionários (Simples)
        </button>
        <button className="button-app" onClick={handleCompleto}>
          Listar Funcionários (Completo)
        </button>
        <button className="button-app" onClick={handleLimpar}>
          Limpar
        </button>
      </div>

      {load ? (
        <BeatLoader color="#0044ff" size={16} />
      ) : (
        <>
          {simples && <TableFuncionario token={token} />}
          {completo && <TableFuncionarioCompleto token={token} />}
          {form && <Form token={token} />}
        </>
      )}
    </div>
  );
}

export default App;
