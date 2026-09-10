# Catálogo de Carros

Projeto acadêmico full stack desenvolvido individualmente durante o 3º semestre. A aplicação tem como objetivo permitir o cadastro de usuários, a autenticação e o gerenciamento de um catálogo de veículos.

## Estado atual

O frontend já permite:

- navegar entre a página inicial, o cadastro de usuário, o login e o catálogo;
- cadastrar usuários e fazer login por e-mail e senha;
- listar veículos com marca, modelo, ano, potência em CV, placa, estado e combustíveis;
- exibir a imagem do veículo ou a indicação “Sem imagem”;
- cadastrar veículos em um formulário recolhível, com imagem opcional;
- selecionar vários tipos de combustível no cadastro;
- visualizar erros de validação, placa duplicada, imagem inválida e falha de conexão;
- acompanhar o envio pelo botão “Registrando...”, desabilitado durante a requisição;
- atualizar a lista automaticamente após um cadastro bem-sucedido, sem recarregar a página.

A API também oferece atualização e exclusão de veículos, ainda sem controles correspondentes no frontend. O banco H2 carrega automaticamente os dados de demonstração definidos em [schema.sql](backend/src/main/resources/schema.sql).

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7, CSS Modules, Fetch API e Oxlint |
| Backend | Java 21, Spring Boot 4.1.1, Spring Web MVC, Spring JDBC e Maven |
| Banco de dados | H2 em memória |
| Infraestrutura | Docker e Docker Compose |

## Estrutura do projeto

```text
catalogo-carros/
├── backend/
│   ├── src/main/java/       # Controllers, services, repositories e modelos
│   ├── src/main/resources/  # Configuração da API e schema.sql
│   ├── src/test/            # Teste de inicialização do Spring
│   └── Dockerfile
├── frontend/
│   ├── src/components/     # Cadastro, listagem de veículos e cabeçalho
│   ├── src/pages/          # Início, login, cadastro de usuário e catálogo
│   ├── src/services/       # Requisições HTTP de autenticação e veículos
│   ├── src/css/            # Estilos com CSS Modules
│   └── Dockerfile
└── compose.yaml            # Serviços e volume de imagens
```

## Como executar com Docker Compose

### Pré-requisitos

- Docker Engine ou Docker Desktop instalado e em execução;
- Docker Compose disponível;
- portas `3000` e `8080` livres.

Não é necessário instalar Java, Maven ou Node.js localmente, pois essas ferramentas são fornecidas pelos containers.

### Iniciar a aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O primeiro build baixa as imagens base, instala as dependências e compila o backend. O container do frontend executa o servidor de desenvolvimento do Vite com `npm run dev`.

Quando os serviços estiverem prontos, acesse:

