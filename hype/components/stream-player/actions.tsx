"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, unFollow } from "@/actions/follow";
import { toast } from "sonner";

interface ActionsProps{
    hostIdentity:string;
    isFollowing:boolean;
    isHost:boolean;

}

export const Actions =({hostIdentity,isFollowing,isHost}:ActionsProps)=>{
    const [isPending,startTransition] =useTransition()
    const router = useRouter()
    const { userId } =useAuth()
    const handleFollow = ()=>{
        startTransition(()=>{
            onFollow(hostIdentity)
            .then((data)=>toast.success(`You are now following ${data.username}`))
            .catch(()=>toast.error("Something went wrong!"))
        })
    }

    const handleUnfollow = ()=>{
        startTransition(()=>{
            unFollow(hostIdentity)
            .then((data)=>toast.success(`Youhave unfollowed ${data.username}`))
            .catch(()=>toast.error("Something went wrong!"))
        })
    }
    const toggleFollow = ()=>{

        if(!userId){
            return router.push("/sign-in")
        }
        if(isHost)return
        if(isFollowing){
            handleUnfollow()
        }
        else{
            handleFollow()
        }
        
    }
    return(
        <Button
        disabled={isPending || isHost}
        onClick={toggleFollow}
        variant='primary'
        size='sm'
        className="w-full lg:w-auto"

        >
            <Heart  className={cn("h-4 w-4 mr-2",
            isFollowing ?"fill-white":"fill-none")}/>
            {isFollowing ?"Unfollow":"Follow"}

        </Button>
        
    )
}


export const ActionsSkeleton = ()=>{
    return(
        <div className="h-10 w-full lg:w-24">

        </div>
    )
}