
# Paschoalotto - Gestão de Clientes

Este projeto foi criado para atender ao desafio de Desenvolvedor Frontend Angular da Paschoalotto.


## Demonstração

Insira um gif ou um link de alguma demonstração


## Funcionalidades

- Listagem de clientes com paginação
- Cadastro e edição
- Visualização de detalhes
- Upload de imagem
- Comunicação com API mockada


## Stack utilizada

**Front-end:** Angular 21, Angular Material, TailwindCSS, Vitest

**Api Mock:** Json Server, Multer (multipart/form-data), Express


## Instalação

Instale as dependências do proejto com bun

```bash
  bun install
```
    
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/JulianePires/paschoalotto-clientes
```

Entre no diretório do projeto

```bash
  cd paschoalotto-clientes
```

Instale as dependências

```bash
  bun install
```

Inicie o servidor

```bash
  bun run server
```

Inicie a aplicação

```bash
  bun run start
```




## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  bun run test
```


## Documentação da API Mockada

#### Retorna todos os clientes com paginação

```http
  GET http://localhost:4000/clientes?page=1&pageSize;=10&query=
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `page`      | `number`   | Página atual.                       |
| `pageSize`  | `number`   | Quantidade de arquivos por página.  |
| `pageSize`  | `number`   | Quantidade de arquivos por página.  |

#### Retorna um cliente

```http
  GET http://localhost:4000/clientes/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `string`   | **Obrigatório**. O ID do item que você quer |

#### Cria um cliente

```http
  POST http://localhost:4000/clientes
```
| Propriedade   | Tipo       | Descrição                             |
| :------------ | :--------- | :------------------------------------ |
| `nome`        | `string`   | **Obrigatório**. Nome do cliente.     |
| `email`       | `string`   | **Obrigatório**. E-mail do cliente.   |
| `telefone`    | `string`   | **Obrigatório**. Telefone do cliente. |
| `cidade`      | `string`   | **Obrigatório**. Cidade do cliente.   |

#### Atualiza um cliente

```http
  PUT http://localhost:4000/clientes/:id
```
| Parâmetro   | Tipo       | Descrição                                             |
| :---------- | :--------- | :---------------------------------------------------- |
| `id`        | `string`   | **Obrigatório**. O ID do item que você quer atualizar |

| Propriedade   | Tipo       | Descrição             |
| :------------ | :--------- | :-------------------- |
| `nome`        | `string`   |  Nome do cliente.     |
| `email`       | `string`   |  E-mail do cliente.   |
| `telefone`    | `string`   |  Telefone do cliente. |
| `cidade`      | `string`   |  Cidade do cliente.   |

#### Realiza upload do logotipo de um cliente

```http
  POST http://localhost:4000/clientes/:id
```

| Parâmetro   | Tipo       | Descrição                                             |
| :---------- | :--------- | :---------------------------------------------------- |
| `id`        | `string`   | **Obrigatório**. O ID do item que você quer atualizar |



#### Exclui um cliente

```http
  PUT http://localhost:4000/clientes/:id
```
| Parâmetro   | Tipo       | Descrição                                           |
| :---------- | :--------- | :-------------------------------------------------- |
| `id`        | `string`   | **Obrigatório**. O ID do item que você quer excluir |

| Propriedade   | Tipo                    | Descrição                           |
| :------------ | :---------------------- | :---------------------------------- |
| `form-data`   | `multipart/form-data`   |  Imagem de logotipo do cliente.     |


## Referência

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Autores

- [@JulianePires](https://www.github.com/JulianePires)