- [Frontend](http://localhost:3000);
- [Listagem de veículos da API](http://localhost:8080/vehicles).

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

## Como executar localmente

### Pré-requisitos

- JDK 21;
- Node.js 22.12 ou superior, com npm;
- portas `3000` e `8080` livres.

O Maven Wrapper está incluído no backend, dispensando uma instalação global do Maven.

Em um terminal, a partir da raiz do projeto, inicie o backend:

```bash
cd backend
sh ./mvnw spring-boot:run
```

No Windows, dentro da pasta `backend`, use `.\mvnw.cmd spring-boot:run`.

Em outro terminal, também a partir da raiz, inicie o frontend:

```bash
cd frontend
npm ci
npm run dev
```

Os endereços são os mesmos da execução com Docker. Atualmente, os serviços do frontend e as imagens usam `http://localhost:8080` diretamente no código, e o CORS do backend permite a origem `http://localhost:3000`. Para usar outros endereços ou portas, essas configurações precisam ser ajustadas.

## Dados de demonstração

Na inicialização do backend, o [schema.sql](backend/src/main/resources/schema.sql) cria três usuários:

| E-mail | Senha |
| --- | --- |
| `victor@email.com` | `victor123` |
| `jullya@email.com` | `jullya123` |
| `pedro@email.com` | `pedro123` |

O único veículo cadastrado inicialmente é um **Chevrolet Onix 2024**, com potência de **116 CV**, placa **XYZ9X99**, estado **Novo** e combustíveis **Gasolina comum e Etanol**. Ele não possui imagem cadastrada e aparece com a indicação “Sem imagem”.

A tabela de combustíveis contém Gasolina comum, Gasolina aditivada, Gasolina premium, Etanol, Diesel, GNV e Eletrico. O formulário atual ainda não oferece a opção Etanol para novos cadastros.

## API e imagens

URL base: `http://localhost:8080`.

| Método | Rota | Função |
| --- | --- | --- |
| `POST` | `/auth` | Validar e-mail e senha e retornar o usuário |
| `POST` | `/users` | Cadastrar usuário |
| `GET` | `/users` | Listar usuários |
| `GET` | `/users/{id}` | Consultar usuário por ID |
| `PUT` | `/users/{id}` | Atualizar usuário |
| `DELETE` | `/users/{id}` | Remover usuário |
| `GET` | `/vehicles` | Listar veículos |
| `GET` | `/vehicles/{id}` | Consultar veículo por ID |
| `POST` | `/vehicles` | Cadastrar veículo com ou sem imagem |
| `PUT` | `/vehicles/{id}` | Atualizar veículo |
| `DELETE` | `/vehicles/{id}` | Remover veículo |
| `GET` | `/uploads/{arquivo}` | Acessar uma imagem enviada |

O cadastro de veículos usa a mesma rota com dois formatos:

- **Sem imagem:** `application/json`, com os campos `brand`, `model`, `year`, `power`, `plate`, `state` e `fuelTypes`.
- **Com imagem:** `multipart/form-data`, contendo a parte `vehicle` como JSON com tipo `application/json` e a parte `image` com um arquivo. No frontend, o `FormData` reúne as duas partes e o navegador define o cabeçalho multipart com seu separador.

Na API, `brand`, `model`, `year`, `power` e ao menos um item em `fuelTypes` são obrigatórios. A placa, quando informada, deve ter até sete caracteres; o estado, quando informado, deve ser `Novo` ou `Usado`. O formulário exige também placa e estado.

As imagens aceitas são **JPG, PNG e WEBP**, com limite de **5 MB por arquivo** e **6 MB por requisição multipart**. O upload aceita uma imagem por cadastro. O backend gera um nome único para o arquivo e retorna seu caminho no campo `imageUrl`, no formato `/uploads/{arquivo}`. O componente de listagem acrescenta o endereço do backend a esse caminho.

O cadastro retorna `201` em caso de sucesso, `400` para dados ou imagem inválidos e `409` para placa já cadastrada.

## Persistência dos dados

O H2 funciona em memória (`jdbc:h2:mem:testdb`). Ao reiniciar o backend, usuários e veículos criados durante a execução são perdidos, e os dados do `schema.sql` são carregados novamente.

Os arquivos de imagem são armazenados separadamente:

- **Execução local:** na pasta `uploads/vehicles`, relativa ao diretório de execução do backend. Com os comandos acima, ela fica em `backend/uploads/vehicles`.
- **Docker Compose:** no volume nomeado `vehicle_uploads`, montado em `/app/uploads/vehicles`. Esse caminho é configurado pela variável `APP_UPLOAD_DIR`.

Reiniciar o backend não apaga os arquivos de imagem. O volume também é mantido por `docker compose down`. Porém, a permanência dos arquivos não preserva os registros do H2: após reiniciar, os veículos cadastrados e seus vínculos com as imagens precisam ser recriados. Excluir um veículo pela API também não remove seu arquivo de imagem.

## Limitações atuais

- A autenticação é simplificada: não utiliza sessão ou token, e a rota do catálogo e os endpoints não têm controle de acesso.
- As senhas são armazenadas em texto puro. O objeto de usuário retornado pela API é salvo no `localStorage`; o botão “Sair” apenas redireciona para o login.
- O formulário é limpo e recolhido um segundo após o cadastro. A mensagem de sucesso fica dentro dele e aparece ao reabri-lo.
- A edição e a exclusão de veículos estão disponíveis somente pela API.
- O frontend no Docker utiliza o servidor de desenvolvimento do Vite.

## Verificações disponíveis

No diretório `frontend`:

```bash
npm run lint
npm run build
```

O lint utiliza Oxlint, e o build gera os arquivos em `frontend/dist`.

No diretório `backend`:

```bash
sh ./mvnw test
```

No Windows, use `.\mvnw.cmd test`. O teste atual verifica a inicialização do contexto Spring. O Dockerfile do backend empacota a aplicação com os testes desabilitados (`-DskipTests`).
