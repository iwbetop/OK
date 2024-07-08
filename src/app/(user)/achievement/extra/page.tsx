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
import Udd from "../../../../../public/logo/udd.png"
import Image from "next/image";

import { Form, FormControl } from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Submit } from "@/components/form/form";

import { Minus } from "lucide-react";

import { SelectCateogry } from "@/components/user/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Plus } from "lucide-react";


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
import { AddAchievement, DeleteAchievement } from "@/actions/user/achievement";
import { Textarea } from "@/components/ui/textarea";

  export default async function Achievement(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)

    const userSpecialAchievement = user?.achievements.filter((item) => item.category === "EXTRA_CURRICULUM")

    return(
        <Card className="relative">
        <CardHeader>
            <CardTitle>Manage Achievement</CardTitle>
            <CardDescription>Customize your extra curriculum achievement achievement</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                {userSpecialAchievement && userSpecialAchievement.map(item => (
                    <div className="w-full py-3">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex gap-3">
                                <span className="inline-flex relative w-10 h-10">
                                    <Image src={Udd.src} fill alt="udd"/>
                                </span>
                                <div>
                                    <h3>{item.name}</h3>
                                    <span className="text-muted-foreground text-sm">
                                        <span>{item.dateAchieved.toDateString()}</span>
                                    </span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            <AlertDialog>
                            <AlertDialogTrigger><Minus className="w-6 h-6"/></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                            <Form form={DeleteAchievement}>
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
                {userSpecialAchievement && userSpecialAchievement.length! === 0 && (
                    <p>No achievements added yet</p>
                )}
                <Dialog>
                <DialogTrigger><Plus className="w-7 h-7 absolute top-4 right-6"/></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Achievement</DialogTitle>
                    </DialogHeader>
                    <Form form={AddAchievement}>
                        <input type="hidden" name="userId" value={user?.id} />
                        <div className="grid gap-3 w-full">
                            <Label>Achievement Name</Label>
                            <Input type="text" name="name"/>
                        </div>
                        <FormControl>
                        <div className="w-full">
                        <FormControl>
                            <div className="grid gap-3 w-full">
                                <Label>Achieved Date</Label>
                                <Input type="date" name="dateAchieved"/>
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label>Category</Label>
                                <SelectCateogry />
                            </div>
                        </FormControl>
                        </div>
                        </FormControl>
                        <div className="grid gap-3 w-full">
                        <Label>Description</Label>
                        <Textarea name="description"/>
                        </div>
                        <Submit label="Add"/>
                    </Form>
                </DialogContent>
                </Dialog>
            </div>
        </CardContent>
        </Card>
    );
  }