"use client"

import { useSidebar } from "@/store/use-sidebar"
import { UserItem, UserItemSkeleton } from "./user-item"

interface AxiosFollowResponceApi{
    id: number,
        follower: number,
        following: number,
        username: string,
        imageUrl: string,
        isLive?:boolean
    

}
interface FollowingProps{
    data: AxiosFollowResponceApi[]
}
export const Following = ({data}:FollowingProps)=>{
    const { collapsed } = useSidebar((state)=>state)
    if(!data.length)
    return null

    return(
        <div>
    {!collapsed && <div className="pl-6 mb-4">
        <p className="text-sm text-muted-foreground">
        Following
        </p>
    </div> }
    <ul className="space-y-2 px-2">
        {data.map((follow)=>(

            <UserItem 
            key={follow.following}
            username={follow.username}
            imageUrl={follow.imageUrl}
            isLive={follow.isLive}
            />
        ))

        }
    </ul>
        </div>
    )
}


export const FollowingSkeleton=()=>{
    return(
        <ul className="px-2 pt-2 lg:pt-0">
            {
            [...Array(3)].map((_,i)=>(
                <UserItemSkeleton key={i}/>
            ))
            }
        </ul>
    )
}