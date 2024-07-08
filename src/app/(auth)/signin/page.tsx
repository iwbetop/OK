import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import Image from "next/image"
import Logo from "../../../../public/logo/udd.png"

import { Form, Submit } from "@/components/form/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SigninBackend } from "@/actions/auth/signin"

export default function Signin(){
    return(
        <div className="w-[400px]">
            <Card>
            <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>Welcome back!</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
            <Form form={SigninBackend}>
                    <div className="grid gap-3">
                        <Label>Email</Label>
                        <Input type="email" name="email"/>
                    </div>
                    <div className="grid gap-3">
                        <Label>Password</Label>
                        <Input type="password" name="password"/>
                    </div>
                    <Submit label="Signin"/>
                </Form>
            </CardContent>
            <Separator />
            <CardFooter className="space-x-2 pt-4">
                <Image src={Logo.src} width={20} height={20} alt="LOGO" />
                <p className="font-bold text-muted-foreground text-sm">Universidad de Dagupan</p>
            </CardFooter>
            </Card>
        </div>
    )
}