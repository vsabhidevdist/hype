import axios from "axios";
import { getSelf } from "./auth-service";

export const isBlockedByUser =async (id:string) => {
    try{
        const self = await getSelf();
        const data = { "id" : `${id}` }
        const otherUser = await axios.post(`${process.env.HOST}/api/getuser`,data)
        if(!otherUser)

        throw new Error("User not found")
        
        if(otherUser.data.id===self.id){
            return false
        }

        const blockdata = {
            "blockedId" : self.id,
            "blockerId" : otherUser.data.id
        }
        const existingBlock = await axios.post(`${process.env.HOST}/api/isblocked`,blockdata)

        return existingBlock.data.status
    }
    catch{
        return false
    }
}




export const blockUser = async (id:string) =>{
    console.log('hey')
    const self =await getSelf();
    if(self.id === id)
    throw new Error("Cannot block yourself")
    const data = { "id" : `${id}` }
        const otherUser = await axios.post(`${process.env.HOST}/api/getuser`,data)
        if(!otherUser)

        throw new Error("User not found")

        const blockdata = {
            "blockerId" : self.id,
            "blockedId" : otherUser.data.id
        }
        const existingBlock = await axios.post(`${process.env.HOST}/api/isblocked`,blockdata)
        if(existingBlock.data.status)
        throw new Error("Already blocked this user")
        
        const blockthisuser = {
            "blockerId" : self.id,
            "blockedId" : otherUser.data.id
        }
        const block = await axios.post(`${process.env.HOST}/api/blockuser`,blockthisuser)
        
        return block.data
}


export const unblockUser = async (id:string) =>{
    const self =await getSelf();
    if(self.id === id)
    throw new Error("Cannot unblock yourself")
    const data = { "id" : `${id}` }
        const otherUser = await axios.post(`${process.env.HOST}/api/getuser`,data)
        if(!otherUser)

        throw new Error("User not found")

        const blockdata = {
            "blockerId" : self.id,
            "blockedId" : otherUser.data.id
        }
        const existingBlock = await axios.post(`${process.env.HOST}/api/isblocked`,blockdata)
        if(!existingBlock.data.status)
        throw new Error("Not blocked")
        
        const unblock = await axios.delete(`${process.env.HOST}/api/unblockuser/${existingBlock.data.blockId}/`)
        return unblock.data
}