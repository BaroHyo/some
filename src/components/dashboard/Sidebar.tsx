"use client";

import React from 'react'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { paths } from '@/config/paths';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { logout } from '@/actions';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { menu } from '@/config/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { IoEllipse } from 'react-icons/io5';


interface Props {
    user: {
        name: string;
        email: string;
        image?: string;
    }
}

export const Sidebar: React.FC<Props> = ({ user }) => {

    const pathname = usePathname();


    return (
        <aside className={cn("bg-white shadow-sm translate-x-0 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-100")}>
            <div className={`relative`}>
                <Link href={paths.show.root} className="block py-6 px-8">
                    <div className="flex items-center justify-start space-x-3">
                        <span className="bg-black rounded-full w-8 h-8"></span>
                        <span className="font-medium text-xl">Some</span>
                    </div>
                </Link>
            </div>
            <div className='relative'>
                <CardUser
                    name={user.name}
                    email={user.email}
                />
            </div>
            <Separator className="my-4" />
            <div className="m-4">
                <ul >
                    {
                        menu.map(({ title, path, icon, submenu, subMenuItems }, key) => {


                            if (submenu) {
                                return (
                                    <Accordion
                                        key={`${title}-${key}`}
                                        type="single"
                                        collapsible
                                        className="w-full">
                                        <AccordionItem value="item-1" className="border-b-0">
                                            <AccordionTrigger
                                                className={buttonVariants({
                                                    size: "sm",
                                                    variant:
                                                        pathname === path ||
                                                            pathname.includes(path)
                                                            ? "default"
                                                            : "ghost",
                                                    align: "flexBetween",
                                                    className: "hover:no-underline",
                                                })}
                                            >
                                                <span className="inline-flex items-center justify-center gap-1">
                                                    {icon} {title}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {
                                                    subMenuItems?.map((subItem, subIndex) => (
                                                        <Button
                                                            key={`${subIndex}-${key}`}
                                                            variant={pathname.includes(subItem.path) ? 'secondary' : 'ghost'}
                                                            size="sm"
                                                            className="w-full justify-start ml-5 space-x-4"
                                                            // className="w-full flex flex-row space-x-4 items-center p-2"
                                                            asChild
                                                        >
                                                            <Link href={subItem.path}>
                                                                <IoEllipse size={10} />
                                                                <span className="font-semibold text-xs flex">{subItem.title}</span>
                                                            </Link>
                                                        </Button>
                                                    ))
                                                }
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            } else {
                                return (
                                    <ItemSimple
                                        key={`${title}-${key}-${key * 2}`}
                                        path={path}
                                        select={pathname === path ||
                                            pathname.includes(path) ? true : false}
                                        titulo={title}
                                        icon={icon}
                                    />
                                )
                            }
                        })
                    }

                </ul>
            </div>
        </aside>
    )
}

function ItemSimple({ select, path, titulo, icon }: { select: boolean, path: string, titulo: string, icon?: JSX.Element; }) {
    return (
        <li>
            <Button
                asChild
                className="w-full justify-start"
                variant={select ? "default" : "ghost"}>
                <Link href={path}>
                    <span className='mr-2'>{icon}</span>
                    {titulo}
                </Link>
            </Button>
        </li>
    )
}

function CardUser({ name, email }: { name: string; email: string; }) {
    return (
        <div className="flex justify-center">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <AvatarUser inicales={obtenerInicial(name)} />
                    <div>
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AvatarUser({ inicales }: { inicales: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                        <AvatarFallback>{inicales}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" forceMount>
                {/* <DropdownMenuItem>
                    Perfil
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => logout()}>
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function obtenerInicial(nombreCompleto: string): string {
    const palabras = nombreCompleto.split(' ');
    const iniciales = palabras.map(palabra => palabra.charAt(0).toUpperCase());
    return iniciales.join('');
}
