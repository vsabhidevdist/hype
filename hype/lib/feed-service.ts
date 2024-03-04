import axios from "axios";
import { getSelf } from "./auth-service";

export const getStreams = async ()=>{
    let userId;

    try{
        const self = await getSelf()
        userId = self.id
    }
    catch{
        userId= null
    }
    let streams = [];

    if(userId){
        const data = {
            "userId" : userId
        }
        const response =await axios.post(`${process.env.HOST}/api/getstreamsbyuser`, data)
        streams = response.data
    }
    else{
        const response =  await axios.post(`${process.env.HOST}/api/getstreams`)
        streams = response.data
    }
    return streams
}