import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import SelectProductsByFilters from "@/Pages/Jewels/Components/SelectProductsByFilters";


export default function Index({jewels,categories,collections}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="jewels" />
            <Auth auth={auth} errors={errors} >
                <SelectProductsByFilters categories={categories} collections={collections}/>
                    <div className=" rounded pt-6 px-6 overflow-hidden shadow-xl">
                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                <tr className="divide-x divide-y divide-gray-200">
                                <th  width="25%" className="text-gray-900 p-2">Image</th>
                                <th  className="text-gray-900 p-2">Categoria</th>
                                <th  className="text-gray-900 p-2">Coleção</th>
                                <th  width="30%" className="text-gray-900 p-2">Nome</th>
                                <th  width="30%" className="text-gray-900 p-2">Products</th>
                                <th  className="text-gray-900 p-2">
                                    <Link href={route('jewels.create')}
                                          className="mt-3 w-full block items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                       criar
                                    </Link>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                            {jewels.map((jewel) => (
                                <tr key={jewel.id} className="divide-x divide-y divide-gray-200">
                                    <td className="text-sm p-2">
                                        <Link href={route('jewels.images.index',{jewel:jewel.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            <img className="w-24 h-24  flex-shrink-0"
                                                 src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+jewel.images[0]?.path}/>
                                        </Link>
                                    </td>
                                    <td className="text-sm p-2">
                                        <Link href={route('jewels.edit',{id:jewel.id})}>
                                            {jewel.category.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm p-2">
                                        <Link href={route('jewels.edit',{id:jewel.id})}>
                                            {jewel.collection.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm p-2">
                                        <Link href={route('jewels.edit',{id:jewel.id})}>
                                            {jewel.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm p-2 text-center">
                                     Productos: {jewel.products.length}
                                    </td>
                                    <td className="text-sm p-2 text-center">
                                        <Link href={route('product.jewel_products.index',{jewel:jewel.id})}
                                              className="rounded bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            produtos
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
            </Auth>
        </>
    );
}
