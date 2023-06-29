import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import {XMarkIcon} from '@heroicons/react/24/outline'
import SlideAdd from "@/Pages/Service/External/Items/Components/SlideAdd";
import SlideCreateProductImages from "@/Pages/Service/External/Items/Components/SlideCreateProductImages";

export default function Show({service, service_items,user,products,categories,types}) {

    const {auth} = usePage().props
    const {errors} = usePage().props

    return (
        <>
            <Head title="Services"/>
            <Auth auth={auth} errors={errors}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow mt-6 p-4 flex flex-row">
                        <div className="basis-2/3">
                            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Ordem de Serviço - outras marcas - Joias para ajuste <br/><small className="text-teal-700">{user.name}</small></h2>
                        </div>
                        <div className="basis-1/3">
                            <div className="float-right">
                              <SlideAdd  service={service} products={products} categories={categories}/>
                            </div>
                        </div>
                    </div>
                    <div className=" rounded py-6 px-6 overflow-hidden shadow-xl">
                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                <tr className="divide-x divide-y divide-gray-200">
                                <th className="text-red-900 text-sm p-2">Destroy</th>
                                <th className="text-gray-900 p-2">Imagem</th>
                                <th className="text-gray-900 p-2">Name</th>
                                <th className="text-gray-900 p-2">Entrada</th>
                                <th className="text-gray-900 p-2">Previsão</th>
                                <th className="text-gray-900 p-2">Obs</th>
                                <th className="text-gray-900 p-2">Ações</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                            {service_items.map((item) => (
                                <tr key={item.id} className="divide-x divide-y divide-gray-200">
                                    <td className="text-xs justify-center p-2">
                                        <Link className="justify-center" href={route('service_items.external.destroy',{id:item.id, service:item.service_id})}>
                                            <XMarkIcon className="h-4 w-4 text-red-800" aria-hidden="true"/>
                                        </Link>
                                    </td>
                                    <td className="text-xs p-2">
                                        <SlideCreateProductImages product={item.jewel_external} images={item.jewel_external.images} types={types} />
                                    </td>
                                    <td className="text-xs p-2">
                                        <Link href={route('service_items.external.edit',{id:item.id})}>
                                            {item.jewel_external.name}
                                        </Link>
                                    </td>
                                    <td className="text-xs p-2">
                                        <Link href={route('service_items.external.edit',{id:item.id})}>
                                        {item.date?.split('-').reverse().join('-')}
                                        </Link>
                                    </td>
                                    <td className="text-xs p-2">
                                        <Link href={route('service_items.external.edit',{id:item.id})}>
                                            {item.date_shipping?.split('-').reverse().join('-')}
                                        </Link>
                                    </td>
                                    <td className="text-xs p-2">
                                        <Link href={route('service_items.external.edit',{id:item.id})}>
                                            {item.description}
                                        </Link>
                                    </td>
                                    <td className="text-xs p-2">
                                        <Link href={route('service_items.external.edit',{id:item.id})}
                                              className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <table className="mt-40 border min-w-full divide-y divide-x divide-gray-200">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                <tr className="divide-x divide-y divide-gray-200">
                                    <td className="text-sm p-2">
                                     IMPRIMIR
                                    </td>
                                    <td className="text-sm p-2">
                                        <a href={route('service.summary',{id:service.id})}
                                           className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Resumido
                                        </a>
                                    </td>
                                    <td className="text-sm p-2">
                                        <a href={route('service.full',{id:service.id})}
                                              className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Completo
                                        </a>
                                    </td>
                                    <td className="text-sm p-2">
                                        <a href={route('service.images',{id:service.id})}
                                              className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Images
                                        </a>
                                    </td>
                                    <td className="text-sm p-2 text-right">
                                        <Link
                                            className="rounded w-full inline-flex bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                            href={route('service.external.finished',{id:service.id})}>
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
                        <Link href={route('service.external.index')}
                              className="shadow-xl float-right mt-3 w-full  items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-600 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:text-sm">
                            Voltar
                        </Link>
                    </div>
                </div>
            </Auth>
        </>
    );
}
