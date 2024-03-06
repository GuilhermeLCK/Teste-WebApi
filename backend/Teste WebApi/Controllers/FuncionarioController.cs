using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Teste_WebApi.Application.ViewModel;
using Teste_WebApi.Domain.DTOs;
using Teste_WebApi.Domain.Model;

namespace Teste_WebApi.Controllers
{


    [ApiController]
    [Route(("api/funcionarios"))]
    public class FuncionarioController : ControllerBase

    {
        private readonly IFuncionarioRepository _funcionarioRepository;
        private readonly IMapper _mapper;

        public FuncionarioController(IFuncionarioRepository funcionarioRepository, IMapper mapper)
        {
            _funcionarioRepository = funcionarioRepository ?? throw new ArgumentNullException(nameof(funcionarioRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add(FuncionarioViewModel funcionarioView)
        {
            var funcionario = new Funcionario( funcionarioView.nome, funcionarioView.sobrenome, funcionarioView.created, funcionarioView.funcao, funcionarioView.salario, funcionarioView.cpf);

            _funcionarioRepository.AdicionarFuncionario(funcionario);

            return Ok();
        }

        [Authorize]
        [HttpGet]

        public IActionResult Get()
        {

            var funcionarios = _funcionarioRepository.BuscarFuncionarios();
            var funcionariosDTOs = _mapper.Map<List<FuncionarioDTO>>(funcionarios);
            return Ok(funcionariosDTOs);

        }


        [Authorize]
        [HttpGet("todos-os-dados")]
        public IActionResult GetTotal()
        {
            var funcionarios = _funcionarioRepository.BuscarFuncionarios();

            return Ok(funcionarios);
        }

    }
}
