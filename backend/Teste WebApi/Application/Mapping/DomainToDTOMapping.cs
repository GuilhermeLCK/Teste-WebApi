using AutoMapper;
using Teste_WebApi.Domain.DTOs;
using Teste_WebApi.Domain.Model;

namespace Teste_WebApi.Application.Mapping
{
    public class DomainToDTOMapping : Profile
    {



        public DomainToDTOMapping()
        {


            CreateMap<Funcionario, FuncionarioDTO>();     
        }

    }


}
