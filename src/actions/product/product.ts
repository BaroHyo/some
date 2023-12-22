'use server';

import { auth } from "@/auth.config";
import { paths } from "@/config/paths";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface IInset {
    categoryId?: string | undefined;
    cantidad?: number | undefined;
    descripcionEn?: string | undefined;
    descripcionEs?: string | undefined;
    origen?: string | undefined;
    stateId?: string | undefined;
    marca?: string | undefined;
    precioTm?: number | undefined;
    pesoKg?: number | undefined
    pesoLibras?: number | undefined
    totalPrecio?: number | undefined

}

export const createProduct = async (values: IInset) => {
    try {

        const session = await auth();

        const newProducto = await prisma.product.create({
            data: {
                categoryId: values.categoryId ?? '',
                cantidad: values.cantidad ?? 0,
                descripcionEn: values.descripcionEn ?? '',
                descripcionEs: values.descripcionEs ?? '',
                origen: values.origen ?? '',
                stateId: values.stateId ?? '',
                marca: values.marca ?? '',
                precioTm: values.precioTm ?? 0,
                pesoKg: values.pesoKg ?? 0,
                pesoLibras: values.pesoLibras ?? 0,
                totalPrecio: values.totalPrecio ?? 0,
                userId: session?.user?.id ?? ''
            }
        });

        revalidatePath(paths.show.product.root);

        return {
            ok: true,
            data: newProducto
        }

    } catch (error) {
        return {
            ok: false,
            message: `Error al insertar: ${error}`
        }
    }
}

interface IUpdate {
    id: string;
    categoryId?: string | undefined;
    cantidad?: number | undefined;
    descripcionEn?: string | undefined;
    descripcionEs?: string | undefined;
    origen?: string | undefined;
    stateId?: string | undefined;
    marca?: string | undefined;
    precioTm?: number | undefined;
    pesoKg?: number | undefined
    pesoLibras?: number | undefined
    totalPrecio?: number | undefined
}

export const UpdateProduct = async (value: IUpdate) => {
    try {
        const {
            id,
            categoryId,
            cantidad,
            descripcionEn,
            descripcionEs,
            origen,
            stateId,
            marca,
            precioTm,
            pesoKg,
            pesoLibras,
            totalPrecio
        } = value

        const persona = await prisma.product.findFirst({ where: { id } });

        if (!persona) {
            throw `Producto con id ${id} no encontrado`;
        }

        const updatedPersona = await prisma.product.update({
            where: { id },
            data: {
                categoryId: categoryId ?? '',
                cantidad: cantidad ?? 0,
                descripcionEn: descripcionEn ?? '',
                descripcionEs: descripcionEs ?? '',
                origen: origen ?? '',
                stateId: stateId ?? '',
                marca: marca ?? '',
                precioTm: precioTm ?? 0,
                pesoKg: pesoKg ?? 0,
                pesoLibras: pesoLibras ?? 0,
                totalPrecio: totalPrecio ?? 0,
            }
        });

        revalidatePath(paths.show.product.root);

        return {
            ok: true,
            data: updatedPersona
        }


    } catch (error) {
        return {
            ok: false,
            message: `Error al insertar: ${error}`
        }
    }
}

export const getProduct = async (id: string) => {
    try {

        const products = await prisma.product.findMany({
            where: {
                userId: id
            },
            select: {
                id: true,
                categoryId: true,
                category: {
                    select: {
                        nombre: true,
                    }
                },
                cantidad: true,
                descripcionEn: true,
                descripcionEs: true,
                origen: true,
                stateId: true,
                state: {
                    select: {
                        codigo: true,
                    }
                },
                marca: true,
                precioTm: true,
                pesoKg: true,
                pesoLibras: true,
                totalPrecio: true,
            }
        });

        const response = products.map(item => {

            const { category: _, state: __, ...rest } = item;

            return {
                ...rest,
                category: item.category?.nombre || null,
                state: item.state?.codigo || null,
            }
        });

        return {
            ok: true,
            data: response
        }

    } catch (error) {
        return {
            ok: false,
            message: `No se pudo cargar product: ${error}`
        }
    }
}

export const getProductById = async (id: string) => {
    try {
        const response = await prisma.product.findFirst({
            where: {
                id
            },
        });

        return {
            ok: true,
            data: response
        }

    } catch (error) {
        return {
            ok: false,
            message: `No se pudo cargar product: ${error}`
        }
    }
}

export const deleteProduc = async (id: string) => {
    try {

        const response = await prisma.product.delete({
            where: {
                id
            }
        });

        revalidatePath(paths.show.product.root);

        return {
            ok: true,
            data: response
        }
    } catch (error) {
        return {
            ok: false,
            message: `No se pudo cargar product: ${error}`
        }
    }
}

