import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';


export default function Index({suppliers}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
       <>
           <Head title="suppliers" />
           <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow mt-6 p-4 flex flex-row">
                        <div className="basis-2/3">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Suppliers</h2>
                        </div>
                        <div className="basis-1/3">
                            <div className="float-right">
                                <Link className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                      href={route('supplier.create')}>
                                    Create
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" rounded pt-6 px-6 overflow-hidden shadow-xl">
                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                       <tr className="divide-x divide-y divide-gray-200">
                           <th  className="text-gray-900 p-2">ID</th>
                           <th  className="text-gray-900 p-2">Name</th>
                           <th  className="text-gray-900 p-2">Cel</th>

                       </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {suppliers.map((supplier) => (
                           <tr key={supplier.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-sm p-2">
                                   <Link href={route('supplier.edit',{id:supplier.id})}>
                                       {supplier.id}
                                   </Link>
                               </td>
                               <td className="text-sm p-2">
                                   <Link href={route('supplier.edit',{id:supplier.id})}>
                                   {supplier.name}
                                   </Link>
                               </td>
                               <td className="text-sm p-2">
                                   <Link href={route('supplier.edit',{id:supplier.id})}>
                                   {supplier.cel}
                                   </Link>
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
