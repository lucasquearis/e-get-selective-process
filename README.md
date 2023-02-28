# Teste prático desenvolvedor front-end E-Get

Este desafio foi concluído com sucesso, com a criação de uma aplicação web de controle de estoque de produtos que oferece funcionalidades essenciais para gerenciar produtos e auxiliar no controle de vendas. Com a interface intuitiva, amigável e totalmente responsiva, é possível realizar as tarefas facilmente, e o acesso diferenciado para o modo administrador garante a segurança e o controle das informações do sistema.

A aplicação possui as seguintes funcionalidades:

- Adicionar, editar e remover produtos;
- Buscar produtos por nome, id do produto, preço de custo, preço de venda e especificações;
- Acesso exclusivo para o modo administrador, com um painel que apresenta dois gráficos para melhor entendimento das vendas dos produtos.

## Sumário

- [Iniciando a Aplicação](#initApp)
- [Ferramentas Utilizadas](#frameworks)

# <a name="initApp"></a> Iniciando a Aplicação

Para iniciar a aplicação primeiramente clone este repositorio com o seguinte comando e entre na pasta raíz do projeto:

```bash
  git clone git@github.com:lucasquearis/e-get-selective-process.git
  cd e-get-selective-process
```

Após clonar o repositório existem três alternativas para rodar o projeto:

## Docker-compose

<details><summary>CLIQUE AQUI para intruções docker-compose</summary>
<hr>

Apenas utilize o comando a seguir e veja a mágica acontecer 😁

```bash
   docker-compose up -d
```

Acesse o front-end através desse link:
<http://localhost:3000/>

Acesse o back-end através desse link:
<http://localhost:8080/>

</details>

## Docker

<details><summary>CLIQUE AQUI para instruções docker</summary>
<hr>

Estando na pasta raíz do projeto, use os seguintes comandos para entrar no diretório do back-end, montar a imagem docker e subir o container:

```bash
   cd back-end
   yarn docker-image
   yarn docker-container
```

Com o container online você pode acessar a api através desse link:
<http://localhost:8080/>

Agora basta voltar para o diretório raiz e repetir o processo no diretório do front-end:

```bash
   cd ..
   cd front-end
   yarn docker-image
   yarn docker-container
```

Acesse o front-end através desse link:
<http://localhost:3000/>

</details>

## Instalação convencional

<details><summary>CLIQUE AQUI para instruções convencional</summary>
<hr>

Estando na pasta raíz do projeto, use os seguintes comandos para entrar no diretório do back-end, instalar as dependencias e inicia-lo:

```bash
   cd back-end
   yarn
   yarn start
```

Com o back-end online você pode acessar a api através desse link:
<http://localhost:8080/>

Abra outro terminal para subir o front-end, entre no repositório raiz do projeto, instale todas as dependencias e inicie:

```bash
   cd front-end
   yarn
   yarn start
```

Com o back-end iniciado acesse o front-end através desse link:
<http://localhost:3000/>

</details>

# <a name="frameworks"></a> Ferramentas Utilizadas

```json
  "dependencies": {
    "json-server": "0.17.2",
    "@reduxjs/toolkit": "1.9.3",
    "axios": "1.3.4",
    "moment": "2.29.4",
    "react": "18.2.0",
    "react-currency-input-field": "3.6.10",
    "react-dom": "18.2.0",
    "react-input-mask": "2.0.4",
    "react-redux": "8.0.5",
    "react-router-dom": "6.8.1",
    "recharts": "2.4.3",
    "redux-logger": "3.0.6",
    "styled-components": "5.3.6"
  },
  "devDependencies": {
    "@ant-design/icons": "5.0.1",
    "@types/node": "18.14.1",
    "@types/react": "18.0.27",
    "@types/react-dom": "18.0.10",
    "@types/react-input-mask": "3.0.2",
    "@types/react-redux": "7.1.25",
    "@types/react-router-dom": "5.3.3",
    "@types/redux-logger": "3.0.9",
    "@types/styled-components": "5.1.26",
    "@typescript-eslint/eslint-plugin": "5.0.0",
    "@vitejs/plugin-react": "3.1.0",
    "eslint": "8.0.1",
    "eslint-config-standard-with-typescript": "34.0.0",
    "eslint-plugin-import": "2.25.2",
    "eslint-plugin-n": "15.0.0",
    "eslint-plugin-promise": "6.0.0",
    "eslint-plugin-react": "7.32.2",
    "typescript": "*",
    "vite": "4.1.0"
  }
```
