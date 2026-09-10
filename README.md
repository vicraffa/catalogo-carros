# Catálogo de Carros

Projeto acadêmico full stack desenvolvido individualmente durante o 3º semestre. A aplicação tem como objetivo permitir o cadastro de usuários, a autenticação e o gerenciamento de um catálogo de veículos.

## Estado atual

O projeto possui:

- página inicial com navegação para o acesso à aplicação;
- telas de cadastro e login integradas ao backend;
- validação de usuário por e-mail e senha;
- API REST para usuários e veículos;
- cadastro de veículos com marca, modelo, ano, potência, placa, estado e tipos de combustível;
- banco H2 inicializado automaticamente com usuários e veículos de demonstração.

A página visual do catálogo ainda está em desenvolvimento. Atualmente, o frontend conclui o fluxo de cadastro e login e redireciona o usuário para uma tela inicial do catálogo. A API de veículos já disponibiliza operações de consulta, criação, atualização e remoção.

A autenticação atual é simplificada e ainda não utiliza sessão ou token.

## Tecnologias

### Frontend

- React 19;
- Vite 8;
- React Router;
- CSS Modules.

### Backend

- Java 21;
- Spring Boot 4;
- Spring Web MVC;
- Spring JDBC;
- banco H2 em memória;
- Maven.

### Infraestrutura

- Docker;
- Docker Compose.

## Estrutura do projeto

```text
catalogo-carros/
├── backend/       # API Spring Boot
├── frontend/      # Aplicação React
└── compose.yaml   # Orquestração dos containers
```

## Como executar com Docker Compose

### Pré-requisitos

- Docker Desktop instalado e em execução;
- Docker Compose disponível.

Não é necessário instalar Java, Maven ou Node.js localmente, pois essas ferramentas são fornecidas pelos containers.

Para verificar a instalação:

```bash
docker --version
docker compose version
```

### Iniciar a aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O primeiro build pode levar alguns minutos, pois o Docker precisa baixar as imagens base, instalar as dependências e compilar o backend e o frontend.

Quando os serviços estiverem prontos, acesse:

- frontend: http://localhost:3000;
- listagem de veículos da API: http://localhost:8080/vehicles.

Uma conta carregada automaticamente para testar o login é:

```text
E-mail: victor@email.com
Senha: victor123
```

Para executar os containers em segundo plano:

```bash
docker compose up --build -d
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para encerrar a aplicação:

```bash
docker compose down
```

Se sua instalação disponibilizar apenas o comando `docker-compose`, substitua `docker compose` por `docker-compose` nos exemplos acima.

## Persistência dos dados

O banco H2 utilizado atualmente funciona em memória. Por isso, usuários e veículos criados durante a execução são perdidos quando o container do backend é reiniciado. Na próxima inicialização, os dados de demonstração definidos no projeto são carregados novamente.