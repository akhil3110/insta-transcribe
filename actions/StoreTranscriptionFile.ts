import {GetTranscriptionJobCommand, ListTranscriptionJobsCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import toast from "react-hot-toast";

if (!process.env.NEXT_PUBLIC_AWS_PUBLIC_ACCESS_KEY || !process.env.NEXT_PUBLIC_AWS_SECERET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and SECRET_ACCESS_KEY must be defined in environment variables.");
}

const awsTrancribeClient = new TranscribeClient({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.NEXT_PUBLIC_AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECERET_ACCESS_KEY
    }
})


// //@ts-ignore 

// async function streamToString(stream) {
//     //@ts-ignore
//     const chunks = [];
//     return new Promise((resolve, reject) => {
//        //@ts-ignore
//       stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
//       //@ts-ignore
//       stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
//       stream.on('error', reject);
//     });
// }

   
// async function getTranscriptionFile(folderName:string,fileName: string) {
//     const transcriptioFileDestination = `${folderName}/${fileName}.transcription`

//     const getObjectCommand = new GetObjectCommand({
//         Bucket: 'bucket.akhilparmar.dev',
//         Key: transcriptioFileDestination
//     }) 
//     let transcriptionFileResponse = null;
//     try {
//       transcriptionFileResponse = await s3.send(getObjectCommand);
//     } catch (e) {
//         console.log(e)
//     }
//     if (transcriptionFileResponse) {
//       return JSON.parse(
//         //@ts-ignore
//         await streamToString(transcriptionFileResponse.Body)
//       );
//     }
//     return null;
//   }

  export const StoreTranscription = async (fileName: string, email: string) => {
    try {
     
      if (!email) {
        throw new Error("User is not authenticated.");
      }
  
      const folderName = `${email.split("@")[0]}`;
      const mediaFileUri = `https://bucket.akhilparmar.dev.s3.ap-south-1.amazonaws.com/${folderName}/${fileName}`;
  
      console.log("Media File URI:", mediaFileUri);
  
      // Start the transcription job
      const transcriptionJobName = `${folderName}-${fileName}`;
      const startCommand = new StartTranscriptionJobCommand({
        TranscriptionJobName: transcriptionJobName,
        OutputBucketName: "bucket.akhilparmar.dev",
        OutputKey: `${folderName}/${fileName}.transcription`,
        IdentifyLanguage: true,
        Media: {
          MediaFileUri: mediaFileUri,
        },
      });
  
      await awsTrancribeClient.send(startCommand);
      console.log("Transcription job started:", transcriptionJobName);
  
      // Poll for job completion
      let jobStatus = "IN_PROGRESS";
      while (jobStatus === "IN_PROGRESS") {
        const getCommand = new GetTranscriptionJobCommand({
          TranscriptionJobName: transcriptionJobName,
        });
        const response = await awsTrancribeClient.send(getCommand);
        jobStatus = response.TranscriptionJob?.TranscriptionJobStatus || "FAILED";
        console.log("Transcription job status:", jobStatus);
  
        if (jobStatus === "COMPLETED") {
          const transcriptUri = response.TranscriptionJob?.Transcript?.TranscriptFileUri;
          console.log("Transcription completed. File URI:", transcriptUri);
          break
        } else if (jobStatus === "FAILED") {
          throw new Error("Transcription job failed.");
        }
  
        // Wait for a few seconds before polling again
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }


      toast.success("Transcription Completed")
      
    } catch (error) {
      console.error("Something went wrong:", error);
      throw error;
    }
  };