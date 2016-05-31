# Otus #

### Build Back End (maven) ###

> $ cd otus

> $ mvn -f otus-root/pom.xml clean install 

### Deploy Back End (maven) ###
Considerando o Servidor iniciado e build realizado.

> $ cd otus

> $ mvn -f otus-ear/pom.xml wildfly:deploy

Customizando dados Database (Mongo):

> $ cd otus

> $ mvn -f otus-ear/pom.xml wildfly:deploy -Ddatabase.host=ENDEREÇO -Ddatabase.port=PORTA  
-Ddatabase.create=TRUE/FALSE

