import { createInterface} from 'node:readline/promises';
import {readFile} from 'fs/promises';
import {
    Architecture,
 CreateFunctionCommand,
 LambdaClient,
 PackageType,
 Runtime,
}from '@aws-sdk/client-lambda';

// export async function createLambda(){
//     const prompt =  createInterface({
//         input : process.stdin,
//         output : process.stdout,
//     });

//     let urlPath = await prompt.question("== Ingrese la dirrecion del archivo ==\n"); 
//     prompt.close();

//     const code = await readFile(urlPath);


//     const client = new LambdaClient({});

//     const command = new CreateFunctionCommand({
//         Code: {ZipFile:code},
//         FunctionName : "prueba",
//         Role:'arn:aws:iam::365986031118:role/c131905a3346056l7429051t1w36598603111-LambdaSLRRole-OzVWnBliHRXr' ,
//         Architectures: [Architecture.x86_64],
//         Handler:"indec.handler",
//         PackageType:PackageType.Zip,
//         Runtime: Runtime.go1x,

//     });

//     const response = await client.send(command);
    
//     console.log(`respuestas de la creacion de la funcion lambda ${response.$metadata.httpStatusCode}`);
// }

// eliminar lamnda 
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/lambda/actions/delete-function.js#L5


//subier codigo a la lambda 
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/lambda/actions/update-function-code.js