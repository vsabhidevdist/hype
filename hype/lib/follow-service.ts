import axios from "axios";
import { getSelf } from "./auth-service";

export const getFollowingUsers = async()=>{
    try{

        const self =await getSelf()
        const followingUsers = await axios.get(`${process.env.HOST}/api/getfollowingusers/${self.id}`)
        return followingUsers.data;
    }catch{
        return []
    }
}

export const isFollowingUser = async (id: string) => {
    try{
        const self =await getSelf()
        const data = { "id" : `${id}` }
        const otherUser = await axios.post(`${process.env.HOST}/api/getuser`,data)
      
    if(!otherUser){
        throw new Error("User not found")
    }
    if(otherUser.data.id == self.id){
        return true;
    }
    const followdata = {
        "followerId" : self.id,
        "followingId" : otherUser.data.id
    }
    const existingFollower = await axios.post(`${process.env.HOST}/api/isfollowing`,followdata)
    
    return existingFollower.data.status
}catch{

    }
}



export const followUser =  async (id:string) =>{
    const self = await getSelf();
    const data = { "id" : `${id}` }
    const otherUser = await axios.post(`${process.env.HOST}/api/getuser`,data)
    if(!otherUser){
        throw new Error("User not found")
    }
    if(otherUser.data.id === self.id){
        throw new Error("You cannot follow yourself")
    }
    const existingFollow = await isFollowingUser(id)
    if(existingFollow){
        throw new Error("Already Following user")
    }
    const followdata = {
        "followerId" : self.id,
        "followingId" : otherUser.data.id
    }
    const follow = await axios.post(`${process.env.HOST}/api/addfollow`,followdata)
    if(follow.status == 200){
        return follow.data
    }
}


export const unFollowUser =  async (id:string) =>{
    const self = await getSelf();
    const data = { "id" : `${id}` }
    const otherUser = await axios.post(`${process.env.HOST}/api/getuser`,data)
    if(!otherUser){
        throw new Error("User not found")
    }
    if(otherUser.data.id === self.id){
        throw new Error("You cannot unfollow yourself")
    }
    const isFollow = {
        "followerId" : self.id,
        "followingId" : otherUser.data.id
    }
    const existingFollow = await axios.post(`${process.env.HOST}/api/isfollowing`,isFollow)
    if(!existingFollow){
        throw new Error("Not following")
    }
    const unfollowdata = {
        "followerId" : self.id,
        "followingId" : otherUser.data.id
    }
    const unfollow = await axios.delete(`${process.env.HOST}/api/delfollow/${existingFollow.data.followId}/`)
        console.log(unfollow.data)
        return unfollow.data
    
}