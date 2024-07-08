"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { useState } from "react"

type permissions = {
    id: string;
    name: string;
    description: string;
}[]

export function SelectPermission({
    permissions
}: {
    permissions: permissions
}){
    const [ permissionValue, setPermissionValue ] = useState("  ")
    return(
        <div className="py-8">
            <input type="hidden" name="permissionId" value={permissionValue} />
            <div className="grid gap-3">
                <Label>Select Permission</Label>
                <Select onValueChange={(e: string) => setPermissionValue(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Permission" />
                    </SelectTrigger>
                    <SelectContent>
                        {permissions.map((permission) => (
                            <SelectItem value={permission.id}>{permission.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}