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
import { InputParamField } from "@/components/form/param"
import { EMAILVERIFY } from "@/actions/auth/emailverify"

export default function EmailVerification(){
    return(
        <div className="w-[400px]">
            <Card>
            <CardHeader>
                <CardTitle>Verify your email</CardTitle>
                <CardDescription>enter your email to verify and login</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
            <Form form={EMAILVERIFY}>
                    <div className="grid gap-3">
                        <Label>Email</Label>
                        <Input type="email" name="email"/>
                    </div>
                    <InputParamField name="token"/>
                    <Submit label="Verify"/>
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