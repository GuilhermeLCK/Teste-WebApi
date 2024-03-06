import { useRef, useEffect, useState } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Https, Login } from "../../Services/Axios";

const schema = z.object({
  nome: z.string().min(1, "Preencha o campo!"),
  sobrenome: z.string().min(1, "Preencha o campo!"),
  funcao: z.string().min(1, "Preencha o campo!"),
  salario: z.string().min(1, "Preencha o campo!"),
  cpf: z
    .string()
    .min(11, "CPF deve conter exatamente 11 dígitos!")
    .max(11, "CPF deve conter exatamente 11 dígitos!"),
});

function Form({ token }) {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // +1 pois o mês começa em 0
  const dia = String(data.getDate()).padStart(2, "0");
  const hora = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  const segundos = String(data.getSeconds()).padStart(2, "0");
  const milissegundos = String(data.getMilliseconds()).padStart(3, "0");
  const dataAtual = `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}.${milissegundos}Z`;
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function SalvarNovoFuncionario(data) {
    if (token) {
      setLoad(true);
      const EnviarFuncionario = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        created: dataAtual,
        funcao: data.funcao,
        salario: data.salario,
        cpf: data.cpf,
      };

      try {
        const enviar = await Https.post("api/funcionarios", EnviarFuncionario, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Salvo com sucesso");
        setLoad(false);
        reset();
        console.log("Salvo com sucesso");
      } catch (error) {
        console.error("Erro ao buscar:", error);
        setLoad(false);
      }
    } else {
      toast.error("Token inválido || Nulo");
    }
  }

  return (
    <div className="container-form">
      <h1>CADASTRAR FUNCIONÁRIO</h1>

      <form className="form" onSubmit={handleSubmit(SalvarNovoFuncionario)}>
        <input
          type="text"
          placeholder="Digite o nome"
          className={`input ${errors.nome ? "error" : ""}`}
          {...register("nome")}
          id="nome"
        />
        {errors.nome && <p>{errors.nome.message + " [NOME]"}</p>}

        <input
          type="text"
          placeholder="Digite o sobrenome"
          className={`input ${errors.sobrenome ? "error" : ""}`}
          {...register("sobrenome")}
          id="sobrenome"
        />
        {errors.sobrenome && <p>{errors.sobrenome.message + " [SOBRENOME]"}</p>}

        <input
          type="text"
          placeholder="Digite a função"
          className={`input ${errors.funcao ? "error" : ""}`}
          {...register("funcao")}
          id="funcao"
        />
        {errors.funcao && <p>{errors.funcao.message + " [FUNÇÃO]"}</p>}
        <input
          type="number"
          placeholder="Digite o salario"
          className={`input ${errors.salario ? "error" : ""}`}
          {...register("salario")}
          id="salario"
        />
        {errors.salario && <p>{errors.salario.message + " [SALARIO]"}</p>}
        <input
          type="number"
          placeholder="Digite o CPF"
          className={`input ${errors.cpf ? "error" : ""}`}
          {...register("cpf")}
          id="cpf"
        />
        {errors.cpf && <p>{errors.cpf.message + " [CPF]"}</p>}
        <button className="button" type="submit">
          {load ? "Carregando ..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default Form;
