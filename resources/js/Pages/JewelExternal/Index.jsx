import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SelectProductsByFilters from "@/Pages/JewelExternal/Components/SelectProductsByFilters";
import ProductList from "@/Pages/JewelExternal/Components/ProductList";



export default function Index({jewel_externals,categories}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Jewels" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SelectProductsByFilters categories={categories}/>
                    <ProductList products={jewel_externals}/>
                </div>
            </Auth>
        </>
    );
}
