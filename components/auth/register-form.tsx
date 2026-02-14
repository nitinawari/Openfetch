"use client"
import z, { success } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/lib/validation"
import { Register } from "@/actions/register"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { BackButton } from "@/components/auth/back-button"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState } from "react"
import {useRouter} from "next/navigation";



export const RegisterForm = () => {
    const router = useRouter();
    const [success , setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setSuccess("");
        setError("")
        Register(values).then((data) =>{
           setError(data.error)
           setSuccess(data.success)
            if(data.success){
              router.push("/login");
            } 
        })
    };

    return (
        <Card className="w-[400px] bg-white">
            <CardHeader>
                <Header label="Create an account" />
            </CardHeader>
            <CardContent>
                <Form form={form} onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">

                        <FormField name="name">
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="john doe"
                                        type="name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField name="email">
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="johndoe@example.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField name="password">
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="*******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <FormSuccess message={success}   />
                    <FormError message={error} />
                    <Button type="submit"
                        className="mt-3"
                    >
                        Register  
                    </Button>
                </Form>
            </CardContent>

            <CardFooter>
                <div className="flex items-center gap-4 my-4">
                    <span className="flex-1 bg-gray-300 h-px"></span>
                    <span className="text-gray-500 text-sm">OR</span>
                    <span className="flex-1 bg-gray-300 h-px"></span>
                </div>
                <Social />
                <BackButton
                label="Already have an account?"
                href="/login"
                hrefLabel="Login Account"
                /> 

            </CardFooter>
        </Card>
    )

}