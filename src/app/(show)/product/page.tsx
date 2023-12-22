import React from 'react'
import Link from 'next/link'
import { CustomBreadcrumbs } from '@/components'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { getProduct } from '@/actions'
import TableProduct from './ui/TableProduct'

export default async function ProductPage() {

    const { data } = await getProduct();

     
    return (
        <div className="container">
            <CustomBreadcrumbs
                heading="Product"
                links={[
                    { name: 'Home', href: paths.show.root },
                    { name: 'Product', href: paths.show.product.root },
                    { name: 'List' },
                ]}
                action={
                    <Button asChild>
                        <Link href={paths.show.product.new}>
                            Nuevo
                        </Link>
                    </Button>
                }
                className='mb-3 md:mb-5'
            />
            <TableProduct data={data}/>
        </div>
    )
}
