import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import SelectUsersByFilters from "@/Pages/Service/Components/SelectUsersByFilters";

export default function Index({users}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
       <>
           <Head title="Services" />
           <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SelectUsersByFilters rte='service.sales.user'/>
                    <div className=" rounded pt-6 px-6 overflow-hidden shadow-xl">
                    <table className="border min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                           <tr className="divide-x divide-y divide-gray-200">
                               <th  className="text-gray-900 text-xs p-2">ID</th>
                               <th  width="70%" className="text-gray-900 text-xs p-2">Cliente</th>
                               <th  className="text-gray-900 text-xs p-2">Ações</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {users.map((user) => (
                           <tr key={user.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-xs p-2">
                                   {user.id}
                               </td>
                               <td className="text-xs p-2">
                                   {user.name}
                               </td>
                               <td className="text-xs p-2">
                                   <Link href={route('service.sales.create',{user:user.id})}
                                         className="rounded w-full inline-flex bg-teal-600 hover:bg-teal-700 shadow-sm font-medium rounded-md px-2 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                       add
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
