import React, {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon,PencilSquareIcon } from '@heroicons/react/24/outline'
import {useForm} from "@inertiajs/react";

export default function SlideWeight({product}) {

    const [open, setOpen] = useState(false)


    const { data, setData, post, processing, errors} = useForm({
        peso_fino: product.peso_fino ? product.peso_fino : 0,
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
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="peso_fino" className="block text-sm font-medium text-gray-700">
                                                                            Peso
                                                                        </label>
                                                                        {errors.peso_fino && <div>{errors.peso_fino}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="peso_fino"
                                                                                name="peso_fino"
                                                                                value={data.peso_fino}
                                                                                onChange={e => setData('peso_fino', e.target.value)}
                                                                                autoComplete="peso_fino"
                                                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
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
