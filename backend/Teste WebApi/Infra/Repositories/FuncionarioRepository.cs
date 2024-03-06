using Microsoft.AspNetCore.Http.HttpResults;
using System;
using Teste_WebApi.Domain.DTOs;
using Teste_WebApi.Domain.Model;

namespace Teste_WebApi.Infra.Repositories
{
    public class FuncionarioRepository : IFuncionarioRepository
    {

        private readonly ConnectionContext _context = new ConnectionContext();
        public void AdicionarFuncionario(Funcionario funcionario)
        {
            try
            {
                _context.Funcionarios.Add(funcionario);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
              
                Console.WriteLine($"Erro ao adicionar funcionário: {ex.Message}");

                throw new Exception("Erro ao adicionar funcionário.");
            }
        }

        public List<Funcionario> BuscarFuncionarios()
        {
            return _context.Funcionarios.ToList();
        }
       
    }
}
