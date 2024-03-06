using Teste_WebApi.Domain.DTOs;

namespace Teste_WebApi.Domain.Model
{
    public interface IFuncionarioRepository
    {



        void AdicionarFuncionario(Funcionario funcionario);

        List<Funcionario> BuscarFuncionarios();
    }
}
