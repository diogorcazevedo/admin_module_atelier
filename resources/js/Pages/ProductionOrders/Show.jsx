import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import _ from "lodash";

export default function Show({production_order, production_order_items}) {

    const {auth} = usePage().props
    const {errors} = usePage().props
    const items = _.groupBy(production_order_items, 'product_id')

    return (
        <>
            <Head title="production orders"/>
            <Auth auth={auth} errors={errors}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow mt-6 p-4 flex flex-row">
                        <div className="basis-2/3">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Pedidos  de Produção</h2>
                        </div>
                        <div className="basis-1/3">
                            <div className="float-right">
                                <Link
                                    className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                    href={route('production.orders.edit',{id:production_order.id})}>
                                    Editar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" rounded py-6 px-6 overflow-hidden shadow-xl">
                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                            <tr className="divide-x divide-y divide-gray-200">
                                <th className="text-gray-900 p-2">Imagem</th>
                                <th className="text-gray-900 p-2">Name</th>
                                <th className="text-gray-900 p-2">Produto</th>
                                <th className="text-gray-900 p-2">Id</th>
                                <th className="text-gray-900 p-2">Quantidade</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                            {Object.values(items).map((item, key) => {
                                return <tr key={key} className="divide-x divide-y divide-gray-200">
                                    <th className="text-gray-700 p-2 text-sm font-light">
                                        <Link href={route('product.images.index',{id:item[0].product_id})}>
                                            <img className="w-14 h-14  flex-shrink-0"
                                                 src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/" + item[0].product.images[0]?.path}/>
                                        </Link>
                                    </th>
                                    <th className="text-gray-700 p-2 text-sm font-light">{item[0].jewel.name}</th>
                                    <th className="text-gray-700 p-2 text-sm font-light left-0 text-left">{item[0].product.name}</th>
                                    <th className="text-gray-700 p-2 text-sm font-light">{item[0].product_id}</th>
                                    <th className="text-gray-700 p-2 text-sm font-light">{item.length}</th>
                                </tr>
                            })}
                            </tbody>
                        </table>

                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                <tr className="divide-x divide-y divide-gray-200">
                                    <td className="text-sm p-2">
                                     IMPRIMIR
                                    </td>
                                    <td className="text-sm p-2">
                                        <a href={route('production.orders.summary',{id:production_order.id})}
                                           className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Resumido
                                        </a>
                                    </td>
                                    <td className="text-sm p-2">
                                        <a href={route('production.orders.full',{id:production_order.id})}
                                              className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Completo
                                        </a>
                                    </td>

                                    <td className="text-sm p-2">
                                        <a href={route('production.orders.images',{id:production_order.id})}
                                              className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Images
                                        </a>
                                    </td>
                                    <td className="text-sm p-2 text-right">
                                        <Link
                                            className="rounded w-full inline-flex bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                            href={route('production.orders.finished',{id:production_order.id})}>
                                            finalizar
                                        </Link>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className="shadow mt-6 p-4 flex flex-row-reverse">
                    <div className="basis-1/3">
                        <Link href={route('production.orders.index')}
                              className="shadow-xl float-right mt-3 w-full  items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:text-sm">
                            Voltar
                        </Link>
                    </div>
                </div>
            </Auth>
        </>
    );
}
