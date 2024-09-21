
# Infraestructura en AWS 
esta es una documentacion que explica a grandes rasgos como utilizar el cli para crear servicios de aws con el sdk de javaScript de aws  .
## Variable de entrorno 


`URL` donde se obtendra el script para la ec2 , el cual instala docker 

`TYPEAMI` tipo de AMI de ec2

`TYPEINSTANCE` tipo de instacia para ec2

`NAMEGROUP` nombre que se le dara el grupo de seguridad

OPCIONAL `IP` donde se conectara a la instacia de ec2 con ssh 

`KEY`   Nombre de llave a usar en la ec2

`ROLE` Rol para lambda

`TYPEPROTOCOL` tipo de protocolo a usar en la APIGETWAY

`ROUTEKEY` ruta por defecto en la APIGETWAY

## Correr el proyecto 

Verificacion de AWS cli

```bash
aws --version
```
Verificacion de Node js 

```bash
node --version
```

Verificacion de  git 

```bash
git version 
```

Clonarse el repositorio

```bash
git clone https://github.com/Joskeiner/infraestructura_in_flow.git
```

instalar dependecias 

```bash
cd infraestructura_in_flow/node/ && \
npm i
```

Correr el proyecto

```bash
node index.js
```
## Documentacion referente al projecto 


[Docuemtacion de sdk de aws](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/apigatewayv2/)

[Ejemplos de levantar servicios con sdk de javascript](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code)

[node js ](https://nodejs.org/en/learn/command-line)
