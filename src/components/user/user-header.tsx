import { FeedModeToggle } from "./toggle";
import { ModeToggle } from "../theme";
import Logo from "../../../public/logo/udd.png"
import Image from "next/image";

// components
import { Separator } from "../ui/separator";

import { auth } from "@/auth";
import { GetUserByID } from "@/lib/get";



export async function FeedHeader(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)

    return(
        <header className="w-full relative pt-6 pb-3 px-4 md:px-0">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <span className="inline-flex w-[54px] h-[54px] relative">
                        <Image src={Logo.src} fill alt="LOGO" className="p-2"/>
                    </span>
                    <div>
                        <p className="font-semibold text-muted-foreground">Hello, {user?.firstName}👋</p>
                    </div>
                </div>
                <div className="space-x-4">
                    <ModeToggle />
                    {session?.user.onbordedStatus && (
                        <FeedModeToggle image={user?.image} name={`${user?.firstName} ${user?.lastName}`}/>
                    )}
                </div>
            </div>
            <Separator className="my-4"/>
        </header>
    );
}