import React from 'react'
import { CustomBreadcrumbs } from '@/components'
import { paths } from '@/config/paths'
import FormProduct from '../ui/FormProduct'
import { getCategory, getState } from '@/actions'

export default async function NewProduct() {

    const category = await getCategory();
    const state = await getState();

    return (
        <div className="container">
            <CustomBreadcrumbs
                heading="New Product"
                links={[
                    { name: 'Home', href: paths.show.root },
                    { name: 'List Product', href: paths.show.product.root },
                    { name: 'New' },
                ]}
                className='mb-3 md:mb-5'
            />
            <FormProduct
                category={category}
                state={state}
            />
        </div>
    )
}
