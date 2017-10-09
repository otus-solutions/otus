# Configuração de Ambiente
## Versões de ferramentas necessárias

NodeJS: [v6.6.0](https://nodejs.org/en/download/current/) <br />
Google Chrome : [52 +](https://www.google.com.br/chrome/browser/desktop/) 

## Inicializando Front-End utilizando Browser-Sync
Para desenvolvimento de aplicações front-end, em ambiente de desenvolvimento, é possivel utilizar a ferramenta Browser Sync. Navegue para **otus**, execute :

Para realizar download de dependencias de front-end
> npm install

** Não realize npm prune --production pois a operação utiliza dependencias em escopo de desenvolvimento.**

Inicializando o servidor
> $ npm start

> ou

> $ npm run gulp browser-sync

O serviço de front-end será acessivel através da url: **localhost:3000/otus**

## Inicializando Front-End utilizando SCP
É possivel realizar o "deploy" da aplicação em qualquer tipo de serviço que seja acessivel utilizando SCP.
Navegue para **otus**, execute :

Para realizar download de dependencias de front-end
> npm install

** Não realize npm prune --production pois a operação utiliza dependencias em escopo de desenvolvimento.**

> mvn antrun:run@static-deploy -Dscp.user='USER' -Dscp.host='HOST' -Dscp.target='DIRECTORY_TARGET' -Dscp.password='USER_PASSWORD'

O serviço de front-end será acessivel através da url: **URL_SERVIDOR/otus**

## Contato
Gostaria de saber mais sobre nosso projeto? <br />
Entre em contato conosco. 
Email: contato@otus-solutions.com.br <br />



