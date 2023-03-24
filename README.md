<h1 align="center">
    <img src=".github/logo-rocketnotes.svg" title="Rocketnotes" alt="" width="30px" />
    Rocketnotes API
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pabloxt14/Rocketnotes-API">

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/pabloxt14/Rocketnotes-API" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/pabloxt14/Rocketnotes-API">
  
  <a href="https://github.com/pabloxt14/Rocketnotes-API/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/pabloxt14/Rocketnotes-API">
  </a>
    
   <img alt="License" src="https://img.shields.io/github/license/pabloxt14/Rocketnotes-API">

   <a href="https://github.com/pabloxt14/Rocketnotes-API/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/pabloxt14/Rocketnotes-API?style=social">
  </a>
</p>

<h4 align="center"> 
	🚀 Aplicação Finalizada 🚀
</h4>

<p align="center">
 <a href="#-about">About</a> |
 <!-- <a href="#-funcionalidades">Funcionalidades</a> | -->
 <!-- <a href="#-layout">Layout</a> | -->
 <a href="#-deploy">Deploy</a> | 
 <a href="#-how-it-works">How It Works</a> | 
 <a href="#-technologies">Technologies</a> | 
 <!-- <a href="#-contribuidores">Contribuidores</a> |  -->
 <a href="#-author">Author</a> | 
 <a href="#-license">License</a>
</p>


## 💻 About

