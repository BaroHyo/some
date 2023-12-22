"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { InputForm } from '@/components';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { postCrearCuenta } from '@/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const FormSchema = z.object({
    correo: z.string().min(1, {
        message: "Requiere del campo",
    }),
    name: z.string().min(1, {
        message: "Requiere del campo",
    }),
    password: z.string().min(2, {
        message: "Requiere del campo",
    }),
});

export const FormRegister = () => {

    const router = useRouter();
    const [alerta, setAlerta] = useState<string>('');


    const methods = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            correo: '',
            name: '',
            password: ''
        }
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (data: z.infer<typeof FormSchema>) => {
        const { ok, message } = await postCrearCuenta(data);
        if (ok) {
            router.push("/auth/login");
        } else {
            setAlerta(message || '');
        }
    });

    return (
        <Form {...methods}>
            <form onSubmit={onSubmit} className="flex flex-col max-w-md space-y-5">
                {
                    alerta.length > 1 && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {alerta}
                            </AlertDescription>
                        </Alert>
                    )
                }
                <InputForm type="email" name='correo' placeholder="Correo Electronico" />
                <InputForm name='name' placeholder="Nombre Completo" />
                <InputForm type="password" name='password' placeholder='Contraseña' />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {
                        isSubmitting && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)
                    }
                    Crear Cuenta
                </Button>
            </form>
        </Form>
    )
}
