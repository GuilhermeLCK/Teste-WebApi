using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Teste_WebApi.Domain.Model
{
    [Table("Funcionarios")]
    public class Funcionario
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public DateTime  Created { get; set; }
        public string Funcao { get; set; }
        public double Salario { get; set; }
        public string CPF { get; set; }


        public Funcionario()
        {
        }

        public Funcionario(string nome, string sobrenome, DateTime created, string funcao, double salario, string cpf)
        {
            Nome = nome ?? throw new ArgumentNullException(nameof(nome));
            SobreNome = sobrenome;
            Created = created;
            Funcao = funcao;
            Salario = salario;
            CPF = cpf;
        }
    }
}
