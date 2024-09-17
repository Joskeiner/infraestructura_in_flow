import { DescribeKeyPairsCommand ,
     EC2Client ,
     CreateSecurityGroupCommand,
    AuthorizeSecurityGroupIngressCommand,
    RunInstancesCommand
} from "@aws-sdk/client-ec2";
import { readFileSync } from "node:fs";
import 'dotenv/config';

const client = new EC2Client({});

const shellScript =  readFileSync( process.env.URL, 'utf-8')

/**
 * this function creates the ec2 installation with an ubuntu t2.micro 
 * as well as all its dependencies for the inflow app
 * @returns {number}
 */
export async function createEc2(){
    const key = await getKey();
    const segurity = await createSegurityGroup();
    console.log(segurity)

    const command = new RunInstancesCommand({
        KeyName: key,
        SecurityGroupIds:[segurity],
        InstanceType: process.env.TYPEINSTANCE,
        ImageId:process.env.TYPEAMI,
        UserData: Buffer.from(shellScript).toString('base64'),
        MaxCount:2,
        MinCount: 1,

    });
    try{
        /**
         * @constant {RunInstancesCommandOutput} response
         */
        const response = await client.send(command);

        return response.$metadata.httpStatusCode;
        
    }catch(err){
        console.log(` ERROR IN EC2 : ${err.message} `);

    }


}

/**
 * 
 * @returns {string}
 */
async function createSegurityGroup(){

    const command = new CreateSecurityGroupCommand({
        GroupName:process.env.NAMEGROUP,
        Description :" Grupo de seguridad para Inflow",
    });

    try{
        /**
         * @constant {string} GroupId
         */
        const {GroupId} = await client.send(command);
        const modifyGroupIngres = new AuthorizeSecurityGroupIngressCommand({
            GroupId:GroupId,
            IpPermissions :[
                {
                    IpProtocol:'tcp',
                    FromPort: 22,
                    ToPort:22,
                    IpRanges:[{CidrIp: process.env.IP}], // poner su ip a su defecto

                },
                {
                    IpProtocol:'tcp',
                    FromPort: 80,
                    ToPort:80,
                    IpRanges:[{CidrIp:'0.0.0.0/0'}],

                },
                {
                    IpProtocol:'tcp',
                    FromPort: 443,
                    ToPort:443,
                    IpRanges:[{CidrIp:'0.0.0.0/0'}],

                }
            ]
        });

        /**
         * @constant {AuthorizeSecurityGroupIngressCommandOutput} response
         */
        const response = await client.send(modifyGroupIngres);
        if (response.$metadata.httpStatusCode == 200){

            console.log("se creo el grupo de segurirdad con exito");

            if(GroupId == undefined){
                return '';
            }

            return GroupId;

        }else {
            console.log("Error: al mometo de crear las reglas de entrada ");
            process.exit(2);
        }

    }catch(err){
        console.log(` ERROR IN SG : ${err.message}`);
    }

}

/**
 *  list key pair and search for vockey key
 * 
 * 
 * @returns {string}
 */

async function getKey(){

    const command = new DescribeKeyPairsCommand({});
    /**
     * @constant {KeyPairInfo[]} KeyPairs
     */
    const {KeyPairs } = await client.send(command); 

    if (KeyPairs == undefined){

        console.log(` ERROR KEY : no se obtuvo respuesta las claves`);

        process.exit(2);
    }

    if ( KeyPairs.length < 0 ){

        console.log(" No existe ninguna clave ");

        process.exit(2);

    } else if (KeyPairs.length ==  1){

        console.log(`se encontro una clave`)

        return KeyPairs[0].KeyName;

    }else {
        KeyPairs.map((kp) => {
            if (kp.KeyName.toLocaleLowerCase() == process.env.KEY.toLocaleLowerCase()){
                return kp.KeyName;
            }
        }
        )

        return '';
    }



}
