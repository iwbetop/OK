import Logo from "../../../public/logo/udd.png";
import Image from "next/image"
import Link from "next/link";

import { ModeToggle } from "../theme";
import { AvatarDropMenu } from "./avatar-menu";
import { auth } from "@/auth";
import { GetUserByID } from "@/lib/get";
import { AdminDropDownMenu } from "../admin/admin-menu";


export async function Header(){
    const session = await auth()
    const user = await GetUserByID(session?.user?.id!)
    return(
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <span className="inline-flex relative w-12 h-12 bg-secondary/10  rounded-full shadow-sm hover:animate-pulse ">
                            <Image src={Logo.src} fill alt="LO" className="p-2"/>
                        </span>
                    </Link>
                    <span className="text-muted-foreground">{user?.firstName} {user?.lastName}👋
                        <span className="inline-flex text-xs p-1 rounded-sm bg-primary text-primary-foreground mx-2">superadmin</span>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    {user?.role?.name === "SUPERADMIN" ? (
                        <AvatarDropMenu />
                    ) : (
                        <AdminDropDownMenu />
                    )}
                </div>
            </div>
        </div>
    )
}