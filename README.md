# Projeto Gestão de Agências

O projeto foi desenvolvido para um processo seletivo de uma vaga Fullstack, com o intuíto de analisar minhas habilidade no desenvolvimento. Existe um arquivo chamado *test.txt* que contém mais informações sobre as informações do teste.

Com esse projeto pude treinar um pouco os meus conhecimentos no desenolvimento, utilizando tudo o que já venho estudando ou que já tenha estudado. 

Realizei da melhor forma que consegui, seguindo tudo o que já foi me ensinado entre cursos, conselhos, dicas e ajuda para entregar o melhor possível. Para muitos pode ser um sistema simples, desorganizado e não bonito, mas para mim é um motivo de orgulho, pois consegui desenvolve-lo, principalmente em ter conseguido construir um context para autencação, sendo duas coisas que ainda hoje fico confuso.   

## Resumo dos objetivos
Codificar um sistema seguindo os melhores padrões que puder, organização, componentização. Com isso, foi necessário conter:

✅ **Autenticação com JWT**

✅ **CRUD** (realizado de agências e usuários)

✅ **Rotas Privadas e Públidas** (sendo públicas somente as rotas de login e cadastro de usuário )

✅ **Listagens de Agências e Usuários**

✅ **Controle de quem pode excluir** (Apenas usuários ADMIN)

## Tecnologias utilizadas
Foram utilizadas as seguintes tecnologias para o desenvolvimento do Frontend:

**Frontend**: Next, TailwindCSS, ShadCN, Zodm Axios, e JWT-Decode.

**Backend**: Express, Cors, Helmel, Zod, Bcrypt, JsonWebToken e Prisma.

**Banco de Dados**: MySQL.

## Instalações e iniciando o projeto

Clone o projeto:
```js
   https://github.com/DouglasSuzukiDS/Management-of-Tourism-Agencies.git
```

Entre na pasta em dois Terminais:
```
   cd Management-of-Tourism-Agencies
```

Em um dos Terminais, entre na pasta Frontend.
```
   cd Frontend
```

No outro Terminal, entre na pasta Backend.
```
   cd Backend
```

Instale as dependências nas pastas do projeto, pasta Frontend e pasta Backend.
```
   yarn | npm install
```
## Banco de Dados
Crie um schema no banco de dados, para o projeto eu criei com o nome ****tourism****.

## Variáveis de Ambiente
Na pasta Backend, há um arquivo chamado *envExample*, renomeie para *.env*. Feito isso faça o preencimento dos dados necessários.
```
PORT="3001" // Escolha a porta acima de 3001 pra cima pois o React/Next roda na porta 3000

NODE_ENV="development"

BASE_URL="http://localhost:3001" 

DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/NOME_DB" // Substitua USER E PASSWORD com seu user e password do MYSQL. O NOME_DB substitua como nome do schema que voce criou seu MySQL

JWT_SECRET="Your Secret Key" // Chave do JWT
```
## Conexão do Prisma com o Banco de Dados
Configurar e sincronizar o Prisma com o BD pode ser chatinho, então recomendo que veja a documentação do **[Prisma](https://www.prisma.io/docs/getting-started/quickstart-sqlite)** para mais detalhes, ou procure pela internet um passo a passo, pois se ele não estiver conectado certinho o Banckend da aplicação não ira funcionar.

Como o projeto já foi iniciado, basta rodar o comando abaixo no terminal (pasta Backend).
```
npx prisma migrate dev
```
##  Iniciado o Servidor
Utiliza o comando abaixo para iniciar o servidor:
```
npm run dev | yarn run dev
```
Caso irá ser mostrando uma mensagem avisando que o servidor foi iniciado. 
É possível tambem testar uma rota teste disponível:
```
localhost:PORT/ping
``` 
Caso se aparecer uma mensagem de **pong**, parabéns o servidor foi configurado certinho.

### Arquivo de rotas já organizadas no Postman
Dentro da pasta data, há dois arquivos, um chamado **Tourism.json** com as rotas já organizadas prontas para serem importadas no Postman (pode não funcionar dependnedo da sua versão do aplicativo*) e um arquivo **Data.ts** com um array de dados fictícios para cadastros de agências.

##  Iniciado o Frontend
Diferente do Back, o Front é mais simples de ser configurado, basta ir no terminal com o projeto e rodar o comando abaixo para iniciar o Frontend:
```
npm run dev | yarn run dev