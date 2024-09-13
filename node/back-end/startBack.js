import { createTableDynamo } from "./service/dynamoDb.js";
import { createInterface} from 'node:readline/promises'
import { createBucket } from "./service/s3.js";
/**
 * lift the back-end
 */
export async function startBack() {
     /**
      * @constant {number} response
      */
      await createTableDynamo();

        const prompt = createInterface({
        input: process.stdin,
        output:process.stdout,
    });

    const choice = await prompt.question(`\t ##### Elija el nombre del bucket \n#####`);

    await createBucket(choice);

     if (response == 200 ){
        console.log(`Se levanto con exito`);
     }else {
        console.log(`respuesta de la api es ${response}`)
     }
     
}