import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import axios from "axios";


const receiver  = new WebhookReceiver(process.env.LIVEKIT_API_KEY!,process.env.LIVEKIT_API_SECRET!)


export async function POST(req:Request) {
    const body = await req.text()
    const headerPayload = headers()
    const authorization = headerPayload.get("Authorization")
    if(!authorization){
        return new Response("No authorization",{status:400})
    }
    const event =receiver.receive(body,authorization)

    if(event.event === "ingress_ended")
    {

       
        const pack = {
            
            ingressId: event.ingressInfo?.ingressId,
        data:{
            isLive:false
        }
    }
    await axios.post(`${process.env.HOST}/api/updatestream`, pack );
    return new Response("success",{status:200})
}
if(event.event === "ingress_started")
{

   
    const pack = {
        
        ingressId: event.ingressInfo?.ingressId,
    data:{
        isLive:true
    }
}
await axios.post(`${process.env.HOST}/api/updatestream`, pack );
return new Response("success",{status:200})
}
return new Response("No authorization",{status:400})
}