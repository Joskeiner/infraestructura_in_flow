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

//*  node : la db de dynamo listo
// !node: lambda 
//  *  node s3 listo
// ? golang :  aurora ,rds -> por definir
// ? python : APIGetway   -> por definir

// ? documentacion 
// https://patorjk.com/software/taag/#p=display&f=3-D&t=In%20Flow
// https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/nodegetstarted/index.js
