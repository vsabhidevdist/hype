"use server";
import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id:string)=>{
    // disconnect blocked user from live
    // to kick guest
    const blockeduser = await blockUser(id);
    revalidatePath('/')
    if(blockeduser){
        revalidatePath(`/${blockeduser.username}`)
    }
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