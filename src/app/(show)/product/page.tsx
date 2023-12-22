import React from 'react'
import Link from 'next/link'
import { CustomBreadcrumbs } from '@/components'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { getProduct } from '@/actions'
import TableProduct from './ui/TableProduct'
import { auth } from '@/auth.config'

export default async function ProductPage() {

    const session = await auth();

    const { data } = await getProduct(session?.user?.id ?? '');


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
            <TableProduct data={data} />
        </div>
    )
}
