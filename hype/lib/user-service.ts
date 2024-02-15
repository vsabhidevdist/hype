import axios from "axios"

export const getUserByUsername = async (username:string)=> {
    const user = await axios.post(`${process.env.HOST}/api/getuserbyusername`,{ "username" : username})
    return user.data;
}

export const getUserById = async(id:string)=>{
    const user = await axios.post(`${process.env.HOST}/api/getuserbyid`,{ "id" : id})
    return user.data;
}