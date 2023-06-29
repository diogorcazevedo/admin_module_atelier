import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon,MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import moment from "moment";



export default function SlideOrders({product,orders}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/*<button type="button"*/}
            {/*        className="rounded-md bg-white font-medium text-green-800 hover:text-green-700 p-2"*/}
            {/*        onClick={() => setOpen(true)}>*/}
            {/*    visualizar*/}
            {/*</button>*/}
            <button onClick={() => setOpen(true)}
                    className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <MagnifyingGlassCircleIcon
                    className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="text-gray-500 group-hover:text-gray-700 text-xs">visualizar</span>
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0" />
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
                                                    <Dialog.Title className="text-lg font-medium text-teal-600"> Compras do produto: {product.name} </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 justify-end">
                                                        <table className="border min-w-full divide-y divide-x divide-gray-200">
                                                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                                            <tr className="divide-x divide-y divide-gray-200">
                                                                <th  className="text-xs text-gray-900 p-2">Data</th>
                                                                <th  width="55%" className="text-xs text-gray-900 p-2">Cliente</th>
                                                                <th  className="text-xs text-gray-900 p-2">Valor</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                                            {orders?.map((data) => (
                                                                <tr key={data.id} className="divide-x divide-y divide-gray-200">
                                                                    <td className="text-xs p-2">{moment(data.data).format('DD/MM/YYYY')}</td>
                                                                    <td className="text-xs p-2">
                                                                        {data.order?.user.name}
                                                                    </td>
                                                                    <td className="text-xs p-2 text-center">
                                                                        {data.price}
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
