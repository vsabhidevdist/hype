import { getBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";



const CommunityPage =  async ()=>{
    const blockedUsers = await getBlockedUsers();
    const formattedData = blockedUsers.map((block: { blockedId__id: any; imageUrl: any; blockedId__username: any; blockedId__createdAt: string | number | Date; })=>({
        ...block,
        userId: block.blockedId__id,
        imageUrl:block.imageUrl,
        username:block.blockedId__username,
        createdAt: format(new Date(block.blockedId__createdAt), "dd/MM/yyyy")
    }))
    return(
        <div className="p-6">
            <div className="mb-4">
            <h1 className="text-2xl font-bold">
                Community settings
            </h1>
            </div>
            <DataTable columns={columns} data={formattedData} />
        </div>
    )
}

export default CommunityPage;