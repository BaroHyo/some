"use client"

import React from 'react'
import * as z from "zod";
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputForm, SelectForm } from '@/components';
import { Loader2 } from 'lucide-react';
import { UpdateProduct, createProduct } from '@/actions';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';


const FormSchema = z.object({

    categoryId: z.string().min(1, {
        message: "Requiere del campo",
    }),
    cantidad: z.number({
        required_error: "Requiere del campo.",
    }),
    descripcionEn: z.string().min(2, {
        message: "Requiere del campo",
    }),
    descripcionEs: z.string().min(2, {
        message: "Requiere del campo",
    }),
    origen: z.string().min(2, {
        message: "Requiere del campo",
    }),
    stateId: z.string().min(1, {
        message: "Requiere del campo",
    }),
    marca: z.string().min(2, {
        message: "Requiere del campo",
    }),
    precioTm: z.number({
        required_error: "Requiere del campo.",
    }),
    pesoKg: z.number({
        required_error: "Requiere del campo.",
    }),
    pesoLibras: z.number({
        required_error: "Requiere del campo.",
    }),
    totalPrecio: z.number({
        required_error: "Requiere del campo.",
    }),
});

interface Props {
    category: Category[];
    state: State[];
    currentProduct?: {
        id: number;
        categoryId: number;
        cantidad: number;
        descripcionEn: string;
        descripcionEs: string;
        origen: string;
        stateId: number;
        marca: string;
        precioTm: number;
        pesoKg: number;
        pesoLibras: number;
        totalPrecio: number;
    } | null | undefined
}

interface Category {
    id: number;
    nombre: string;
}

interface State {
    id: number;
    codigo: string;
}

export default function FormProduct({ category, state, currentProduct }: Props) {


    const methods = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            categoryId: currentProduct?.categoryId.toString() || '',
            cantidad: currentProduct?.cantidad || 0,
            descripcionEn: currentProduct?.descripcionEn || '',
            descripcionEs: currentProduct?.descripcionEs || '',
            origen: currentProduct?.origen || '',
            stateId: currentProduct?.stateId.toString() || '',
            marca: currentProduct?.marca || '',
            precioTm: currentProduct?.precioTm || 0,
            pesoKg: currentProduct?.pesoKg || 0,
            pesoLibras: currentProduct?.pesoLibras || 0,
            totalPrecio: currentProduct?.totalPrecio || 0,
        }
    });

    const { toast } = useToast();
    const router = useRouter();

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (data: z.infer<typeof FormSchema>) => {

        if (currentProduct) {
            const { ok } = await UpdateProduct({
                ...data,
                id: currentProduct.id
            });
            if (ok) {
                toast({
                    description: "Update Exitoso",
                })
                router.back();
            }

        } else {

            const { ok } = await createProduct(data);
            if (ok) {
                toast({
                    description: "Registro Exitoso",
                })
                router.back();
            }
        }






    });

    const renderForm = (
        <Card>
            <CardContent className='p-4 px-4 md:p-8 mb-6'>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Details</p>
                        <p>Please fill out all the fields.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <SelectForm
                                    label="Categoria"
                                    name="categoryId"
                                    options={category}
                                    placeholder="Seleccione una opcion"
                                    labelKey="nombre"
                                    valueKey="id"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm type='number' name='cantidad' label='Cantidad' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm name='descripcionEn' label='Descripcion Ingles' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm name='descripcionEs' label='Descripcion Español' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm name='origen' label='Origen' />
                            </div>
                            <div className="md:col-span-2">
                                <SelectForm
                                    label="Estado"
                                    name="stateId"
                                    options={state}
                                    placeholder="Seleccione una opcion"
                                    labelKey="codigo"
                                    valueKey="id"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm name='marca' label='Marca' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm type='number' name='precioTm' label='Precio Unitario $us' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm type='number' name='pesoKg' label='Peso Kg' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm type='number' name='pesoLibras' label='Peso Libras' />
                            </div>
                            <div className="md:col-span-2">
                                <InputForm type='number' name='totalPrecio' label='Precio Total' />
                            </div>
                            <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                    <Button type='submit' className='w-full' disabled={isSubmitting}>
                                        {
                                            isSubmitting && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )
                                        }
                                        {currentProduct ? 'actualiar' : 'Guardar'}

                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )


    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>
                {renderForm}
            </form>
        </Form>
    )
}


 