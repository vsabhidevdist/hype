
import { getSelf } from "@/lib/auth-service";
import axios from "axios";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
export const ourFileRouter = {
        thumbnailUploader : f({ image: { maxFileSize :"4MB",maxFileCount:1}})
        .middleware(async ()=>{
            const self = await getSelf()
            return { user: self}
        })
        .onUploadComplete( async ({ metadata,file})=>{
            const selfStream = await axios.post(`${process.env.HOST}/api/getstreambyuserid`, {"userId":metadata.user.id} );
            const pack = {
                streamId: selfStream.data.id,
                data: {
                    thumbnailUrl : `${file.url}`,
                }
            }
            console.log(pack)
            await axios.post(`${process.env.HOST}/api/updatestream`, pack );
            return { fileUrl: file.url }
        })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;