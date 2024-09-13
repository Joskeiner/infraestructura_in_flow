import { createEc2 } from "./service/ec2.js";
/**
 * lift the fornt-end
 */
export async function startFront() {
     /**
      * @constant {number} response
      */
     const response = await createEc2();

     if (response == 200 ){
        console.log(`Se levanto con exito`);
     }else {
        console.log(`respuesta de la api es ${response}`)
     }
     
}