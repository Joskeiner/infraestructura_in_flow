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
      
      const choice = await prompt.question(`\t ##### Elija el nombre del bucket \n#####`);
      
      await createBucket(choice);
      
      if (response == 200 ){
         console.log(`Se levanto con exito`);
      }else {
         console.log(`respuesta de la api es ${response}`)
      }
      
      const number = await prompt.question(`\t ##### Cuantas lamndas desea crear ?\n#####`);
      
      number = parseInt(number);
      
      let arn = await startLambda(number);
      await CreateApi(arn);
      
   } 
   catch (error) {
      console.error(`ERROR START : ${error.message}`);
      
   }
}
/**
 * 
 * @param {number} numbers 
 * @returns {number[]}
 */
async function startLambda(numbers){
   try{

      const arns = [];
        for (let index = 0; index < numbers; index++) {
      
          let response = await createLambda();
          arns.push(response);
     }
   
     return arns;
   }catch(err){
      console.log(`ERROR START LAMBDA:${err.message}`);
   }

}