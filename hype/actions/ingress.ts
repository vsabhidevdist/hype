"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";


import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";
import axios from "axios";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!, process.env.LIVEKIT_API_KEY!,process.env.LIVEKIT_API_SECRET!,);

export const resetIngresses = async (hostIdentity: string) => {
  try{

    const ingresses = await ingressClient.listIngress({
      roomName: hostIdentity,
    });
    if(ingresses)console.log("creating")
    
    const rooms = await roomService.listRooms([hostIdentity]);
    
    for (const room of rooms) {
      await roomService.deleteRoom(room.name);
    }
    
    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await ingressClient.deleteIngress(ingress.ingressId);
      }
    }
  }catch{return}
};

export const createIngress = async (ingressType: IngressInput) => {
  
  const self = await getSelf();

  await resetIngresses(`${self.id}`);
  
  const options: CreateIngressOptions = {
    name: self.username,
    roomName: `${self.id}`,
    participantName: self.username,
    participantIdentity: `${self.id}`,
  };
  

    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
    

  console.log(options)

  


  const ingress = await ingressClient.createIngress(
    ingressType,
      {
        name: self.username,
        roomName: `${self.id}`,
        participantName: self.username,
        participantIdentity: `${self.id}`,
        video: {
          source: TrackSource.CAMERA,
          preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        },
        audio: {
          source: TrackSource.MICROPHONE,
          preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        },
      }
      );
   
    
   
  if (!ingress || !ingress.url || !ingress.streamKey) {
   
    throw new Error("Failed to create ingress");
  }

    const StreamInfo = await axios.post(`${process.env.HOST}/api/getstreambyuserid`, {"userId":self.id} );
    const pack = {
        streamId: StreamInfo.data.id,
        data:{
            ingressId:ingress.ingressId,
            serverUrl:ingress.url,
            streamKey:ingress.streamKey
        }
    }
   await axios.post(`${process.env.HOST}/api/updatestream`, pack );

   revalidatePath(`/u/${self.username}/keys`)
   return ingress;
}

