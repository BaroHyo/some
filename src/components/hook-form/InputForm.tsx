"use client"


import React from 'react'
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input, InputProps } from '../ui/input';


interface Props extends InputProps {
    name: string,
    label?: string,
    type?: string,
}

export const InputForm = ({ name = 'text', label, type, ...other }: Props) => {

    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormItem>
                        {
                            label && (
                                <FormLabel>{label}</FormLabel>
                            )
                        }
                        <FormControl>
                            <Input
                                {...field}
                                type={type}
                                value={(type === "number" && field.value === 0) ? "" : (field.value || "")}
                                onChange={(event) => {
                                    if (type === "number") {
                                        field.onChange(Number(event.target.value));
                                    } else {
                                        field.onChange(event.target.value);
                                    }
                                }}
                                {...other}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
