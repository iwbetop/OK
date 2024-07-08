import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Form, FormControl, Submit } from "@/components/form/form";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
    import { ONBOARD } from "@/actions/user/onboard";
  import { SelectCourse, SelectGender } from "@/components/onboard/select";
  import { GetUserByID, GetCourses } from "@/lib/get";
  import { Button } from "@/components/ui/button";
  import { auth } from "@/auth";
  import { Textarea } from "@/components/ui/textarea";

export default async function Onboarding(){
    const courses = await GetCourses()
    const session = await auth()
    const user = await GetUserByID(session?.user?.id!);

    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to UDD FOLIO!</CardTitle>
                    <CardDescription>Get started with your account in just a few minutes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form form={ONBOARD}>
                        <input type="hidden" name="id" value={user?.id} />
                        <FormControl>
                           <div className="grid gap-3 w-full">
                                <Label>First Name</Label>
                                <Input type="text" name="firstName"/>
                           </div>
                           <div className="grid gap-3 w-full">
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName"/>
                            </div>
                        </FormControl>
                        <FormControl>
                        <div className="grid gap-3 w-full">
                                <Label>Middle Name</Label>
                                <Input type="text" name="middleName"/>
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label>Birthdate</Label>
                                <Input type="date" name="birthday"/>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div className="grid gap-3 w-full">
                                <Label>Province</Label>
                                <Input type="text" name="province"/>
                            </div>
                        <div className="grid gap-3 w-full">
                                <Label>City</Label>
                                <Input type="text" name="city"/>
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label>Street</Label>
                                <Input type="text" name="street"/>
                            </div>
                        </FormControl>
                        <FormControl>
                        <div className="grid gap-3 w-full">
                                <Label>Personal Email</Label>
                                <Input type="email" name="personalEmail"/>
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label>Phone Number</Label>
                                <Input type="text" name="phoneNumber"/>
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label>Avatar</Label>
                                <Input type="file" name="image"/>
                            </div>
                        </FormControl>
                       <FormControl>
                        <SelectCourse props={courses}/>
                        <SelectGender />
                       </FormControl>
                       <div className="grid gap-3 w-full">
                       <Label>Biography</Label>
                       <Textarea name="biography"/>
                       </div>
                       <Submit label="Complete"/>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}