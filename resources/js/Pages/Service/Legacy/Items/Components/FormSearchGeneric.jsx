import React from 'react';
import { useForm } from '@inertiajs/react';

export default function FormSearchGeneric({service,label}) {


    const { data, setData, post, processing, errors } = useForm({
        search:'',

    })

    function submit(e) {
        e.preventDefault()
        post(route('service_items.legacy.show',{id:service.id}));
    }


    return (
        <>
        <form className="mt-2 w-full sm:flex sm:items-center" onSubmit={submit}>

            <div className="w-full sm:max-w-xs">
                <label htmlFor="email" className="sr-only">
                    {label}
                </label>
                <input
                    type="text"
                    name="search"
                    value={data.search}
                    onChange={e => setData('search', e.target.value)}
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                    {errors.search && <div className="text-red-600">{errors.search}</div>}
            </div>
            <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                disabled={processing}>
                buscar
            </button>
        </form>
        </>
    );
}
