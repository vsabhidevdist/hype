import axios from "axios";


export const getStreamByUserId = async (userId:string)=>{
    const stream = await axios.post(`${process.env.HOST}/api/getstreambyuserid`, {"userId":userId} );
    return stream.data;
}