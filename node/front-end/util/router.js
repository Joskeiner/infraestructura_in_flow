import { createBucket  , DeleteBucket} from "../../back-end/service/s3.js";
import { createInterface} from 'node:readline/promises';
import {createTableDynamo , deleteTableDynamo} from "../../back-end/service/dynamoDb.js";
// import {  } from "./service/lambda.js";
/**
 * esta funcion  manejara las rutas para cada servicio
 * @param {number} choiceNumber 
 */
export async function Router( choiceNumber) {
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
            // eliminar lamnda
            process.exit(0);
        case 6:
            // eliminar lambda
        case 7:
            // configurar lamda
        case 8:
            // crear ec2
        default:
            break;
    }
  

}