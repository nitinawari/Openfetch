"use client"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Button } from "../ui/Button"
import { Input } from "@/components/ui/Input"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { LoginSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Social } from "@/components/auth/social"
import { BackButton } from "@/components/auth/back-button"
import { Header } from "@/components/auth/header"
import { Login } from "@/actions/login"
import { useState } from "react"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"   

export const LoginForm =() => {

    const [error , setError] = useState<string |undefined>("")
    const [success , setSuccess] = useState<string |undefined>("")  

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
        
    })

    const onSubmit =async  (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        Login(values).then((data)=>{
            setError(data?.error);
        })
    }    
    return (
        <Card className="w-[400px] shadow-md" >
            <CardHeader>
                <Header label={'Welcome back'} />
            </CardHeader>
            <CardContent>
                <Form form={form} onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <FormField name={'email'}>
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
                            </FormItem>
                            <FormMessage />
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
                    <Button 
                    type="submit"
                    className="mt-3"
                    >
                        Login
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
                    label="Don't have an account?"
                    href="/register"
                    hrefLabel="Register Account"
                />
            </CardFooter>
        </Card>
    )

}