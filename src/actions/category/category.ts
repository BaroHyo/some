'use server';

import prisma from "@/lib/db";

export const getCategory = async () => {
    try {
         const response = await prisma.category.findMany({
            select: {
                id: true,
                nombre: true
            }
        });

        return response;

    } catch (error) {
        throw new Error("No se pudo cargar los datos del category.");

    }
}