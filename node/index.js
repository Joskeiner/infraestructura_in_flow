import { createInterface} from 'node:readline/promises'
import { startBack} from './back-end/startBack.js'
import { startFront} from './front-end/startFront.js'

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
        1 - Levantar el Front-end 
        2 - Levantar el Back-end
        \n
        `);
        prompt.close();
        
        let choiceNumber =  parseInt(choice);
        upService(choiceNumber);
        // await Router(choiceNumber);
    } 
    /**
     * this function will run the services you choose 
     * @param {number} choice 
     */
async function upService(choice){
        switch(choice){
        case 1 :
            await startFront();
            await main();
        case 2 :
            await startBack(); 
            await main();
        default:
            process.exit(0);           
        }

        
    }

 await main();

 // !node: lambda 
 // ? golang :  aurora ,rds -> por definir
 // ? python : APIGetway   -> por definir
 
 // ? documentacion 
 // https://patorjk.com/software/taag/#p=display&f=3-D&t=In%20Flow
 // https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
 // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
 // https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/nodegetstarted/index.js
 
 //   const choice = await prompt.question(`\t ##### Elija una de las opciones ##### 
 //         1 - Crear un bucket  de S3
 //         2 - Eliminar un bucket de S3
 //         3 - Crear una tabla de dynamoDB
 //         4 - Eliminar tabla de dynameDB
 //         5 - Eliminar lambda function
 //         6 - Subir codigo a una lanmbda
 //         \n
 //         `);