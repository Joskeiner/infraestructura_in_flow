import { createInterface} from 'node:readline/promises'
import { startBack} from './back-end/startBack.js'
import { startFront} from './front-end/startFront.js'
import { Router } from './front-end/util/router.js';

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
        3 - crear servicios
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
            process.exit(0);
        case 2 :
            await startBack(); 
            process.exit(0);
        case 3 :
            await Router();
            process.exit(0);           
        }

        
    }

 await main();

 
