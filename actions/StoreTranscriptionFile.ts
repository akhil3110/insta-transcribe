import {GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import toast from "react-hot-toast";
import { getTranscription } from "./getTranscritpion";

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



export const StoreTranscription = async (fileName: string, email: string) => {
  try {
     
    if (!email) {
      throw new Error("User is not authenticated.");
    }
    
    const transcription = await getTranscription(fileName,email)
    if(transcription){
      return
    }

    const folderName = `${email.split("@")[0]}`;
    const mediaFileUri = `https://bucket.akhilparmar.dev.s3.ap-south-1.amazonaws.com/${folderName}/${fileName}`;

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
  
    // Poll for job completion
    let jobStatus = "IN_PROGRESS";
    while (jobStatus === "IN_PROGRESS") {
      const getCommand = new GetTranscriptionJobCommand({
        TranscriptionJobName: transcriptionJobName,
      });
      const response = await awsTrancribeClient.send(getCommand);
      jobStatus = response.TranscriptionJob?.TranscriptionJobStatus || "FAILED";
  
      if (jobStatus === "COMPLETED") {
        const transcriptUri = response.TranscriptionJob?.Transcript?.TranscriptFileUri;
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