import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import SelectProductsByFilters from "@/Pages/Service/External/Items/Components/SelectProductsByFilters";
import SlideCreateProduct from "@/Pages/Service/External/Items/Components/SlideCreateProduct";
import SlideCreateProductImages from "@/Pages/Service/External/Items/Components/SlideCreateProductImages";
import {Link} from "@inertiajs/react";

export default function SlideAdd({service,products,categories,types}) {
    const [open, setOpen] = useState(false)


    return (
        <>
            <button
                type="button"
                className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                Adicionar Produto
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0"/>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-teal-600">
                                                        Adicionar Itens
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="grid grid-cols-1 gap-4 justify-end">
                                                        <div className="shadow mt-6 p-4 flex flex-row">
                                                            <div className="basis-2/3">
                                                                {/*<h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Adicionar Item </h2>*/}
                                                            </div>
                                                            <div className="basis-2/3">
                                                                <SlideCreateProduct categories={categories}/>
                                                            </div>
                                                        </div>
                                                        <SelectProductsByFilters service={service} categories={categories}/>
                                                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                                                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                                                <tr className="divide-x divide-y divide-gray-200">
                                                                <th  width="25%" className="text-gray-900 p-2">Image</th>
                                                                <th  className="text-gray-900 p-2">Categoria</th>
                                                                <th  width="30%" className="text-gray-900 p-2">Nome</th>
                                                                <th  className="text-gray-900 p-2">Ações</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                                            {products.map((product) => (
                                                                <tr key={product.id} className="divide-x divide-y divide-gray-200">
                                                                    <td className="text-sm p-2">
                                                                        <SlideCreateProductImages product={product} images={product.images?product.images:''} types={types} />
                                                                    </td>
                                                                    <td className="text-sm p-2">
                                                                            {product.category.name}
                                                                    </td>
                                                                    <td className="text-sm p-2">
                                                                            {product.name}
                                                                    </td>
                                                                    <td className="text-sm p-2 text-center">
                                                                        <Link href={route('service_items.external.add',{service_id:service.id, product_id:product.id})}
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
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
