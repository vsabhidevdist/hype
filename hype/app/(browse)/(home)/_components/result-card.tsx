import { LiveBadge } from "@/components/live-badge"
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail"
import { Skeleton } from "@/components/ui/skeleton"
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar"
import Link from "next/link"

interface streamProps{
    id: number,
        name: string,
        thumbnailUrl: string,
        isLive: boolean,
        userId__username: string,
        userId__imageUrl: string,
        userId__bio: string,
        imageUrl: string
    
}
interface ResultCardProps{
    data: streamProps
}
export const ResultCard =({data}:ResultCardProps)=>{
    return(
        <div>
            <Link href={`/${data.userId__username}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail 
                src={data.thumbnailUrl}
                fallback={data.imageUrl}
                isLive={data.isLive}
                username={data.userId__username}
                />
           
            <div className="flex gap-x-3">
                <UserAvatar 
                username={data.userId__username}
                imageUrl={data.userId__imageUrl}
                isLive={data.isLive}

                />
            <div className="flex flex-col text-sm overflow-hidden">
                <p className="truncate font-semibold hover:text-blue-500">
                    {data.name}
                </p>
                <p className="text-muted-foreground">
                    {data.userId__username}
                </p>
            </div>
            </div>
            </div>
            </Link>
        </div>
    )
}


export const ResultCardSkeleton =  ()=>{
    return(
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
            <UserAvatarSkeleton />
            <div className="flex flex-col gap-y-1">
            <Skeleton className="h-4 w-32"/>
            <Skeleton className="h-3 w-24"/>
            </div>
            </div>
        </div>
    )
}