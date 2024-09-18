import { createTableDynamo } from "./service/dynamoDb.js";
import { createInterface} from 'node:readline/promises'
import { createBucket } from "./service/s3.js";
import { createLambda,  UpdateCode } from "./service/lambda.js";
import { CreateApi } from "./service/apiGetway.js";
/**
 * lift the back-end
*/
export async function startBack() {
   try {
      /**
       * @constant {number} response
       */
       await createTableDynamo();
      
         const prompt = createInterface({
         input: process.stdin,
         output:process.stdout,
      });
      
      const choice = await prompt.question(`##### Elija el nombre del bucket #####\n`);
      prompt.close();
   
      await createBucket(choice);
      
      
      let response = await createLambda();
      await CreateApi(response);
      
   } 
   catch (error) {
      console.error(`ERROR START : ${error.message}`);
      
   }
}

