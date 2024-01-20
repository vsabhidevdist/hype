import { currentUser } from "@clerk/nextjs";
import axios from "axios";


export const getSelf = async () =>{
    const self = await currentUser()
   const  data = {
        externalUserId : self?.externalId}
    if(!self || !self.username)
    throw new Error('Unauthorized')
    try {
        const response = await axios.post(`${process.env.HOST}/api/getuser`, self);
  
        if (response.status === 200) {
            const user = response.data
          console.log('user request successful');
        } else {
          console.error('user request failed');
        }
      } catch (error) {
        console.error('Error during user request:', error);
      }
}