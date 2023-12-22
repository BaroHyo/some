"use client"


import React, { useState } from 'react';
import {
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"

 
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

 
import Link from 'next/link';
import { useBoolean } from '@/hooks/useBoolean';
import { deleteProduc } from '@/actions';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
 
  
export interface Props {
    data?: Payment[]
}

export type Payment = {
    category: string | null;
    state: string | null;
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
}

const ActionsCell = ({ row }: any) => {
    const { value, onToggle } = useBoolean(false);
    const payment = row.original;
  
    const handleEliminar = async (id: number) => {
      const { ok } = await deleteProduc(id);
      if (ok) {
        onToggle();
      }
    };
  
    const renderAlerta = (
      <AlertDialog open={value}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Registro?</AlertDialogTitle>
            <AlertDialogDescription>
              {`¿Está seguro de eliminar ${payment.descripcionEs}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onToggle}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleEliminar(payment.id)}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={paths.show.product.edit(payment.id.toString())}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onToggle}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {renderAlerta}
      </>
    );
  };

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "category",
        header: "Categoria",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "cantidad",
        header: "Cantidad",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("cantidad")}</div>
        ),
    },
    {
        accessorKey: "descripcionEn",
        header: "Descripcion Ingles",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("descripcionEn")}</div>
        ),
    },
    {
        accessorKey: "descripcionEs",
        header: "Descripcion Español",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("descripcionEs")}</div>
        ),
    },
    {
        accessorKey: "origen",
        header: "Origen",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("origen")}</div>
        ),
    },
    {
        accessorKey: "marca",
        header: "Marca",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("marca")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ActionsCell /*({ row }) => {

 
            const {value,onToggle} = useBoolean(false);

            const payment = row.original;


            const handleEliminar = async (id: number) => {
                const { ok } = await deleteProduc(id);
                if (ok) {
                    onToggle()
                }
            }



            const renderAlerta = (
                <AlertDialog open={value}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Eliminar Registro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {`Esta seguro de elminar ${payment.descripcionEs}`}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => onToggle()}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleEliminar(payment.id)}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );

              return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={paths.show.product.edit(payment.id.toString())}>Editar</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onToggle()}
                            >
                                Elminar
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    {renderAlerta}
                </>
            )
        },*/
    },
]



export default function TableProduct({ data = [] }: Props) {


    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">

            <div className="flex items-center py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Card>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No hay resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}
