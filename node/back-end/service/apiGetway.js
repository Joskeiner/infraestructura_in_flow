import { ApiGatewayV2Client , CreateApiCommand, CreateRouteCommand}from "@aws-sdk/client-apigatewayv2"
import { createInterface} from 'node:readline/promises';
const client = new ApiGatewayV2Client({});
// se necesita arn de las lambas
export async function CreateApi(arns) {

    try{
            const prompt =  createInterface({
                input : process.stdin,
                output : process.stdout,
            });

            let description = await prompt.question("\n== Ingrese la descripcion de la api ==\n"); 

            let name = await prompt.question("\n== Ingrese el nombre de la Api getwway ==\n"); 
                prompt.close();

        const commnad = new CreateApiCommand({

            Name: name,
            Description :description,
            ProtocolType: process.env.TYPEPROTOCOL,
            RouteKey: process.env.ROUTEKEY,
            Target: arns[0], 
        });

        const response = await client.send(commnad);
        if (response.$metadata.httpStatusCode == 201){
            console.log(`se creo  la api con exito `);
        }


    }catch(err){
        console.error(`ERROR APIGETWAY : ${err.message}`);
    }
    
}
