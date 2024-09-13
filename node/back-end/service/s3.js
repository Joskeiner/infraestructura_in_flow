import { createInterface} from 'node:readline/promises'
import {
    S3Client,
    CreateBucketCommand, 
    ListBucketsCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    DeleteObjectCommand,
    PutObjectCommand
} from "@aws-sdk/client-s3"


// verificar si se puede configurar de forma mas detallada los buckets
/**
 * this function create bucket s3  with name @param {string} name and timeTags
 */
export async function createBucket(name) {
    const s3Clinet = new S3Client({});

    const bucketName = `${name}-${Date.now()}`;
   let output = await s3Clinet.send(
        new CreateBucketCommand({
            Bucket:bucketName,
        })
    );


    if (output.$metadata.httpStatusCode == 200 ) {
        console.log(" se creo el bucket con exito");
    }else {
        console.log("error al momento de crear el bucket");

    }

}
/**
 *  this function is for delete a bucket 
 * @param {string} name
 */

export async function DeleteBucket() {
    const s3Client = new S3Client({});
    let name = await ListBucket();
    if (name == ""){
         process.exit(2);
    }
    const paginator = paginateListObjectsV2({client : s3Client},{Bucket: name});
    for await (const page of paginator){
        const objects = page.Contents;
        if (objects){
            for(const object of objects){
                await s3Client.send(new DeleteObjectCommand({Bucket : name , Key: object.Key}));
            }
        }
    }
    const comand = new DeleteBucketCommand({Bucket:name})
    let output = await s3Client.send(comand);
    
    if (output.$metadata.httpStatusCode == 204 ) {
        console.log(` se elimino el bucket : ${name} con exito !!!`);
    }

}

/**
 * this function searches for the  Bucket in the list  
 * @returns {string}
 */

async function ListBucket() {

    let nameBucket ;
    const input = {};
    const comand = new ListBucketsCommand(input);
    const s3Clinet = new S3Client({});
    const response = await s3Clinet.send(comand);

    if(response.$metadata.httpStatusCode == 200){
         nameBucket = await choiceBucket(response.Buckets)
    }else {
        console.log(`error: ${response.$metadata.httpStatusCode}` );
    }

    if (nameBucket != ""){
        // console.log(`nombre del bucket en listBucket ${nameBucket}`)
        return nameBucket;
    }

    return "";

}

/**
 * this function is used to choose a Bucket from tthe list
 * 
 * @param {import('@aws-sdk/client-s3').ListBucketsCommandOutput} buckets 
 * @returns {string}
 */
async function choiceBucket(buckets) {

        
        console.log("#### listado de buckets ####")
    for (let index = 0; index < buckets.length; index++) {
        
        console.log(buckets[index].Name);
        
    }

     const prompt = createInterface({
        input: process.stdin,
        output:process.stdout,
    });

    const nameBucket = await prompt.question(" \n Ingrese el nombre del bucket a eliminar \n");
    prompt.close();

    if (nameBucket == " "){
        console.log(" Hubo un error al momento de procesar el nombre ")

        return "";
    }

    return nameBucket.trim();

}

// https://patorjk.com/software/taag/#p=display&f=3-D&t=In%20Flow
// https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/nodegetstarted/index.js
