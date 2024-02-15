"use client"
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, unFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { unblockUser } from "@/lib/block-service";
import { useTransition } from "react"
import { toast } from "sonner";

interface ActionsProps{
    isFollowing : boolean;
    userId: string
}

export const Actions = ({isFollowing,userId}:ActionsProps) =>{
    const [isPending,startTransition] = useTransition();
    const handleFollow =()=>{
        startTransition(()=>{

            onFollow(userId)
            .then((data)=> toast.success(`You are now following ${data.username}`))
            .catch(()=> toast.error("Something went wrong!"))
        })
    }
    const handleUnFollow =()=>{
        startTransition(()=>{

            unFollow(userId)
            .then((data)=> toast.success(`You have unfollowed ${data.username}`))
            .catch(()=> toast.error("Something went wrong!"))
        })
    }
    const onClick = ()=>{
        if(isFollowing)
        handleUnFollow()
        else
        handleFollow()
    }

    const handleBlock =()=>{
        startTransition(()=>{

            onBlock(userId)
            .then((data)=> toast.success(`Blocked the user ${data.username}`))
            .catch(()=> toast.error("Something went wrong!"))
        })
    }
    const handleUnblock =()=>{
        startTransition(()=>{

            onUnblock(userId)
            .then((data)=> toast.success(`unBlocked the user ${data.username}`))
            .catch(()=> toast.error("Something went wrong!"))
        })
    }
  
    return(
            <>
        <Button disabled={isPending } onClick={onClick} variant="primary">
            {isFollowing?"Unfollow":"Follow"}
        </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Block
            </Button>
            <Button onClick={handleUnblock} disabled={isPending}>
                unBlock
            </Button>
            </>
    )
}