"use server"

import { getSelf } from "@/lib/auth-service";
import axios from "axios";
import { revalidatePath } from "next/cache";

interface updateUserProps{
    
        
            id: number,
            username: string,
            email: string,
            imageUrl: string,
            externalUserId: string,
            bio: string,
            createdAt: string,
            updatedAt: string,
            
}
export const updateUser= async ( values: Partial<updateUserProps>)=>{
   
        const self= await getSelf()
        const valueData = {
            externalUserId: self.externalUserId,
            user:{
                
                bio : values.bio
            }
        }
        const user = await axios.put(`${process.env.HOST}/api/updatebio`, valueData );

        revalidatePath(`/${self.username}`)
        revalidatePath(`/u/${self.username}`)
        return user.data
   
}