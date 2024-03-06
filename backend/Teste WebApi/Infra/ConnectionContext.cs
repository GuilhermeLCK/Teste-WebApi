using Microsoft.EntityFrameworkCore;
using Teste_WebApi.Domain.Model;


namespace Teste_WebApi.Infra
{
    public class ConnectionContext : DbContext
    {

        public DbSet<Funcionario> Funcionarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Server=motty.db.elephantsql.com;Port=5432;Database=qctnshtu;User Id=qctnshtu;Password=egs9pITZhUQmmHJmxZ9mTTI2V1nLE--W\r\n");
        }


    }
}