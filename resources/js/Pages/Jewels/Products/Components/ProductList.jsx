import {Link} from '@inertiajs/react';
import React from "react";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import ModalChangePrice from "@/Pages/Jewels/Products/Components/ModalChangePrice";
import ModalStorePrice from "@/Pages/Jewels/Products/Components/ModalStorePrice";
import SlideGolds from "@/Pages/Jewels/Products/Components/SlideGolds";
import SlideGems from "@/Pages/Jewels/Products/Components/SlideGems";

export default function ProductList({products,golds,gems,jewel}) {

    function price(product) {
        if (product.stock?.offered_price) {
            return <ModalChangePrice product={product}/>
        }else{
            return <ModalStorePrice product={product}/>
        }
    }

    return (
        <>
            <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                <tr className="divide-x divide-y divide-gray-200">
                    <th  className="text-gray-900 font-medium p-2 py-6">Ids</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Img</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Name</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Valor</th>
                    <th  colSpan={4} className="text-gray-900 font-medium p-2 py-6">
                       Action
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-x divide-gray-200 bg-white">
                {products.map((product) => (
                    <tr key={product.id} className="divide-x divide-y divide-gray-200">
                        <td className="text-sm p-2">
                            <Link href={route('product.edit',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                ID: {product.id}
                            </Link>
                            <br/>
                            <Link href={route('product.edit',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                SKU: {product.sku}
                            </Link>
                            <br/>
                            <Link href={route('product.edit',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                TINY ID: {product.tiny_id}
                            </Link>
                        </td>
                        <td className="text-sm p-2">
                            <Link href={route('product.images.index',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <img className="w-14 h-14  flex-shrink-0"
                                 src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+product.images[0]?.path}/>
                            </Link>

                        </td>
                        <td className="text-sm p-2">
                            <Link href={route('product.edit',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                {product.name}
                            </Link>
                        </td>
                        <td className="text-sm p-2">
                            { price(product)}
                        </td>
                        <td className="text-sm p-2 text-center">
                            <SlideGolds product={product} golds={golds}/>
                        </td>
                        <td className="text-sm p-2 text-center">
                            <SlideGems product={product} gems={gems}/>
                        </td>
                        <td className="text-sm text-center items-center justify-center p-2">
                            <Link href={route('product.edit',{product:product.id})}
                                  className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <PencilSquareIcon
                                    className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                <span className="text-gray-500 group-hover:text-gray-700 text-xs">editar</span>
                            </Link>
                        </td>
                        <td className="text-sm text-center items-center justify-center p-2">
                            <Link href={route('product.show',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                show
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>

    );
}
