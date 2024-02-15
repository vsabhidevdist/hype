"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id:string) =>{
    try{
        const followedUser = await followUser(id);
        
        revalidatePath("/")
        if(followedUser){
            revalidatePath(`/${followedUser.username}`)
        }
        return followedUser
    }catch(error){
        throw new Error("Error occured")
    }
}
export const unFollow = async (id:string) =>{
    try{
        const unFollowedUser = await unFollowUser(id);
        
        revalidatePath("/")
        if(unFollowedUser){
            revalidatePath(`/${unFollowedUser.username}`)
        }
        return unFollowedUser
    }catch(error){
        throw new Error("Error occured")
    }
}