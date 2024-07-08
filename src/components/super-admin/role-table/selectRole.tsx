"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useState } from "react"

type Roles = {
    id: string,
    name: "USER" | "SUPERADMIN" | "ADMIN"
}[]

export function SelectRole({ role } : { role: Roles }){
    const [ roleValue, setRoleValue ] = useState("")

    const handleRoleChangeValue = (e: string) => {
       setRoleValue(e)
    }

    return(
        <div>
            <input type="hidden" name="roleId" value={roleValue} />
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
        </div>
    )
}