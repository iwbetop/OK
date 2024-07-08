import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { AVATARF } from "@/actions/user/avatar";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Form, FormControl, Submit } from "@/components/form/form";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  
  import { Camera, Minus } from "lucide-react";
import { auth } from "@/auth";
import { GetUserByID } from "@/lib/get";

export async function ProfSum(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    return(
        <Card>
            <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
            <div className="flex gap-4">
                       <div className="w-fit h-fit relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={user?.image!} />
                            <AvatarFallback>{user?.firstName}</AvatarFallback>
                            </Avatar>
                            <Dialog>
                            <DialogTrigger><Camera className="w-7 h-7 absolute bottom-6 right-0 bg-primary text-primary-foreground p-1 rounded-full"/></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Change your avatar</DialogTitle>
                                <DialogDescription>
                                   <Form form={AVATARF}>
                                    <input type="hidden" name="id" value={user?.id} />
                                   <div className="grid gap-3">
                                    <Label>Change Avatar</Label>
                                    <Input type="file" name="image"/>
                                   </div>
                                   <Submit label="Update"/>
                                   </Form>
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                            </Dialog>
                       </div>
                        <div>
                            <h1 className="text-2xl capitalize">{user?.firstName} {user?.lastName}</h1>
                            <p className="">{user?.course?.name}</p>
                            <p className="capitalize">{user?.gender.toLowerCase()}</p>
                        </div>
                   </div>
            </CardContent>
            </Card>
    )
}