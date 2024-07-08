"use client"
import { cn } from "@/lib/utils";
import { 
    useFormState, 
    useFormStatus
} from "react-dom"

import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

type FormT = {
    form: (
        state: { message: any },
        formData: FormData
    ) => Promise<{ message: any }>,
    children: Readonly<React.ReactNode>
}

export function Form(form: FormT){
    const [state, action] = useFormState(form.form, { message: null });
    return(
        <form action={action}>
            <div className="space-y-3">
                {form.children}
            </div>
            {
                state && (
                    <>
                        {state.message && (
                            <p className={cn(
                                "p-1 my-2 text-sm",
                                !state.message.includes("success") ? "text-destructive" :
                                "text-emerald-500"
                            )}>{state.message}</p>
                        )}
                    </>
                )
            }
        </form>
    )
}

export function Submit({ label }: { label: string }){
    const { pending } = useFormStatus()
    return(
        <Button disabled={pending} className="w-full">
            {pending ? (
                <Loader2Icon className="w-5 h-5 animate-spin"/>
            ) : (
                <span>{label}</span>
            )}
        </Button>
    )
}

export function FormControl({ children }: { children: React.ReactNode }){
    return(
        <div className="flex flex-col md:flex-row gap-3 items-center">
            {children}
        </div>
    )
}