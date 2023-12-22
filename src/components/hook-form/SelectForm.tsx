"use client"

import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SelectGroup, SelectProps } from '@radix-ui/react-select';

interface Props<T> extends SelectProps {
    name: string,
    label: string,
    placeholder: string,
    options: T[];
    labelKey: keyof T;
    valueKey: keyof T;
    onChange?: (value: string) => void; // Nueva prop onChange

}

export const SelectForm = memo(<T extends Record<string, any>>({
    name,
    label,
    placeholder,
    options,
    labelKey,
    valueKey,
    onChange,
    ...other
}: Props<T>) => {

    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => {

                const handleChange = (value: string) => {
                    // Llama a la función onChange si está definida
                    if (onChange) {
                        onChange(value);
                    }

                    // Llama a field.onChange para actualizar el valor del campo
                    field.onChange(value);
                };


                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select
                            onValueChange={handleChange}
                            defaultValue={field.value}
                            {...other}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        options.map((option) => (
                                            <SelectItem
                                                key={option[valueKey].toString()}
                                                value={option[valueKey].toString()}
                                            >
                                                {option[labelKey].toString()}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
});

SelectForm.displayName = 'SelectForm';
