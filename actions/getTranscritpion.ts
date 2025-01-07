import s3 from "@/lib/awsS3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3"

//@ts-expect-error: stream type
async function streamToString(stream) {
    //@ts-expect-error: chunks type
    const chunks = [];
    return new Promise((resolve, reject) => {
       //@ts-expect-error: chunks type
      stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
      //@ts-expect-error: chunks type
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      stream.on('error', reject);
    });
}



export const getTranscription =async(fileName: string, email: string) => {
    try {

        const folderName =email.split('@')[0]

        console.log(folderName)
        console.log(fileName)
        const getObjectCommand =new  GetObjectCommand({
            Bucket: 'bucket.akhilparmar.dev',
            Key: `${folderName}/${fileName}.transcription`
        })


        let transcriptionFileResponse = await s3.send(getObjectCommand)


        const transcription =  JSON.parse(
                //@ts-ignore
                await streamToString(transcriptionFileResponse.Body)
            )
        
        transcription.results.items.forEach((item: any,key: any) => {
                if(!item.start_time){
                    const prev = transcription.results.items[key-1]; 
                    prev.alternatives[0].content +=   item.alternatives[0].content
                    delete transcription.results.items[key]
                }
            })

        return  transcription.results.items.map((item:any) =>{
            const {start_time,end_time} = item;
            const content = item.alternatives[0].content;
            return {start_time,end_time,content}
        })
        

        return null

    } catch (error) {
        console.log(error)
    }
}