Este é o repositório do back-end da aplicação Rocketnotes ([link do front-end](https://github.com/PabloXT14/Rocketnotes-Web)), sendo está uma aplicação web na qual os usuários podem se cadastrar e criar de forma organizada anotações sobre determinados assuntos, tendo disponível a adição de titulo, descrição, links e tags para cada nota, além de contar a edição de perfil do usuário, podendo alterar seu avatar, nome, email e senham, entre outras funcionalidades.

Vale ressaltar que este projeto faz parte da trilha/curso **Explorer** oferecida pela [Rocketseat](https://www.rocketseat.com.br/) para quem tiver interesse.

---

<!-- ## ⚙️ Funcionalidades

- [x] Empresas ou entidades podem se cadastrar na plataforma web enviando:
  - [x] uma imagem do ponto de coleta
  - [x] nome da entidade, email e whatsapp
  - [x] e o endereço para que ele possa aparecer no mapa
  - [x] além de selecionar um ou mais ítens de coleta: 
    - lâmpadas
    - pilhas e baterias
    - papéis e papelão
    - resíduos eletrônicos
    - resíduos orgânicos
    - óleo de cozinha

- [x] Os usuários tem acesso ao aplicativo móvel, onde podem:
  - [x] navegar pelo mapa para ver as instituições cadastradas
  - [x] entrar em contato com a entidade através do E-mail ou do WhatsApp

--- -->

<!-- 
## 🎨 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/t5Du3GRsK7AXLcUBDMbiV6/RocketNotes/duplicate). É necessário ter conta no [Figma](https://www.figma.com/) para acessá-lo.
-->

<!-- 
### Web

<p align="center">
  <img alt="Animated Web Demonstration" title="#Web" src=".github/ignite_shop-demonstration_01.gif" width="100%">
</p>
<p align="center">
  <img alt="Animated Web Demonstration" title="#Web" src=".github/ignite_shop-demonstration_02.gif" width="100%">
</p> 
-->

<!-- 
### Mobile

<p align="center">
  <img alt="Layout Mobile Demonstration" title="#Mobile" src=".github/images/mobile-demonstration.png" width="100%">
</p> 

---

-->

## 🔗 Deploy

O acesso ao deploy da API fica disponível através da seguinte URL base: https://rocketnotes-api-epnx.onrender.com

> Obs: a aplicação pode demorar um pouco para entrar na primeira execução depois de um tempo, devido ao back-end estar rodando através do plano gratuito na plataforma de hospedagem.

---

## 🚀 How it works

<!-- 
Este projeto é divido em três partes:
1. Backend (pasta server) 
2. Frontend (pasta web)
3. Mobile (pasta mobile)

💡Tanto o Frontend quanto o Mobile precisam que o Backend esteja sendo executado para funcionar. 
-->

### Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/Rocketnotes-API.git

# Acesse a pasta do projeto no terminal/cmd
$ cd Rocketnotes-API

# Configure as variáveis de ambiente em um arquivo .env na raiz do projeto (use o arquivo .env.example como base)

# Instale as dependências
$ npm install

# Execute as migrations
$ npm run migrate:dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333

# Executar testes (caso queira)
$ npm test
```

### Rotas

| Método | Rota	| Descrição	| Parâmetros | Observação |
| --- | --- | --- | --- | --- |
| POST | /sessions | Retorna os dados de autenticação de um usuário existente | `email`, `password` | enviar parâmetros no `body` | 
| GET	| /users	| Retorna um usuário específico	| `token` |	enviar `token` de autenticação no `header` |
| POST | /users | Cria um novo usuário | `name`, `email`, `password` | enviar parâmetros no `body` da requisição |
| PUT | /users | Atualiza um usuário específico | `token`, `name`, `email`, `password`, `newPassword`(opcional) | enviar `token` pelo `header` e o restante no `body` |
| PATCH | /users/avatar | Atualiza o avatar de um usuário específico | `token`, `avatar` | enviar `token` pelo `header` e o `avatar` no formato `multipart` |
| GET | /notes | Retorna todas as notas de um usuário | `token` | enviar `token` de autenticação no `header` |
| GET | /notes:id | Retorna uma nota específica | `id`, `token` |  enviar `token` pelo `header` e `id` pela rota |
| POST | /notes | Cria uma nota | `title`, `description`, `tags`(array, optional), `links`(array, optional) | enviar `token` pelo `header` e o restante no `body` |
| DELETE | /notes/:id | Deleta uma nota específica | `id`, `token` | enviar `token` pelo `header` e `id` pela rota |
| GET | /tags | Retornas as tags criadas por um usuário | `token` | enviar `token` de autenticação no `header` |
| GET | /files/:filename | Retorna arquivos de avatar | `filename` | enviar `filename` pela rota |

> Obs: todos os parâmetros enviados e respondidos no corpo da requisição e resposta estão no formato `JSON`.

<!--
#### 🧭 Rodando a aplicação web (Frontend)

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/Rocketnotes-Web.git

# Vá para a pasta da aplicação Front End
$ cd Rocketnotes-Web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta em uma porta especificada no terminal de execução
```
-->

<!-- 
#### 📱 Rodando a aplicação mobile (Mobile)

```bash
# Vá para a pasta da aplicação mobile
$ cd mobile

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npx expo start
``` 
-->

---

## 🛠 Technologies

As seguintes ferramentas foram usadas na construção do projeto:

<!--
#### **Website**  ([Vite](https://vitejs.dev/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Styled-Components](https://styled-components.com/)**
-   **[React-Toastify](https://fkhadra.github.io/react-toastify/introduction)**
-   **[React-Query](https://react-query-v3.tanstack.com/)**
-   **[React-Icons](https://react-icons.github.io/react-icons/)**
-   **[React-Loader-Spinner](https://mhnpd.github.io/react-loader-spinner/docs/intro)**
-   **[React-Router-DOM](https://reactrouter.com/en/main/start/tutorial)**

> Veja o arquivo  [package.json](https://github.com/pabloxt14/Rocketnotes-Web/package.json)
-->

#### **Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/pt-br/)**
-   **[Nodemon](https://www.npmjs.com/package/nodemon)**
-   **[Express-Async-Errors](https://www.npmjs.com/package/express-async-errors)**
-   **[Knex](https://knexjs.org/)**
-   **[PostgreSQL](https://node-postgres.com/)**
-   **[SQLite](https://github.com/mapbox/node-sqlite3)**
-   **[CORS](https://www.npmjs.com/package/cors)**
-   **[Dotenv](https://www.npmjs.com/package/dotenv)**
-   **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**
-   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
-   **[Multer](https://www.npmjs.com/package/multer)**
-   **[PM2](https://pm2.keymetrics.io/)**
-   **[Jest](https://jestjs.io/pt-BR/)**

> Veja o arquivo  [package.json](https://github.com/pabloxt14/Rocketnotes-API/package.json)

<!--
#### **Mobile**  ([React Native](http://www.reactnative.com/)  +  [TypeScript](https://www.typescriptlang.org/))
 
-   **[Expo](https://expo.io/)**
-   **[Expo Fonts](https://docs.expo.dev/guides/using-custom-fonts/)**
-   **[Expo Google Fonts](https://github.com/expo/google-fonts)**
-   **[Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)**
-   **[Expo Web Browser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)**
-   **[Native Base](https://nativebase.io/)**
-   **[Phosphor React Native](https://github.com/duongdev/phosphor-react-native)**
-   **[React Navigation](https://reactnavigation.org/)**
-   **[React Native SVG](https://github.com/react-native-community/react-native-svg)**
-   **[React Native Country Flag](https://www.npmjs.com/package/react-native-country-flag)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Country-List](https://www.npmjs.com/package/country-list)**
-   **[DayJS](https://day.js.org/)**
-   **[dotENV](https://www.npmjs.com/package/dotenv)**

> Veja o arquivo  [package.json](https://github.com/pabloxt14/NLW-Copa/mobile/package.json)
-->

---

<!-- 
## 👨‍💻 Contribuidores

💜 Um super thanks 👏 para essa galera que fez esse produto sair do campo da ideia e entrar nas lojas de aplicativos :)

<table>
  <tr>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4" width="100px;" alt=""/><br /><sub><b>Diego Fernandes</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">👨‍🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/4669899?s=460&u=806503605676192b5d0c363e4490e13d8127ed64&v=4" width="100px;" alt=""/><br /><sub><b>Cleiton Souza</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">👨‍🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/861751?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Robson Marques</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">👨‍🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/16831337?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Claudio Orlandi</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/37725197?s=460&u=446439436524c37f66e41f35b607dbb70358d5e4&v=4" width="100px;" alt=""/><br /><sub><b>Vinícios Fraga</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/26551306?s=460&u=18446655ccae6c2a29eb177a104ecf32f029aa3a&v=4" width="100px;" alt=""/><br /><sub><b>Hugo Duarte</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a>  <a href="https://blog.rocketseat.com.br/" title="Blog">🌐</a></td>
    
  </tr>
  <tr>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/39345247?s=460&u=cdff2624a327a43e2765112a54e966a06eac6d79&v=4" width="100px;" alt=""/><br /><sub><b>Joseph Oliveira</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/10366880?s=460&u=59e93e1752e9d2ece4b7d8e129d60caba9c94207&v=4" width="100px;" alt=""/><br /><sub><b>Guilherme Rodz</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4" width="100px;" alt=""/><br /><sub><b>Mayk Brito</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/7268910?s=460&u=0b5d9df4232e70fa66ea9f130fad4260378323de&v=4" width="100px;" alt=""/><br /><sub><b>João Paulo</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/14251143?s=460&u=340ed1d854bbacc22b9a3210a18a1f589a28bc40&v=4" width="100px;" alt=""/><br /><sub><b>Luke Morales</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
     <td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/5151405?s=460&u=1dbcf0e89087c2dc902d3331b90e532db1543d2b&v=4" width="100px;" alt=""/><br /><sub><b>Luiz Batanero</b></sub></a><br /><a href="https://rocketseat.com.br/" title="Rocketseat">🚀</a></td>
    
  </tr>
</table> 
-->

<!-- 
## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

--- 
-->

## ✍ Author

<a href="https://github.com/PabloXT14">
 <img alt="PabloXT14" title="PabloXT14" src="https://github.com/PabloXT14.png" width="100px" />
 <br />
 <sub><strong>Pablo Alan</strong> 🚀</sub>
</a>

<br />

[![Linkedin Badge](https://img.shields.io/badge/-Pablo_Alan-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pabloalan/)](https://www.linkedin.com/in/pabloalan/) 
[![Gmail Badge](https://img.shields.io/badge/-pabloxt14@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:pabloxt14@gmail.com)](mailto:pabloxt14@gmail.com)

---

## 📝 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações

Feito com 💜 por Pablo Alan 👋🏽 [Entre em contato!](https://www.linkedin.com/in/pabloalan/)
