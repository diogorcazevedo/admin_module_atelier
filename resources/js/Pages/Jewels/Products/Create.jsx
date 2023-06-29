import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, useForm,usePage} from '@inertiajs/react';

export default function Create( {jewel}) {
    const {auth} = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        category_id: jewel.category_id,
        collection_id: jewel.collection_id,
        jewel_id: jewel.id,
        peso_fino: "",
        peso_18k: "",

    })

    function submit(e) {
        e.preventDefault()
        const pct = data.peso_fino * 0.25;
        const gold = parseFloat(data.peso_fino) + parseFloat(pct);
        setData('peso_18k',gold)
        post(route("product.store"));

    }



    return (
            <>
                <Head title="Products" />
                <Auth auth={auth} errors={errors} >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                        <div className="rounded p-6 overflow-hidden shadow-lg">
                            <div className="shadow mt-6 p-4 flex flex-row">
                                <div className="basis-1/3">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Cadastrar Componentes Joias</h2>
                                </div>
                            </div>
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
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Descrição
                                            </label>
                                            {errors.description && <div>{errors.description}</div>}
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    value={data.description}
                                                    onChange={e => setData('description', e.target.value)}
                                                    autoComplete="description"
                                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-3 sm:col-span-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
                </Auth>
            </>

    )
}

