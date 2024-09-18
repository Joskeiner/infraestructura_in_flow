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

 
