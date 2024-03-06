using Microsoft.AspNetCore.Mvc;
using Teste_WebApi.Application.Services;

namespace Teste_WebApi.Controllers
{


    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {


        [HttpPost]
        public IActionResult Auth( string username , string password)
        {
            if (username == "username_teste" && password == "username_teste@1234") 
            {
                var token = TokenService.GenerateToken(new Domain.Model.Funcionario());
                return Ok(token);

            }

            return BadRequest("User name || Password invalido");
        }
    }
}
