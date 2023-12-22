import React from 'react'
import { CustomBreadcrumbs } from '@/components'
import { paths } from '@/config/paths'
import { getCategory, getProductById, getState } from '@/actions'
import FormProduct from '../../ui/FormProduct';

export default async function EditProduct({ params }: { params: { id: string } }) {

    const { id } = params;

    const { data } = await getProductById(Number(id));

    const category = await getCategory();
    const state = await getState();

    return (
        <div className="container">
            <CustomBreadcrumbs
                heading="New Product"
                links={[
                    { name: 'Home', href: paths.show.root },
                    { name: 'List Product', href: paths.show.product.root },
                    { name: `Edit ${data?.descripcionEs}` },
                ]}
                className='mb-3 md:mb-5'
            />
            <FormProduct
                category={category}
                state={state}
                currentProduct={data}
            />
        </div>
    )
}
