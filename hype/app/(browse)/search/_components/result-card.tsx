import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail"
import { VerifiedMark } from "@/components/verified-mark"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
interface ResultCardPropss{
    
        id: number,
            name: string,
            thumbnailUrl: string,
            isLive: boolean,
            userId__username: string,
            userId__imageUrl: string,
            userId__bio: string,
            imageUrl: string,
            updated_at:string
        
    }
    

interface ResultCardProps{
    data: ResultCardPropss
} 
export const ResultCard = ({data}:ResultCardProps)=>{
    
     
    return(
        <Link href={`/${data.userId__username}`}>
            <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
            <Thumbnail 
            src={data.thumbnailUrl}
            fallback={data.imageUrl}
            isLive={data.isLive}
            username={data.userId__username}
            />
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                    {data.userId__username}
                </p>
                <VerifiedMark />
                </div>
                <p className="text-sm text-muted-foreground">
                    {data.name}
                </p>
                <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(data.updated_at),{
                        addSuffix:true
                    })}
                </p>
            </div>
            </div>
        </Link>
    )
}


export const ResultCardSkeleton = ()=>{
    return(
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
            <ThumbnailSkeleton />

            </div>
            <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}