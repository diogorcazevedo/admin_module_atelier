import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, useForm, usePage} from '@inertiajs/react';

export default function Create({manufacturers}) {

    const {auth} = usePage().props
    const {data, setData, post, processing, errors} = useForm({
        manufacturer_id: "",
        total: "",
        gold_quantity: "",
        scheduled:  "",
    })



    function submit(e) {
        e.preventDefault()
        post(route('production.orders.store'));

    }

    return (
       <>
           <Head title="Production"/>
           <Auth auth={auth} errors={errors}>
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                   <div className="rounded p-6 overflow-hidden shadow-lg">
                       <div className="shadow mt-6 p-4 flex flex-row">
                           <div className="basis-1/3">
                               <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Cadastrar Joias</h2>
                           </div>
                       </div>
                       <form onSubmit={submit}>
                           <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                               <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                   <div className="mt-6 grid grid-cols-2 gap-4">
                                       <div className="">
                                           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                               Oficina
                                           </label>
                                           <select name="manufacturer_id"
                                                   required="required"
                                                   id="manufacturer_id"
                                                   onChange={e => setData('manufacturer_id', e.target.value)}
                                                   value={data.manufacturer_id}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               <option>Oficinas</option>
                                               {manufacturers.map((manufacturer, index) => {
                                                   return (
                                                       <option key={index} value={manufacturer.id}>
                                                           {manufacturer.name}
                                                       </option>
                                                   );
                                               })}
                                           </select>
                                           {errors.manufacturer_id && <div className="text-red-600">{errors.manufacturer_id}</div>}
                                       </div>
                                   </div>
                                   <div className="col-span-3 sm:col-span-4">
                                       <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                           Quantidade de ouro
                                       </label>
                                       {errors.gold_quantity && <div>{errors.gold_quantity}</div>}
                                       <div className="mt-1">
                                           <input
                                               type="text"
                                               id="gold_quantity"
                                               name="gold_quantity"
                                               value={data.gold_quantity}
                                               onChange={e => setData('gold_quantity', e.target.value)}
                                               autoComplete="gold_quantity"
                                               className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                           />
                                       </div>
                                   </div>
                                   <div className="col-span-3 sm:col-span-4">
                                       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                          Valor Total (estimativa de gasto)
                                       </label>
                                       {errors.total && <div>{errors.total}</div>}
                                       <div className="mt-1">
                                           <input
                                               type="text"
                                               id="total"
                                               value={data.total}
                                               onChange={e => setData('total', e.target.value)}
                                               name="total"
                                               autoComplete="total"
                                               className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                           />
                                       </div>
                                   </div>
                                   <div className="col-span-3 sm:col-span-4">
                                       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                           Previsão (em dias ex: 15 dias)
                                       </label>
                                       {errors.scheduled && <div>{errors.scheduled}</div>}
                                       <div className="mt-1">
                                           <input
                                               name="scheduled"
                                               type="text"
                                               value={data.scheduled}
                                               className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                               onChange={e => setData('scheduled', e.target.value)} />
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
    );
}
