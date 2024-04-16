import axios from "axios";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string)=>{
    let userId;
    try{
        const self= await getSelf()
        userId=self.id;

    }catch{
        userId=null;
    }
    let streams=[]
    try{

        if(userId){
            const response =await axios.post(`${process.env.HOST}/api/getstreamsbytermforuser`,{ "term": term,"userId":userId})
            streams = response.data
        }
        else{
            const response =await axios.post(`${process.env.HOST}/api/getstreamsbyterm`,{ "term": term})
            streams = response.data
        }
    }
    catch{
        
    }
    return streams;
}