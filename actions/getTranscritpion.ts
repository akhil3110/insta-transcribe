import s3 from "@/lib/awsS3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3"

//@ts-ignore 
async function streamToString(stream) {
    //@ts-ignore
    const chunks = [];
    return new Promise((resolve, reject) => {
       //@ts-ignore
      stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
      //@ts-ignore
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      stream.on('error', reject);
    });
}



export const getTranscription =async(fileName: string, email: string) => {
    try {

        const folderName =email.split('@')[0]

        const getObjectCommand =new  GetObjectCommand({
            Bucket: 'bucket.akhilparmar.dev',
            Key: `${folderName}/${fileName}.transcription`
        })


        let transcriptionFileResponse = await s3.send(getObjectCommand)

        if(transcriptionFileResponse){
            return JSON.parse(
                //@ts-ignore
                await streamToString(transcriptionFileResponse.Body)
            )
        }

        return null

    } catch (error) {
        console.log(error)
    }
}