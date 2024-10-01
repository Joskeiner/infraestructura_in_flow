import { createBucket  , DeleteBucket} from "../../back-end/service/s3.js";
import { createInterface} from 'node:readline/promises';
import {createTableDynamo , deleteTableDynamo} from "../../back-end/service/dynamoDb.js";
import { createLambda, UpdateCode } from "../../back-end/service/lambda.js";
import { CreateApi } from "../../back-end/service/apiGetway.js";
// import {  } from "./service/lambda.js";
/**
 * esta funcion  manejara las rutas para cada servicio
 * @param {number} choiceNumber 
 */
export async function Router() {
    let choiceNumber = await present();
  switch(choiceNumber) {
        case  1 :
                  const promptBucket = createInterface({
                                input: process.stdin,
                                output:process.stdout,
                            });
            const name  = await promptBucket.question(`\t Ingrese el nombre del Bucket \n`);

            promptBucket.close();

            name.trim();

            await createBucket(name);

            process.exit(0)
        case 2 : 
            await DeleteBucket();

            process.exit(0)
        case 3 :
            await createTableDynamo();
            process.exit(0)
        case 4 : 
            await deleteTableDynamo();
            process.exit(0);
        case 5:
            await createLambda();
            process.exit(0);
        case 6:
            await UpdateCode();
            process.exit(0);
        case 7 :
            let response = await createLambda();
            await CreateApi(response);
        default:
            break;
    }
  

}

async function present() {
        const prompt = createInterface({
        input: process.stdin,
        output:process.stdout,
    });    
    const choice = await prompt.question(`\t ##### Elija una de las opciones ##### 

        1 - crear bucket
        2 - eliminar bucket
        3 - crear tabla
        4 - eliminar tabla 
        5 - crear lambda
        6 - subir el codigo 
        7 - crear lambda y apiGetway 
        \n
        `);
        prompt.close();
    let choiceNumber = parseInt(choice);
    return  choiceNumber ;
}