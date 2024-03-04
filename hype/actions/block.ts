"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
  );
export const onBlock = async (id:string)=>{
    // disconnect blocked user from live
    // to kick guest
    const self = await getSelf()
    let blockeduser;
    try{

        blockeduser = await blockUser(id);
    }catch{

    }

    try{
        roomService.removeParticipant(self.id,id)
    }catch{

    }
    revalidatePath(`/u/${self.username}/community`)
   
    return blockeduser
}


export const onUnblock = async (id:string)=>{
    const unblockeduser = await unblockUser(id);
    revalidatePath('/')
    if(unblockeduser){
        revalidatePath(`/${unblockeduser.username}`)
    }
    return unblockeduser
}