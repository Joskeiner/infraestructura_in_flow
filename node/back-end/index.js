import { createInterface} from 'node:readline/promises'
import { Router } from "./router.js";


async function main() {
    const prompt = createInterface({
        input: process.stdin,
        output:process.stdout,
    });
    console.log(`


        **                ********  **                    
        /**               /**/////  /**                    
        /** *******       /**       /**  ******  ***     **
        /**//**///**      /*******  /** **////**//**  * /**
        /** /**  /**      /**////   /**/**   /** /** ***/**
        /** /**  /**      /**       /**/**   /** /****/****
        /** ***  /**      /**       ***//******  ***/ ///**
        // ///   //       //       ///  //////  ///    /// 
                                                                                           
        
        `);

    const choice = await prompt.question(`\t ##### Elija una de las opciones ##### 
        1 - Crear un bucket  de S3
        2 - Eliminar un bucket de S3
        3 - Crear una tabla de dynamoDB
        4 - Eliminar tabla de dynameDB
        5 - Eliminar lambda function
        6 - Subir codigo a una lanmbda
        \n
        `);
    prompt.close();

    let choiceNumber =  parseInt(choice);
        
    await Router(choiceNumber);
} 

 await main();

// TODO node : la db de dynamo falta crear eliminar
// !node: lambda 
//!  node ec2   
//!  nodecognito
//  *  node s3 listo
// ? golang :  aurora ,rds , cloudfront -> por definir
// ? python : APIGetway  y todos los otros servicios -> por definir