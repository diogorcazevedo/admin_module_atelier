import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import SelectProductsByFilters from "@/Pages/ProductionOrders/Products/SelectProductsByFilters";
import SlideAdd from "@/Pages/ProductionOrders/Products/SlideAdd";
import _ from "lodash";


export default function Edit({jewels,categories,collections,production_order,production_order_items}) {

    const {auth} = usePage().props
    const { errors } = usePage().props
    const items = _.groupBy(production_order_items, 'product_id')

    return (
        <>
            <Head title="production orders" />
            <Auth auth={auth} errors={errors} >
                <main>
                    <SelectProductsByFilters categories={categories} collections={collections} production_order={production_order}/>
                    <div className="flex flex-row">
                        <div className="basis-3/4">
                            <div className="p-4">
                                {/*<SelectProductsByFilters categories={categories} collections={collections} production_order={production_order}/>*/}
                                <table className="py-6 border min-w-full divide-y divide-x divide-gray-200">
                                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                    <tr className="divide-x divide-y divide-gray-200">
                                        <th  className="text-gray-900 p-2">Image</th>
                                        <th  width="35%" className="text-gray-900 p-2">Nome</th>
                                        <th  className="text-gray-900 p-2">Produtos</th>
                                        <th  className="text-gray-900 p-2">
                                            Ação
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                    {jewels.map((jewel) => (
                                        <tr key={jewel.id} className="divide-x divide-y divide-gray-200">
                                            <td className="text-sm p-2">
                                                <Link href={route('jewels.images.index',{jewel:jewel.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                                    <img className="w-10 h-10  flex-shrink-0"
                                                         src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+jewel.images[0]?.path}/>
                                                </Link>
                                            </td>
                                            <td className="text-xs p-2">
                                                <Link href={route('jewels.edit',{id:jewel.id})}>
                                                    {jewel.name}
                                                </Link>
                                            </td>
                                            <td className="text-xs p-2 text-center">
                                               Produtos: {jewel.products.length}
                                            </td>
                                            <td className="text-sm p-2 text-center">
                                                <SlideAdd jewel={jewel} production_order={production_order}/>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="basis-1/4">
                            <div className="p-4">
                                {/*<div className="shadow mt-8 p-8 flex flex-row">*/}
                                {/*    <h2 className="text-base font-semibold leading-7 text-teal-800">Activity feed</h2>*/}
                                {/*</div>*/}
                                <table className="border min-w-full divide-y divide-x divide-gray-200">
                                    <thead className="bg-teal-900 divide-y divide-x divide-gray-200">
                                    <tr className="divide-x divide-y divide-gray-200">
                                        <th className="text-white text-sm font-light p-2">Imagem</th>
                                        <th className="text-white text-sm font-light p-2">Name</th>
                                        <th className="text-white text-sm font-light p-2">Quantidade</th>
                                        <th className="text-white text-sm font-light p-2">Remove</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                    {Object.values(items).map((item, key) => {
                                        return <tr key={key} className="divide-x divide-y divide-gray-200">
                                            <th className="text-gray-700 p-2 text-sm font-light">
                                                <Link href={route('product.images.index',{id:item[0].product_id})}>
                                                    <img className="w-10 h-10  flex-shrink-0"
                                                         src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/" + item[0].product.images[0]?.path}/>
                                                </Link>
                                            </th>
                                            <th className="text-gray-700 p-2 text-xs font-light left-0 text-left">{item[0].product.name}</th>
                                            <th className="text-gray-700 p-2 text-xs font-light">{item.length}</th>
                                            <th className="text-gray-700 p-2 text-xs font-light">
                                                <Link href={route('production.orders.destroy',{product_id:item[0].product_id,production_order_id:item[0].production_order_id})} className="text-sm font-light leading-6 text-red-800">
                                                    remove
                                                </Link>
                                            </th>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                                <div className="shadow mt-6 p-4 flex flex-row-reverse">
                                    <div className="basis-1/3">
                                        <Link href={route('production.orders.index')}
                                              className="shadow-xl float-right mt-3 w-full  items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:text-sm">
                                            finalizar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               </main>
            </Auth>
        </>
    );
}
