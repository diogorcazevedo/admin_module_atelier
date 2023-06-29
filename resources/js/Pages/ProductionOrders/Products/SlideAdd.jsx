import React, {Fragment, useState} from 'react'
import {Dialog, Transition,Listbox} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {useForm} from '@inertiajs/react'

export default function SlideAdd({jewel, production_order}) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(jewel.products[0])
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const {data, setData, post, processing, errors} = useForm({
        jewel_id: jewel.id,
        production_order_id: production_order.id,
        product_id: selected ? selected.id : "",
        price: "",
        qtd: "",
        obs: "",
        aro: "",
    })

    function submit(e) {
        e.preventDefault()
        setOpen(false);
        post(route('production.orders.update',{id:production_order.id}));

    }

    return (
        <>
            <button
                type="button"
                className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                add
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
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 justify-end">
                                                        <form onSubmit={submit}>
                                                            <div
                                                                className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                                <div className="mt-6 grid grid-cols-1 gap-4">
                                                                    <div className="">
                                                                        <Listbox value={selected}
                                                                                 onChange={setSelected}
                                                                                >
                                                                            {({open}) => (
                                                                                <>
                                                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Selecionar</Listbox.Label>
                                                                                    <div className="relative mt-2">
                                                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                                                            <span className="flex items-center">
                                                                                                <img
                                                                                                    src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+selected.images[0]?.path}
                                                                                                    alt=""
                                                                                                    className="h-8 w-8 flex-shrink-0 rounded-full"/>
                                                                                                <span className="ml-3 block truncate">{selected.name}</span>
                                                                                            </span>
                                                                                            <span
                                                                                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                                                            </span>
                                                                                        </Listbox.Button>

                                                                                        <Transition
                                                                                            show={open}
                                                                                            as={Fragment}
                                                                                            leave="transition ease-in duration-100"
                                                                                            leaveFrom="opacity-100"
                                                                                            leaveTo="opacity-0"
                                                                                        >
                                                                                            <Listbox.Options
                                                                                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                                                {jewel.products.map((product) => (
                                                                                                    <Listbox.Option key={product.id}
                                                                                                                    className={({active}) =>
                                                                                                                        classNames(
                                                                                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                                                                        )
                                                                                                                    }
                                                                                                                    value={product}
                                                                                                                    onClick={() => setData('product_id',product.id)}>
                                                                                                                    {({ selected, active}) => (
                                                                                                                    <>
                                                                                                                        <div className="flex items-center">
                                                                                                                            <img src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+product.images[0]?.path} alt="" className="h-8 w-8 flex-shrink-0 rounded-full"/>
                                                                                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                                                                {product.name}
                                                                                                                            </span>
                                                                                                                        </div>

                                                                                                                        {selected ? (
                                                                                                                            <span className={classNames(
                                                                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                                                )}>
                                                                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>

                                                                                                                            </span>
                                                                                                                        ) : null}
                                                                                                                    </>
                                                                                                                    )}
                                                                                                    </Listbox.Option>
                                                                                                ))}
                                                                                            </Listbox.Options>
                                                                                        </Transition>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </Listbox>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="size"
                                                                               className="block text-sm font-medium text-gray-700">
                                                                            Valor do Custo
                                                                        </label>
                                                                        {errors.price && <div>{errors.price}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="price"
                                                                                value={data.price}
                                                                                onChange={e => setData('price', e.target.value)}
                                                                                name="price"
                                                                                autoComplete="price"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="quantity"
                                                                               className="block text-sm font-medium text-gray-700">
                                                                            Quantidade (unidades)
                                                                        </label>
                                                                        {errors.qtd && <div>{errors.qtd}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="qtd"
                                                                                value={data.qtd}
                                                                                onChange={e => setData('qtd', e.target.value)}
                                                                                name="qtd"
                                                                                autoComplete="qtd"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="aro"
                                                                               className="block text-sm font-medium text-gray-700">
                                                                            Aro
                                                                        </label>
                                                                        {errors.aro && <div>{errors.aro}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="aro"
                                                                                value={data.aro}
                                                                                onChange={e => setData('aro', e.target.value)}
                                                                                name="aro"
                                                                                autoComplete="aro"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="obs"
                                                                               className="block text-sm font-medium text-gray-700">
                                                                            Obs
                                                                        </label>
                                                                        {errors.obs && <div>{errors.obs}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="obs"
                                                                                value={data.obs}
                                                                                onChange={e => setData('obs', e.target.value)}
                                                                                name="obs"
                                                                                autoComplete="obs"
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
