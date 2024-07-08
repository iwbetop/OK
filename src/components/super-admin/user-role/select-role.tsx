"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useRouter } from "next/navigation"

type Roles = {
    id: string,
    name: "USER" | "SUPERADMIN" | "ADMIN"
}[]

export function SelectRole({ role } : { role: Roles }){
    const { push } = useRouter()

    const handleRoleChangeValue = (e: string) => {
        push(`/superadmin/permissions-superadmin?q=${e}`)
    }

    return(
        <Select onValueChange={handleRoleChangeValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
                {role.map((item) => (
                    <SelectItem value={item.id}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}