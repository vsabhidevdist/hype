
import { currentUser,auth } from "@clerk/nextjs";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByUsername } from "./user-service";
 
 export async function getSelf(
 
 )

// export const getSelf = async (req: NextApiRequest,
//   res: NextApiResponse) =>
{
    const self = auth()
   const data = { externalUserId : self.userId}
  
    if(!self || !self.userId)
    throw new Error('Unauthorized')
    try {
        const response = await axios.post(`${process.env.HOST}/api/getself`, data);
        if (response.status === 200) {
            const user = response.data
            console.log(user)
          console.log('user request successful');
          return user;
        } else {
          console.error('user request failed');
        }
       
      } catch (error) {
        console.error('Error during user request:', error);
      }
}


export const getSelfByUsername = async (username:string) =>{
    const self = await currentUser()
    if(!self || !self.username){

      throw new Error("Unauthorized")
    }
    const user = await getUserByUsername(username)
    if(!user){

      throw new Error("User not found")
    }
    if(self.username!=user.username)
    {

      throw new Error("Unauthorized")
    }
    return user;
}