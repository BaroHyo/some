'use server';

import prisma from "@/lib/db";

export const getState = async () => {
    try {
         const response = await prisma.state.findMany({
            select: {
                id: true,
                codigo: true
            }
        });

        return response;

    } catch (error) {
        throw new Error("No se pudo cargar los datos del state.");

    }
}