import { createInterface} from 'node:readline/promises';
import {readFile} from 'fs/promises';
import {
    Architecture,
 CreateFunctionCommand,
 LambdaClient,
 ListFunctionsCommand,
 PackageType,
 Runtime,
 UpdateFunctionCodeCommand,
}from '@aws-sdk/client-lambda';

/**
 * @constant {LambdaClient} client
 */

const client = new LambdaClient({});
/**
 * create lambdas with code in zip folder 
 * @returns {string}
 */
export async function createLambda(){
    const prompt =  createInterface({
        input : process.stdin,
        output : process.stdout,
    });
    try { 
        let urlPath = await prompt.question("== Ingrese la dirrecion del archivo ==\n"); 

        let description = await prompt.question("\n== Ingrese la descripcion de la funcion ==\n"); 

        let name = await prompt.question("\n== Ingrese el nombre de la funcion ==\n"); 
        prompt.close();

        const code = await readFile(urlPath);


        const client = new LambdaClient({});

        const command = new CreateFunctionCommand({
            Code: {ZipFile:code},
            Description : description,
            FunctionName : name,
            Role:process.env.ROLE ,
            Architectures: [Architecture.x86_64],
            Handler:"index.handler",
            PackageType:PackageType.Zip,
            Runtime: Runtime.nodejs20x,

        });

        const response = await client.send(command);

        
        console.log(`respuestas de la creacion de la funcion lambda ${response.$metadata.httpStatusCode}`);
        return response.FunctionArn;
    } catch (error) {
            
            console.log(`ERROR LAMBDA : ${error.message}`);
    }
}

/**
 * create function to update the code the lambdas 
 * @returns {void}
 */
export async function UpdateCode(){

    try {
        const prompt =  createInterface({
           input : process.stdin,
           output : process.stdout,
       });
   
       let urlPath = await prompt.question("== Ingrese la dirrecion del archivo ==\n");
       prompt.close();
   
       const code = await readFile(urlPath);
   
       let nameFuntion = await listLambda();
   
       const command = new UpdateFunctionCodeCommand({
           ZipFile:code,
           FunctionName :nameFuntion,
           Architectures :[Architecture.x86_64],
           Handler: "index.handler",
           PackageType: PackageType.Zip,
           Runtime: Runtime.nodejs20x,
       });
       const response = await client.send(command);
   
       if (response.$metadata.httpStatusCode == 200){
           console.log("Su condigo se subio con exito");
       }
        
    } catch (error) {
        
        console.log(`ERROR LAMBDA : ${error.message}`);
    }

}

/**
 * Create function for list lambda function
 * @returns {string}
 */
async function listLambda(){

    const command = new ListFunctionsCommand({});
    let nameFuntion = [];

    /**
     * @constant { ListFunctionsCommandOuput} response
     */
        try {
            const response = await client.send(command);

            if (response.$metadata.httpStatusCode == 200){
                response.Functions.map((name)=> {
                    nameFuntion.push(name.FunctionName);
                
                });
                    const prompt =  createInterface({
                        input : process.stdin,
                        output : process.stdout,
                    });

                    console.log("== ingrese el numero de la funcion ==")
                    for (let index = 0; index < nameFuntion.length; index++) {
                        console.log(`${index+1} - ${nameFuntion[index]}`);
                    }   
                    
                    let func = await prompt.question("");
                    prompt.close();
                    let num = parseInt(func);
                return nameFuntion[num-1];
            }
        } catch (error) {
            
            console.log(`ERROR LAMBDA : ${error.message}`);
        }
    
} 
