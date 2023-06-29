import {useForm} from '@inertiajs/react';
import React from 'react';
import InputMask from 'react-input-mask';

export default function FormEditRegister({user}) {

    const { data, setData, post, processing, errors} = useForm({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        cel: user.cel,
        aniversario: user.aniversario,
    })

    function submit(e) {
        e.preventDefault()
        post(route('user.update',{user:user.id}))
    }


    return (
            <>
                <form onSubmit={submit}>
                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
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
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="aniversario" className="block text-sm font-medium text-gray-700">
                                    Aniversário
                                </label>
                                {errors.aniversario && <div>{errors.aniversario}</div>}
                                <div className="mt-1">
                                    <InputMask
                                        type="text"
                                        id="aniversario"
                                        name="aniversario"
                                        mask="99/99"
                                        value={data.aniversario}
                                        onChange={e => setData('aniversario', e.target.value)}
                                        autoComplete="aniversario"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    ></InputMask>
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
            </>

    )
}
