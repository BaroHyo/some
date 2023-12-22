'use server';

import { signIn, signOut } from '@/auth.config';

import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {


        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        return 'Success';

    } catch (error) {
        console.log(error);
        return 'CredentialsSignin'
    }
}

export const login = async (email: string, password: string) => {

    try {

        await signIn('credentials', { email, password })

        return { ok: true };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo iniciar sesión'
        }
    }
}

interface Props {
    correo: string;
    name: string; 
    password: string;
}

export const postCrearCuenta = async ({ correo, name, password }: Props) => {

    try {

        const userFound = await prisma.user.findUnique({
            where: {
                email: correo,
            },
        });

        if (userFound) {
            return {
                ok: false,
                message: "Ya existe una cuenta registrada con esta dirección de correo electrónico.",
            };
        }
        const newPersona = await prisma.user.create({
            data: {
                name: name,
                email: correo,
                password: bcrypt.hashSync(password),
            }, 
        });

        return {
            ok: true,
            data: newPersona
        };

    } catch (error) {
        if (error instanceof Error) {
            return {
                ok: false,
                message: error.message,
            }
        } else {
            return {
                ok: false,
                message: 'Error desconocido',
            }
        }

    }

}


export const logout = async () => {
    await signOut();
}