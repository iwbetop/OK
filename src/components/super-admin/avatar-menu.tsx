"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export function AvatarDropMenu(){
    const router = useRouter()
    return(
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/superadmin")}>
                    Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/superadmin/items-superadmin")}>
                    Items
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/superadmin/roles-superadmin")}>
                    Role
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/superadmin/permissions-superadmin")}>
                    Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}