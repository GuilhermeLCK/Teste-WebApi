using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;
using Teste_WebApi.Application.Mapping;
using Teste_WebApi.Domain.Model;
using Teste_WebApi.Infra.Repositories;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
 https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IFuncionarioRepository, FuncionarioRepository>();

builder.Services.AddAutoMapper(typeof(DomainToDTOMapping));


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AcessoLiberado", policy =>
    {
        policy.WithOrigins("http://localhost:5173" , "https://localhost:5173" , "http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    });

});


builder.Services.AddSwaggerGen(c =>
{
   

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
    {
        new OpenApiSecurityScheme
        {
        Reference = new OpenApiReference
            {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
            },
            Scheme = "oauth2",
            Name = "Bearer",
            In = ParameterLocation.Header,

        },
        new List<string>()
        }
    });


});




var key = Encoding.ASCII.GetBytes(Teste_WebApi.Key.KeySecret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AcessoLiberado");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
