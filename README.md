
# Infraestructura en AWS Esta es una documentación que explica, a grandes rasgos, cómo utilizar el CLI para crear servicios de AWS con el SDK de JavaScript de AWS.
Los servicios que se crean son:

- Para el Front-end, una instancia de EC2 que contiene un Docker ejecutando una imagen de Inflow.
- En el Backend, se crean diferentes instancias de servicios de AWS como S3, Lambda, DynamoDB y API Gateway.

## Variable de entrorno 


`URL`: URL donde se obtendrá el script para la EC2, que instalará Docker.

`TYPEAMI`: Tipo de AMI para EC2.

`TYPEINSTANCE` : Tipo de instancia para EC2.

`NAMEGROUP` : Nombre que se le dará al grupo de seguridad.

OPCIONAL `IP` : IP desde la cual se conectará a la instancia de EC2 con SSH.

`KEY` : Nombre de la llave a usar en la EC2.

`ROLE`: Rol para Lambda.

`TYPEPROTOCOL` : Tipo de protocolo a usar en la API Gateway.

`ROUTEKEY`: Ruta por defecto en la API Gateway.

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
