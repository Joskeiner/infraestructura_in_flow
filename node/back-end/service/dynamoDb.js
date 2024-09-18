import { CreateTableCommand , DeleteTableCommand, DynamoDBClient, ListTablesCommand} from '@aws-sdk/client-dynamodb'
import { createInterface} from 'node:readline/promises'

/**
 * Client sends events to create or delete tables in aws  
 */
const client = new DynamoDBClient({});

/**
 * Create new table in AWS
 * @returns {void}
 */
export async function createTableDynamo(){

    const prompt = createInterface({
        input: process.stdin,
        output:process.stdout,
    });

    let nameTable = await prompt.question("### Por favor ingrese el nombre de la tabla ####\n")
    prompt.close();

    if ( nameTable != ""){
        nameTable.trim();

        const command = new CreateTableCommand({
            TableName: nameTable,
            AttributeDefinitions: [
                {
                    AttributeName:"id",
                    AttributeType: "S",
                },

            ]
            ,
            KeySchema:[
                {
                    AttributeName: "id",
                    KeyType:'HASH',

                }
            ],
            ProvisionedThroughput:{
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        });

        const response = await client.send(command);

        if (response.$metadata.httpStatusCode == 200){

        console.log(` \nLa table se creo con exito con el  id :${response.TableDescription.TableId}`);
        }else {
            
        console.log(`hubo un error al momento de crear la tabla , codigo de la peticion http ${response.$metadata.httpStatusCode}`);
        }
    }
}

/**
 * Delete table in AWS
 *  @returns {void}
 */
export async function deleteTableDynamo() {

    const prompt = createInterface({
        input: process.stdin,
        output:process.stdout,
    });

    let nameTable = await prompt.question("### Por favor ingrese el nombre de la tabla a borrar ####\n")
    prompt.close();

    if( nameTable == ""){
        console.log(" nombre de la tabla invalido");
        process.exit(2);
    }

    let exist= await existTable(nameTable); 

    if (exist){
        const command = new DeleteTableCommand({
            TableName:nameTable,
        });
        let response = await client.send(command);

        console.log("respuesta de  la peticion : " + response.$metadata.httpStatusCode);
        console.log(`se a eliminado la tabla con el id ${response.TableDescription.TableId} exitosamente !!!` );

    }else {
        console.log(`la tabla : ${nameTable} no existe `);
        process.exit(2);
    }
}

/**
 *  list all tables in DynamoDB
 * @param {string} nameTable 
 * @returns {boolean} 
 */

async function existTable(nameTable) {
    let exist = false;
    const command = new ListTablesCommand({});

    const response = await client.send(command);
    for (const table of response.TableNames) {
        if (table == nameTable){
            exist = true;
            return exist;
        }
        
    }

    return exist;
    
}