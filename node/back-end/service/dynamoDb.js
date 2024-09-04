// pedir el nombre  para la tabla 
import { CreateTableCommand , DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { createInterface} from 'node:readline/promises'


export async function createTableDynamo(){
    const client = new DynamoDBClient({});

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

        console.log(` La table se creo con exito con el  id :${response.TableDescription.TableId}`);
        }else {
            
        console.log(`hubo un error al momento de crear la tabla , codigo de la peticion http ${response.$metadata.httpStatusCode}`);
        }
    }
}
export async function deleteTableDynamo() {}