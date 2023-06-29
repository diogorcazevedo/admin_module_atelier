import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {useForm} from '@inertiajs/react';
import InputMask from "react-input-mask";

export default function SlideCreateUser({}) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors} = useForm({
        name: '',
        email: '',
        cpf: '',
        cel: '',
        zipcode: '',
        address: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',

    })

    function submit(e) {
        e.preventDefault()
        setOpen(false)
        post(route('user.store'),{preserveState:false})
    }

    const searchCep = (setData,e) =>{

        const cep = e.target.value;

        const url_cep = 'https://viacep.com.br/ws/'+ cep + '/json/';
        axios.defaults.headers.common = null
        axios.get(url_cep).then(function (response) {

            const dt = {
                name:document.getElementById("name").value,
                email:document.getElementById("email").value,
                cpf:document.getElementById("cpf").value,
                cel:document.getElementById("cel").value,
                zipcode:e.target.value,
                address:response.data.logradouro,
                neighborhood:response.data.bairro,
                city:response.data.localidade,
                state:response.data.uf
            };
            setData(dt);
        }.bind(this)).catch(function (error) {
            console.log(error);
            // this.limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        });
    }

    return (
        <>
            <button
                type="button"
                className="mt-2 inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                cadastrar cliente
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
                                                        className="text-lg font-medium text-teal-600"> Adicionar Cliente </Dialog.Title>
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
                                            <div className="shadow-lg p-8">
                                                <form onSubmit={submit}>
                                                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">

                                                        <div >
                                                            {/*
                      <h3 className="text-3xl  font-medium text-gray-900">Informações para Envio</h3>
                      */}
                                                            <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                                                <div className="col-span-3 sm:col-span-4">
                                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                                        Nome
                                                                    </label>
                                                                    {errors.name && <div>{errors.name}</div>}
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            value={data.name}
                                                                            onChange={e => setData('name', e.target.value)}
                                                                            name="name"
                                                                            autoComplete="name"
                                                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-3 sm:col-span-4">
                                                                    <label htmlFor="cel" className="block text-sm font-medium text-gray-700">
                                                                        Telefone
                                                                    </label>
                                                                    {errors.cel && <div>{errors.cel}</div>}
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            id="cel"
                                                                            name="cel"
                                                                            value={data.cel}
                                                                            onChange={e => setData('cel', e.target.value)}
                                                                            autoComplete="cel"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-3 sm:col-span-4">
                                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                        Email
                                                                    </label>
                                                                    {errors.email && <div>{errors.email}</div>}
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            id="email"
                                                                            name="email"
                                                                            value={data.email}
                                                                            onChange={e => setData('email', e.target.value)}
                                                                            autoComplete="email"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-3 sm:col-span-4">
                                                                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                                                                        CPF
                                                                    </label>
                                                                    {errors.cpf && <div>{errors.cpf}</div>}
                                                                    <div className="mt-1">
                                                                        <InputMask
                                                                            type="text"
                                                                            id="cpf"
                                                                            name="cpf"
                                                                            mask="999.999.999.99"
                                                                            value={data.cpf}
                                                                            onChange={e => setData('cpf', e.target.value)}
                                                                            autoComplete="cpf"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        ></InputMask>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-10">

                                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">

                                                                <div className="col-span-3 sm:col-span-4">
                                                                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                                                                        CEP
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <InputMask
                                                                            type="text"
                                                                            id="zipcode"
                                                                            mask="99999999"
                                                                            // onBlur={searchCep}
                                                                            onBlur={(e) => searchCep(setData, e)}
                                                                            name="zipcode"
                                                                            autoComplete="zipcode"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        ></InputMask>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-2 sm:col-span-3">
                                                                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                                        Endereço
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            name="address"
                                                                            id="address"
                                                                            value={data.address}
                                                                            onChange={e => setData('address', e.target.value)}
                                                                            autoComplete="address"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                                                        Número
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            name="number"
                                                                            id="number"
                                                                            value={data.number}
                                                                            onChange={e => setData('number', e.target.value)}
                                                                            autoComplete="number"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="sm:col-span-3">
                                                                    <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                                                                        Complemento
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            id="complement"
                                                                            name="complement"
                                                                            value={data.complement}
                                                                            onChange={e => setData('complement', e.target.value)}
                                                                            autoComplete="complement"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                                                                        Bairro
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            id="neighborhood"
                                                                            name="neighborhood"
                                                                            value={data.neighborhood}
                                                                            onChange={e => setData('neighborhood', e.target.value)}
                                                                            autoComplete="neighborhood"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="sm:col-span-3">
                                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            required
                                                                            type="text"
                                                                            id="city"
                                                                            value={data.city}
                                                                            onChange={e => setData('city', e.target.value)}
                                                                            name="city"
                                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                                                                    </div>
                                                                </div>
                                                                <div className="sm:col-span-1">
                                                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                                                                    <div className="mt-1">
                                                                        <InputMask
                                                                            required
                                                                            type="text"
                                                                            id="state"
                                                                            mask="aa"
                                                                            value={data.state}
                                                                            onChange={e => setData('state', e.target.value)}
                                                                            name="state"
                                                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                        ></InputMask>
                                                                    </div>
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
