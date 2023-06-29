import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon,PencilSquareIcon } from '@heroicons/react/24/outline'
import {useForm,Link} from '@inertiajs/react';



export default function SlideGolds({product, golds}) {
    const [open, setOpen] = useState(false)

    const {data, setData, post, processing, errors} = useForm({
        gold_id: "",
        product_id: product.id,
        quantity: "",
    })
    function submit(e) {
        e.preventDefault()
        post(route("product.gold.add"));
    }

    return (
        <>
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"*/}
            {/*    onClick={() => setOpen(true)}*/}
            {/*>*/}
            {/*    Ouro*/}
            {/*</button>*/}
            <button onClick={() => setOpen(true)}
                    className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <PencilSquareIcon
                    className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="text-gray-500 group-hover:text-gray-700 text-xs">Ouro</span>
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
                                                    <Dialog.Title className="text-lg font-medium text-teal-600"> COR DO OURO </Dialog.Title>
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
                                                        <form onSubmit={submit}>
                                                            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                                <div className="mt-6 grid grid-cols-2 gap-4">
                                                                    <div className="">
                                                                        <label htmlFor="gold_id" className="block text-sm font-medium text-gray-700">
                                                                            Cor do ouro
                                                                        </label>
                                                                        <select name="gold_id"
                                                                                required="required"
                                                                                id="gold_id"
                                                                                onChange={e => setData('gold_id', e.target.value)}
                                                                                value={data.gold_id}
                                                                                className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                                                        >
                                                                            <option>-</option>
                                                                            {golds.map((gold, index) => {
                                                                                return (
                                                                                    <option key={index} value={gold.id}>
                                                                                        {gold.name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                        {errors.gold_id && <div className="text-red-600">{errors.gold_id}</div>}
                                                                    </div>
                                                                </div>
                                                                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                                            Quantidade (gramas)
                                                                        </label>
                                                                        {errors.quantity && <div>{errors.quantity}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="quantity"
                                                                                value={data.quantity}
                                                                                onChange={e => setData('quantity', e.target.value)}
                                                                                name="quantity"
                                                                                autoComplete="quantity"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-16 grid grid-cols-3  gap-4 sm:items-end">

                                                                    <div></div>
                                                                    <div></div>
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
                                                                        disabled={processing}>
                                                                        Salvar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-6">
                                                <table className="border min-w-full divide-y divide-x divide-gray-200">
                                                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                                    <tr className="divide-x divide-y divide-gray-200">
                                                        <th  width="40%" className="text-gray-900 p-2">Producto</th>
                                                        <th  width="40%" className="text-gray-900 p-2">Quantidade (gramas)</th>
                                                        <th  className="text-gray-900 p-2">
                                                            Excluir
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                                    {product.golds?.map((data) => (
                                                        <tr key={data.id} className="divide-x divide-y divide-gray-200">
                                                            <td className="text-sm p-2">
                                                                {data.gold?.name}
                                                            </td>
                                                            <td className="text-sm p-2">
                                                                {data.quantity} gramas
                                                            </td>
                                                            <td className="text-sm p-2 text-center">
                                                                <Link href={route('product.gold.remove',{product_gold: data.id})}
                                                                      className="inline-flex w-full left-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                                    Excluir
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
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
