import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';


export default function Index({services}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
       <>
           <Head title="Services" />
           <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow mt-6 p-4 flex flex-row">
                        <div className="basis-2/3">
                            <h2 className="text-gray-900">Ordens de Serviço - Venda CB</h2>
                        </div>
                        <div className="basis-1/3">
                            <div className="float-right">
                                <Link className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                      href={route('service.sales.user')}>
                                    Create
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" rounded pt-6 px-6 overflow-hidden shadow-xl">
                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                       <tr className="divide-x divide-y divide-gray-200">
                           <th  className="text-gray-900 text-xs p-2">Compra</th>
                           <th  width="30%" className="text-gray-900 text-xs p-2">Cliente</th>
                           <th  width="30%" className="text-gray-900 text-xs p-2">Local</th>
                           <th  width="20%" className="text-gray-900 text-xs p-2">Oficina</th>
                           <th  width="15%" className="text-gray-900 text-xs p-2">Data</th>
                           <th  width="15%" className="text-gray-900 text-xs p-2">Total</th>
                           <th  width="30%" className="text-gray-900 text-xs p-2">Obs</th>
                           <th  colSpan={3} className="text-gray-900 text-xs p-2">Ações</th>
                       </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {services.map((service) => (
                           <tr key={service.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-xs p-2">
                                   <Link href={route('service.sales.edit',{id:service.id})}>
                                    {service.order_id}
                                   </Link>
                               </td>
                               <td className="text-xs p-2">
                                   <Link href={route('service.sales.edit',{id:service.id})}>
                                    {service.user?.name}
                                   </Link>
                               </td>
                               <td className="text-xs p-2">
                                   {service.center?.name}
                               </td>
                               <td className="text-xs p-2">
                                   {service.manufacturer?.name}
                               </td>
                               <td className="text-xs p-2">
                                   {service.date?.split('-').reverse().join('-')}
                               </td>
                               <td className="text-xs p-2">
                                   {service.total}
                               </td>
                               <td className="text-xs p-2">
                                   {service.obs}
                               </td>
                               <td className="text-xs p-2">
                                   <Link href={route('service_items.sales.show',{id:service.id})}
                                         className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-xs text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                       detalhar
                                   </Link>
                               </td>
                               <td className="text-xs p-2">
                                   <a href={route('service.summary',{id:service.id})}
                                         className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-xs text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                       imprimir
                                   </a>
                               </td>
                               <td className="text-xs p-2">
                                   <a href={route('service.sales.finished',{id:service.id})}
                                      className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-xs text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                       finalizar
                                   </a>
                               </td>
                           </tr>
                       ))}
                       </tbody>
                   </table>
                    </div>
               </div>
           </Auth>
       </>
    );
}
