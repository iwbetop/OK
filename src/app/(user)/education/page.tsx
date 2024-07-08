import { auth } from "@/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { GetUserByID } from "@/lib/get";
import Udd from "../../../../public/logo/udd.png"
import Image from "next/image";

import { Form, FormControl, Submit } from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Camera, Minus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Plus } from "lucide-react";
import { AddEducation, DeleteEducation } from "@/actions/user/education";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { AVATARF } from "@/actions/user/avatar";
import { ProfSum } from "@/components/user/prof-summary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

  export default async function Education(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    return(
        <div className="space-y-3">
            <ProfSum />
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Manage Education</CardTitle>
                    <CardDescription>Customize your education</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="">
                        {user?.educations.map(item => (
                            <div className="w-full py-3">
                                <div className="flex justify-between items-center px-2">
                                    <div className="flex gap-3">
                                        <span className="inline-flex relative w-10 h-10">
                                            <Image src={Udd.src} fill alt="udd"/>
                                        </span>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <span className="text-muted-foreground text-sm ">
                                                <span>{item.dateStarted.toDateString()}</span>
                                                {item.dateEnded && (
                                                    <span> - {item.dateEnded?.toDateString()}</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <AlertDialog>
                                    <AlertDialogTrigger><Minus className="w-6 h-6"/></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                    <Form form={DeleteEducation}>
                                        <input type="hidden" name="id" value={item.id} />
                                        <AlertDialogFooter>
                                            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                            <AlertDialogAction type="submit">Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                    </Form>
                                    </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                        {user?.educations?.length! === 0 && (
                            <p>No educations added yet</p>
                        )}
                        <Dialog>
                        <DialogTrigger><Plus className="w-7 h-7 absolute top-4 right-6"/></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Education</DialogTitle>
                            </DialogHeader>
                            <Form form={AddEducation}>
                                <input type="hidden" name="userId" value={user?.id} />
                                <div className="grid gap-3 w-full">
                                    <Label>School Name</Label>
                                    <Input type="text" name="name"/>
                                </div>
                                <FormControl>
                                <div className="grid gap-3 w-full">
                                    <Label>Start Date</Label>
                                    <Input type="date" name="dateStarted"/>
                                </div>
                                <div className="grid gap-3 w-full">
                                    <Label>End Date</Label>
                                    <Input type="date" name="dateEnded"/>
                                </div>
                                </FormControl>
                                <Button className="w-full">Add</Button>
                            </Form>
                        </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }