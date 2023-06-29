import React, {Fragment, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon,PencilSquareIcon } from '@heroicons/react/24/outline'
import {useForm} from "@inertiajs/react";

export default function SlidePublish({product}) {

    const [open, setOpen] = useState(false)


    const { data, setData, post, processing, errors} = useForm({
        name: product.name,
        sale: product.sale,
        publish: product.publish,
        line_up: product.line_up,
        prazo: product.prazo,

    })

    function submit(e) {
        e.preventDefault()
        setOpen(false);
        post(route("product.update",{id:product.id}),{
            preserveScroll: true,
            preserveState: true,
        });

    }


    return (
        <>
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-teal-900 bg-white hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"*/}
            {/*    onClick={() => setOpen(true)}*/}
            {/*>*/}
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
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                                        <img className="w-14 h-14  flex-shrink-0"
                                                             src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+product.images[0]?.path}/>
                                                    </Dialog.Title>
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
                                            <div className="relative flex-1 px-4 sm:px-6">
                                                <div>
                                                    <form className="space-y-8 divide-y divide-gray-200 mt-4" onSubmit={submit}>
                                                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                                            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                                                <div className="space-y-6 sm:space-y-5">
                                                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                            Disponível para venda
                                                                        </label>
                                                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                            <div className="mt-1">
                                                                                <select
                                                                                    name="sale"
                                                                                    id="sale"
                                                                                    onChange={e => setData('sale', e.target.value)}
                                                                                    value={data.sale}
                                                                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                                >
                                                                                    <option>VENDA</option>
                                                                                    <option  value="0">NÃO</option>
                                                                                    <option  value="1">SIM</option>
                                                                                </select>
                                                                                {errors.sale && <div className="text-red-600">{errors.sale}</div>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                            Disponível para exposição
                                                                        </label>
                                                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                            <div className="mt-1">
                                                                                <select
                                                                                    name="publish"
                                                                                    id="publish"
                                                                                    onChange={e => setData('publish', e.target.value)}
                                                                                    value={data.publish}
                                                                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                                >
                                                                                    <option>PUBLICADO</option>
                                                                                    <option  value="0">NÃO</option>
                                                                                    <option  value="1">SIM</option>
                                                                                </select>
                                                                                {errors.publish && <div className="text-red-600">{errors.publish}</div>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                                        <label htmlFor="line_up" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                            Line up
                                                                        </label>
                                                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                            <div className="mt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    value={data.line_up}
                                                                                    onChange={e => setData('line_up', e.target.value)}
                                                                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                                                                                {errors.line_up && <div className="text-red-600">{errors.line_up}</div>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                                        <label htmlFor="line_up" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                            Prazo
                                                                        </label>
                                                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                            <div className="mt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    value={data.prazo}
                                                                                    onChange={e => setData('prazo', e.target.value)}
                                                                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                                                                                {errors.prazo && <div className="text-red-600">{errors.prazo}</div>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-5">
                                                            <div className="flex justify-end">
                                                                <button
                                                                    type="submit"
                                                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                                    disabled={processing}>
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
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
