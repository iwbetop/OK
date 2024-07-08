import { DataTable } from "@/components/super-admin/user-table/data-table"
import { columns } from "@/components/super-admin/user-table/column"
import { getTotalUsers, GetUsers } from "@/lib/getuser"

export default async function Dashboard(){
    const users = await GetUsers();
    const totalUsers = await getTotalUsers();
    return(
        <div>
            <DataTable columns={columns} data={users} totalUsers={totalUsers} />
        </div>
    )
}