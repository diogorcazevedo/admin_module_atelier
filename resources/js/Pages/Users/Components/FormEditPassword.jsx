import {useForm} from '@inertiajs/react';
import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function FormEditPassword({user}) {

    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors} = useForm({
        password: '',

    })

    function submit(e) {
        e.preventDefault()
        post(route('user.update.password',{user:user.id}))
    }

    return (
            <>
                <button
                    type="button"
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={() => setOpen(true)}
                >
                    Alterar senha
                </button>

                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <form onSubmit={submit}>
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                                        <div className="col-span-3 sm:col-span-4">
                                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                Nova Senha:
                                                            </label>
                                                            {errors.password && <div>{errors.password}</div>}
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="password"
                                                                    value={data.password}
                                                                    onChange={e => setData('password', e.target.value)}
                                                                    name="password"
                                                                    autoComplete="password"
                                                                    className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
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
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </>

    )
}
