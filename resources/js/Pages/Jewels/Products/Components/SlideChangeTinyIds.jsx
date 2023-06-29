import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon,PencilSquareIcon} from '@heroicons/react/24/outline'
import {useForm} from '@inertiajs/react'

export default function SlideChangeTinyIds({product}) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        sku:            product.sku != 0 ? product.sku : '' ,
        tiny_id:        product.tiny_id != 0 ? product.tiny_id : '' ,
        ncm:            product.ncm != 0 ? product.ncm : '' ,
        ean:            product.ean != 0 ? product.ean : '' ,
        product_id:     product.id,
    })

    function submit(e) {
        e.preventDefault()
        setOpen(false);
        post(route('product.sku.change',{product:product.id}), { preserveScroll: true },{
            preserveScroll: true,
            preserveState: true,
        });
    }


    return (
        <>
            {/*<button type="button"*/}
            {/*        className="rounded-md bg-white font-medium text-green-800 hover:text-green-700 p-1"*/}
            {/*        onClick={() => setOpen(true)}>*/}
            {/*    editar*/}
            {/*</button>*/}

            <button onClick={() => setOpen(true)}
                    className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <PencilSquareIcon
                    className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="text-gray-500 group-hover:text-gray-700 text-xs">editar</span>
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
                                                    <Dialog.Title className="text-lg font-medium text-teal-600"> Editar Tiny Ids</Dialog.Title>
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
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 justify-end">
                                                        <form onSubmit={submit}>
                                                            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                                                            SKU
                                                                        </label>
                                                                        {errors.sku && <div>{errors.sku}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="sku"
                                                                                value={data.sku}
                                                                                onChange={e => setData('sku', e.target.value)}
                                                                                name="sku"
                                                                                autoComplete="sku"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="tiny_id" className="block text-sm font-medium text-gray-700">
                                                                            Tiny ID
                                                                        </label>
                                                                        {errors.tiny_id && <div>{errors.tiny_id}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="tiny_id"
                                                                                value={data.tiny_id}
                                                                                onChange={e => setData('tiny_id', e.target.value)}
                                                                                name="tiny_id"
                                                                                autoComplete="tiny_id"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="ncm" className="block text-sm font-medium text-gray-700">
                                                                           NCM
                                                                        </label>
                                                                        {errors.ncm && <div>{errors.ncm}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="ncm"
                                                                                value={data.ncm}
                                                                                onChange={e => setData('ncm', e.target.value)}
                                                                                name="ncm"
                                                                                autoComplete="ncm"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="ean" className="block text-sm font-medium text-gray-700">
                                                                           EAN
                                                                        </label>
                                                                        {errors.ean && <div>{errors.ean}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="ean"
                                                                                value={data.ean}
                                                                                onChange={e => setData('ean', e.target.value)}
                                                                                name="ean"
                                                                                autoComplete="ean"
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
