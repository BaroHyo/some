"use client";


import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import { paths } from '@/config/paths';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export const FormLogin = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace(paths.show.root);
        }

    }, [state]);


    return (
        <form action={dispatch} className="flex flex-col max-w-md space-y-5">
            {state === "CredentialsSignin" && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Credenciales no son correctas
                    </AlertDescription>
                </Alert>
            )}
            <Input
                type="email"
                name="email"
                placeholder="Correo electrónico"
            />
            <Input
                type="password"
                name="password"
                placeholder="Contraseña"
            />
            <LoginButton />
        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            Ingresar
        </Button>
    );
}