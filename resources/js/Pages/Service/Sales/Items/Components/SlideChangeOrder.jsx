import React, {Fragment, useState} from 'react'
import {Dialog, Transition,Listbox} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {Link} from "@inertiajs/react";

export default function SlideChangeOrder({}) {
    const [open, setOpen] = useState(false)


    return (
        <>
            <button
                type="button"
                className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                Alterar a compra
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
                                                    <Dialog.Title
                                                        className="text-lg font-medium text-teal-600"> Adicionar
                                                        Itens </Dialog.Title>
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
                                            <div className="shadow mt-6 p-4 flex flex-row">
                                                <div className="basis-2/3">
                                                    <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Adicionar AQUI </h2>
                                                </div>
                                                <div className="basis-1/3">
                                                    AQUI
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
