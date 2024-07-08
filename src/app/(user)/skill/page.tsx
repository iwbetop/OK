import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import { Plus } from "lucide-react";
import { SelectSkill } from "@/components/onboard/select";
import { auth } from "@/auth";
import { GetSkills, GetUserByID } from "@/lib/get";
import { Label } from "@/components/ui/label";

import { SkillComboboxDemo } from "@/components/user/skill-combo";

import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

import { AddSkill, DeleteSkill } from "@/actions/user/skill";

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

  import { ProfSum } from "@/components/user/prof-summary";


  import { Form } from "@/components/form/form";
export default async function Skill(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    const skills = await GetSkills();
    return(
        <div className="space-y-4">
            <ProfSum />
            <Card className="relative">
            <CardHeader>
                <CardTitle>Skill Management</CardTitle>
                <CardDescription>manage your skill</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {user?.skill.map(item => (
                        <span key={item.id} className="inline-flex items-center relative bg-secondary text-secondary-foreground p-2 rounded mx-2">
                            {item.skill.name}
                            <AlertDialog>
                            <AlertDialogTrigger><Minus className="w-4 h-4 ml-3"/></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <Form form={DeleteSkill}>
                                <AlertDialogFooter>
                                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                    <input type="hidden" name="id" value={item.id} />
                                    <AlertDialogAction type="submit">Continue</AlertDialogAction>
                                </AlertDialogFooter>
                                </Form>
                            </AlertDialogContent>
                            </AlertDialog>
                        </span>
                    ))}
                    {user?.skill.length === 0 && (
                        <p>No skill added yet</p>
                    )}
                </div>
            </CardContent>
            <Dialog>
            <DialogTrigger><Plus className="w-8 h-8 absolute top-4 right-7"/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Skill</DialogTitle>
                </DialogHeader>
                <div>
                    <Form form={AddSkill}>
                        <input type="hidden" name="userId" value={user?.id} />
                        <div className="grid gap-3 w-full">
                            <Label>Select a skill below</Label>
                            <SkillComboboxDemo props={skills}/>
                            <Button>Add</Button>
                        </div>
                    </Form>
                </div>
            </DialogContent>
            </Dialog>
            </Card>
        </div>
    );
}