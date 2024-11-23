<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



# Descrição do Desafio:
 Desenvolver uma API completa com operações CRUD para atender as rotas necessárias ao projeto front-end, de acordo com o design das telas especificadas no link do figma https://www.figma.com/design/UMOBnSkteDAn3aMdFRwr19/Teste-front-end?node-id=0-1&m=dev&t=bHXjT4ffKx27stgq-1, e implementar o upload de documentos utilizando MinIO.

# Requisitos
## Framework e Bibliotecas

Utilizar NestJS para o desenvolvimento da API.

Implementar o ORM Drizzle para comunicação com o banco de dados.

Utilizar ts-rest para definir e disponibilizar as rotas da API.

# Funcionalidades

Implementar todas as rotas e operações CRUD necessárias para atender as funcionalidades das telas, respeitando as especificações de métodos HTTP (GET, POST, PUT, DELETE) adequadas para cada recurso.

As rotas devem cobrir todos os casos de uso necessários para a interação com os dados da aplicação.

## Testes Unitários

Implementar testes unitários para cada rota e operação da API, garantindo que o código funcione corretamente em diferentes cenários e que erros sejam tratados adequadamente.

Cobrir as principais funcionalidades para assegurar a confiabilidade das operações implementadas.

## Integração e Deploy

 GitHub Actions: Configurar GitHub Actions para rodar os testes automaticamente em cada push e pull request. Utilizar uma imagem Docker para garantir consistência no ambiente de execução.

CI/CD: Configurar integração e deploy contínuos (CI/CD) para o deploy automático da API. Utilizar uma plataforma que suporte CI/CD, de forma que as atualizações aprovadas no repositório GitHub sejam automaticamente publicadas em produção.

Docker: Configurar Docker para que o ambiente seja replicável localmente e durante o CI/CD, garantindo que a API e os testes rodem com consistência.

# Requisitos Adicionais de Upload de Documentos

## Servidor MinIO

Configurar e subir um servidor MinIO em contêiner Docker para simular o armazenamento de arquivos, de uma forma que é possível desligar e ligar a API sem perder os arquivos.

Configurar as credenciais de acesso do MinIO, garantindo compatibilidade com a API da AWS S3.

## Upload de Documentos

Implementar rotas para upload de documentos, utilizando a AWS SDK para integração com o servidor MinIO.

Assegurar que os arquivos sejam salvos de forma segura no MinIO, respeitando boas práticas de armazenamento.

Fornecer feedback ao usuário sobre o status do upload (sucesso ou erro).

## Integração com CI/CD e GitHub Actions

Configurar GitHub Actions para subir o servidor MinIO durante os testes e realizar o upload de documentos como parte dos testes automatizados.

Incluir testes para verificar o upload e recuperação de documentos no MinIO, validando que o processo funcione em todos os ambientes de deploy.

 

## Instruções:
 
```bash
# Preencha o arquivo .env com base no arquivo .example.env contido neste repositorio.

# Faça o build da aplicação com docker:
$ docker compose up --build

# Utilize o arquivo requests.json para ver todas as requisições disponiveis neste projeto
```
