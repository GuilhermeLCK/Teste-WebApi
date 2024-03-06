# Projeto Web API

Este é um projeto de uma aplicação frontend desenvolvida em React com um backend em C# .NET Core.

## Tecnologias Utilizadas

- React Js
- .NET Core
- Entity Framework
- Banco de dados (ElephantSQL)

## Configuração do Ambiente

### Frontend (React)

1. Navegue até a pasta do frontend:
    ```bash
    cd frontend
    cd app
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o projeto:
    ```bash
    npm run dev
    ```

O projeto vai rodar na porta 5173 (http://localhost:5173).

### Backend (.NET Core)

1. Navegue até a pasta do backend:
    ```bash
    cd backend
    ```

2. Build o projeto:
    ```bash
    dotnet build
    ```

3. Execute o projeto:
    ```bash
    dotnet run
    ```

O projeto vai rodar na porta 7183 (https://localhost:7183).

Para consultar a API via Swagger, é necessário gerar um TOKEN. Preencha o campo "username" e "password", pegue o token gerado e libere as rotas para consulta.

username = username_teste
<br/>
password = username_teste@1234

No frontend, este usuário já está configurado no código, então não é preciso fazer nada.

## Funcionalidades

- Cadastrar funcionário
- Listar funcionário simples (apenas as principais informações)
- Listar funcionário completo (todas as suas informações)
