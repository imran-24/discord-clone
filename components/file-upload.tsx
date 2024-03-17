'use client'

import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { FileIcon, X } from "lucide-react"
import Image from "next/image"

interface FileUploadProps{
    value: string,
    onChange: (url?: string)=> void
    endPoint: "messageFile" | "serverImage"
}
const FileUpload: React.FC<FileUploadProps> = ({
    endPoint,onChange, value
}) => {
    const fileType = value?.split('.').pop()
    if(value && fileType !== 'pdf'){
        return(
            <div className="relative h-20 w-20">
                <Image 
                fill
                alt=""
                src={value}
                className="rounded-full object-cover object-center"
                />
                <button 
                onClick={()=> onChange("")}
                className="absolute top-0 right-0 bg-rose-500 rounded-full text-white z-10 shadow-lg p-1">
                    <X className="h-4 w-4 " />
                </button>
            </div>
        )
    }

    if(value && fileType === 'pdf'){
        return(
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
               <FileIcon className="h-10 w-10 fill-indigo-500 stroke-indigo-300"/>
               <a 
               href={value}
               target="_blank"
               rel="noopener noreferrer"
               className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                {value}
               </a>
                <button 
                onClick={()=> onChange("")}
                className="absolute top-0 right-0 bg-rose-500 rounded-full text-white z-10 shadow-lg p-1">
                    <X className="h-4 w-4 " />
                </button>
            </div>
        )
    }
    return ( 
    <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res: any) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
    /> );
}
 
export default FileUpload;