import React, { Fragment, useState } from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useForm} from '@inertiajs/react';
import CurrencyInput from "react-currency-input-field";


export default function ModalStorePrice({product}) {
    const [open, setOpen] = useState(false)


    const { data, setData, post, processing, errors } = useForm({
        product_id: product.id,
        offered_price: '',
        unit_cost: 1,
        quantity: 1,
    })

    function submit(e) {
        e.preventDefault()
        post(route('product.price.store',{product:product.id}));
        setOpen(false);
    }


    return (
        <>
            <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                Criar Preço
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
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Criar Preço
                                        </Dialog.Title>
                                        <div className="mt-2">
                                        </div>
                                        <form className="mt-5 sm:flex sm:items-center" onSubmit={submit}>
                                            <div className="w-full sm:max-w-xs">
                                                <label htmlFor="offered_price" className="sr-only">
                                                    Novo Preço
                                                </label>
                                                <CurrencyInput
                                                    id="offered_price"
                                                    name="offered_price"
                                                    placeholder="Please enter a number"
                                                    defaultValue={data.offered_price}
                                                    onChange={e => setData('offered_price', e.target.value)}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                />
                                                {errors.offered_price && <div className="text-red-600">{errors.offered_price}</div>}
                                            </div>
                                            <button
                                                type="submit"
                                                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                disabled={processing}>
                                                Save
                                            </button>
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
