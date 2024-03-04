
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
            Result
        </div>
    )
}