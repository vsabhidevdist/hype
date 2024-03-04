"use server"

import { revalidatePath } from "next/cache"
import { getSelf } from "@/lib/auth-service"
import axios from "axios"

interface StreamProps{
    
        id: number,
        name: string,
        thumbnailUrl: string | null,
        ingressId?: string,
        serverUrl?: string,
        streamKey?: string,
        isLive: boolean,
        isChatEnabled: boolean,
        isChatDelayed: boolean,
        isChatFollowersOnly: boolean,
        userId: number
    
}
export const updateStream = async (values:Partial<StreamProps>) => {
    try{
        const self  =await getSelf()
        const selfStream = await axios.post(`${process.env.HOST}/api/getstreambyuserid`, {"userId":self.id} );
        if(!selfStream.data){
            throw new Error("Stream not found")
        }
        const valueData={
            name : values.name,
            thumbnailUrl: values.thumbnailUrl,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly:values.isChatFollowersOnly,
            isChatDelayed:values.isChatDelayed
        }
        const pack = {
            streamId: selfStream.data.id,
            data:valueData
        }
        const stream = await axios.post(`${process.env.HOST}/api/updatestream`, pack );

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)
    }
    catch{
        throw new Error("Internal error")
    }
}