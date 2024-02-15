import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user-service"
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps{
    params:{
        username: string
    }
}
const UserPage = async ({params}: UserPageProps) =>{
    const user = await getUserByUsername(params.username);
   
    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    if(isBlocked)
    notFound();
    //console.log(user)
    if(!user){
        notFound();
    }
    return(
        <div className="flex flex-col gap-y-4">
           <p> User {user.username} </p>
           <p> following {`${isFollowing}`} </p>
           <p> isblocked {`${isBlocked}`} </p>
           <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    )
}


export default UserPage;