interface VideoDetailsCardTypes{
    id: string
    fileName: string,
    createdAt: Date
}

import { File } from "lucide-react";


const VideoDetailsCard = ({ id, fileName, createdAt }: VideoDetailsCardTypes) => {
    

    // Shorten the file name to 15 characters and add "..." if it's too long
     // Shorten the file name to 15 characters and add "..." if it's too long
     const shortFileName = fileName.length > 15 ? fileName.slice(0, 15) + "..." : fileName;

     return (
         <div 
             className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-600"
         >
             <div className="flex items-center gap-3">
                 <File className="text-white" size={24} />
                 <div className="text-lg font-bold text-white truncate">{shortFileName}</div>
             </div>
             <div className="text-sm text-gray-400 mt-2">Uploaded on: {new Date(createdAt).toLocaleDateString()}</div>
         </div>
     );
};

export default VideoDetailsCard