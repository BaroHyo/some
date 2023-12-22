'use server';

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

        const newProducto = await prisma.product.create({
            data: {
                categoryId: Number(values.categoryId) ?? 0,
                cantidad: values.cantidad ?? 0,
                descripcionEn: values.descripcionEn ?? '',
                descripcionEs: values.descripcionEs ?? '',
                origen: values.origen ?? '',
                stateId: Number(values.stateId) ?? 0,
                marca: values.marca ?? '',
                precioTm: values.precioTm ?? 0,
                pesoKg: values.pesoKg ?? 0,
                pesoLibras: values.pesoLibras ?? 0,
                totalPrecio: values.totalPrecio ?? 0,
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
    id: number;
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
                categoryId: Number(categoryId) ?? 0,
                cantidad: cantidad ?? 0,
                descripcionEn: descripcionEn ?? '',
                descripcionEs: descripcionEs ?? '',
                origen: origen ?? '',
                stateId: Number(stateId) ?? 0,
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

export const getProduct = async () => {
    try {

        const products = await prisma.product.findMany({
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

export const getProductById = async (id: number) => {
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

export const deleteProduc = async (id: number) => {
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

