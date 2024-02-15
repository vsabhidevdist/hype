import axios from "axios";
import { getSelf } from "./auth-service";
import { resolve } from "path";

export const getRecommended = async () => {
    let userId ;
    
    try{
        const self = await getSelf();
        userId = self.id;
        console.log(userId)
    }catch{ 
        userId = null ;
    }
    let users =[];
    // await new Promise(resolve =>setTimeout(resolve,2000))
    if(userId){
      const user = await axios.get(`${process.env.HOST}/api/getusers?user=${userId}`);
      users=user.data
    }else{

       const user =await axios.get(`${process.env.HOST}/api/getusers`);
       users=user.data
    }
    return users;
}