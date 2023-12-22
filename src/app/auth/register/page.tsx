import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { FormRegister } from '../ui'

export default function RegisterPage() {
    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
                <div className="flex lg:hidden justify-between items-center w-full py-4">
                    <div className="flex items-center justify-start space-x-3">
                        <span className="bg-black rounded-full w-6 h-6"></span>
                        <span className="font-medium text-lg">Some</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" className="w-full" asChild>
                            <Link href={paths.auth.login}>Iniciar Sesión</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                    <div className="flex flex-col space-y-2 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">Crea una cuenta</h2>
                        <p className="text-md md:text-xl">Ingresa tu correo electrónico y contraseña para registrarte</p>
                    </div>
                    <FormRegister />
                </div>
            </div>
            <div className='hidden lg:flex flex-col justify-between bg-slate-100 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
                <div className="flex items-center justify-start space-x-3">
                    <span className="bg-black rounded-full w-8 h-8"></span>
                    <span className="font-medium text-xl">Some</span>
                </div>
                <div className='space-y-5'>
                    <h1 className="lg:text-3xl xl:text-4xl xl:leading-snug font-extrabold">Sistema Some</h1>
                    <p className="text-lg">Tienes una cuenta?</p>
                    <Button className="w-full" asChild>
                        <Link href={paths.auth.login}>Iniciar Sesión</Link>
                    </Button>
                </div>
                <p className="font-medium">Copyright ©2021 All rights reserved</p>
            </div>
        </>
    )
}
