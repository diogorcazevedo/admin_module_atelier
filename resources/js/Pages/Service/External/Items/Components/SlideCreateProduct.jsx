import React, {Fragment, useState} from 'react'
import {Dialog, Transition,Listbox} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {useForm, usePage} from "@inertiajs/react";

export default function SlideCreateProduct({categories}) {
    const [open, setOpen] = useState(false)
    const { flash } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route("jewel.external.store"));

    }

    return (
        <>
            <button
                type="button"
                className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                criar novo produto
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
                                                    <Dialog.Title  className="text-lg font-medium text-teal-600">
                                                        Criar novo produto
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
                                            <div className="shadow-xl p-4">
                                                {flash.message && (
                                                    <div className="bg-teal-600 text-white">{flash.message}</div>
                                                )}
                                                <form className="space-y-8 divide-y divide-gray-200 mt-4" onSubmit={submit}>
                                                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                                            <div className="space-y-6 sm:space-y-5">
                                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                        Categoria
                                                                    </label>
                                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                        <select
                                                                            name="category_id"
                                                                            required="required"
                                                                            id="category_id"
                                                                            onChange={e => setData('category_id', e.target.value)}
                                                                            value={data.category_id}
                                                                            className="max-w-lg block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                        >
                                                                            <option>Categorias</option>
                                                                            {categories.map((category, index) => {
                                                                                return (
                                                                                    <option key={index} value={category.id}>
                                                                                        {category.name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                        {errors.category_id && <div className="text-red-600">{errors.category_id}</div>}
                                                                    </div>
                                                                </div>

                                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                        Nome
                                                                    </label>
                                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                        <input
                                                                            type="text"
                                                                            value={data.name}
                                                                            onChange={e => setData('name', e.target.value)}
                                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                                                                        {errors.name && <div className="text-red-600">{errors.name}</div>}
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
