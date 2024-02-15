"use client";
import { getSelf } from "@/lib/auth-service"
import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";


interface AxiosResponceApi{
    
        id: number,
        username: string,
        email: string,
        imageUrl: string,
        externalUserId: string,
        bio: string,
        createdAt: string,
        updatedAt: string,
        isLive?:boolean
    
}
interface RecommendedProps{
     data : AxiosResponceApi[];
};
export const Recommended = ({data,}:RecommendedProps)=>{
    const {collapsed}=useSidebar((state)=>state);
    const showLabel = !collapsed&& data.length>0;
    return(
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">
                    Recommended</p>
                </div>
            )}
           <ul className="space-y-2 px-2">
            {data.map((user)=>(
                <UserItem 
                key={user.id}
                username={user.username}
                imageUrl={user.imageUrl}
                isLive={user.isLive}
                />
            ))
            }
           </ul>
        </div>
    )
}

export const RecommendedSkeleton = ()=>{
    return(
        <ul className="px-2">
            {[...Array(3)].map((_,i)=>(
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}