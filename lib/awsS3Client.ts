import {S3Client} from "@aws-sdk/client-s3"

const s3  =  new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: "AKIAQUPS27TOJ35K7P4P",
        secretAccessKey: "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"
    }
})

export default s3