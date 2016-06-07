# Otus #

### Build Back End (maven) ###

> $ cd otus

> $ mvn -f otus-root/pom.xml clean install 

### Deploy Back End (maven) ###
Considerando o Servidor iniciado e build realizado.

> $ cd otus

> $ mvn -f otus-ear/pom.xml wildfly:deploy

## Customizando dados Database (Mongo) ##
Como default os seguintes dados são utilizados para a base de dados:
Nome    : otus
Usuário : otus
Senha   : otus

## Criar base de dados (Mongo)

> use otus <br>
> db.createUser({user:"otus", pwd:"otus", roles:[{role:"dbOwner", db:"otus"}]}) <br>


## Customizar database (Mongo)
Para customizar o sistema para determinada base de dados, os seguintes valores podem
ser utilizados como parametro durante o build:

**HOST** : Endereço database (Ex. localhost)
**PORT** : Porta database (Ex. 27017)
**USER** : Usuário utilizado para administração da base de dados. <br>
       ** Deve estar presente na base de dados otus **

> $ cd otus <br>
> $ mvn -f otus-ear/pom.xml wildfly:deploy -Ddatabase.host=HOST -Ddatabase.port=PORT  
-Ddatabase.username=USER -Ddatabase.password=PWD

**O sistema sempre ira utilizar autenticação. Por default o database mongo não utiliza autenticação.
Certifique-se que esta iniciando o respectivo serviço com --auth**
