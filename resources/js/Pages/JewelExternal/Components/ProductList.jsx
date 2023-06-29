import {Link} from '@inertiajs/react';
import React from "react";

export default function ProductList({jewel_externals}) {


    return (
        <>
            <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                <tr className="divide-x divide-y divide-gray-200">
                    <th  className="text-gray-900 p-2 py-6">Img</th>
                    <th  className="text-gray-900 p-2 py-6">Name</th>
                    <th  colSpan= "3" className="text-gray-900 p-2 py-6">
                        <Link href={route('jewel.external.create')} className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            NOVO
                        </Link>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-x divide-gray-200 bg-white">
                {jewel_externals.map((jewel) => (
                    <tr key={jewel.id} className="divide-x divide-y divide-gray-200">
                        <td className="text-sm p-2">
                            <Link href={route('jewel.external.images.index',{jewel:jewel.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img className="w-14 h-14  flex-shrink-0"
                                 src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+jewel.images[0]?.path}/>
                            </Link>

                        </td>
                        <td className="text-sm p-2">
                            <Link href={route('jewel.external.edit',{jewel:jewel.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                {jewel.name}
                            </Link>
                        </td>
                        <td className="text-sm text-center items-center justify-center p-2">
                            <Link href={route('jewel.external.edit',{jewel:jewel.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                editar
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>

    );
}
