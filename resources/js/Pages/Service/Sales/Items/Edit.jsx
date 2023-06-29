import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputMask from "react-input-mask";
import moment from "moment";
export default function Create({service_item, manufacturers,orders,centers}) {

    const {auth} = usePage().props
    const {data, setData, post, processing, errors} = useForm({
        service_item_id:            service_item.id,
        manufacturer_id:            service_item.manufacturer_id ? service_item.manufacturer_id : '',
        total:                      service_item.total ? service_item.total : '',
        scheduled:                  service_item.scheduled ? service_item.scheduled : '',
        date:                       moment(service_item.date).format('DD-MM-YYYY') ? moment(service_item.date).format('DD-MM-YYYY') : '',
        date_shipping:              moment(service_item.date_shipping).format('DD-MM-YYYY') ? moment(service_item.date_shipping).format('DD-MM-YYYY') : '',
        status:                     service_item.status ? service_item.status : 0,
    })
    const status = [
        { value: "", label: "-" },
        { value: 0, label: "NÃO ENTREGUE" },
        { value: 1, label: "ENTREGUE" },
    ];

    function submit(e) {
        e.preventDefault()
        post(route('service_items.sales.update',{id:service_item.id}));
    }

    return (
       <>
           <Head title="Services"/>
           <Auth auth={auth} errors={errors}>
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                   <div className="rounded p-6 overflow-hidden shadow-lg">
                       <div className="shadow mt-6 p-4 flex flex-row">
                           <div className="basis-1/3">
                               <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Editar serviço de reparo de Joia - Ajustes de Venda CB - Ordem de Serviço</h2>
                           </div>
                       </div>
                       <form onSubmit={submit}>
                           <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                               <div className="mt-6 mb-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                       <div className="">
                                           <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                               Oficinas
                                           </label>
                                           {errors.status && <div>{errors.status}</div>}
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
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                       <div></div>
                                   </div>
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                        <div className="">
                                       <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                           Data de Entrada
                                       </label>
                                       {errors.date && <div>{errors.date}</div>}
                                       <div className="mt-1">
                                           <InputMask
                                               required
                                               type="text"
                                               id="date"
                                               name="date"
                                               autoComplete="date"
                                               mask="99-99-9999"
                                               value={data.date}
                                               onChange={e => setData('date', e.target.value)}
                                               className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                           ></InputMask>

                                       </div>
                                   </div>
                                   </div>
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                        <div className="">
                                       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                          Valor Serviço (estimativa de custo)
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
                                   </div>
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                        <div className="">
                                       <label htmlFor="scheduled" className="block text-sm font-medium text-gray-700">
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
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                        <div className="">
                                       <label htmlFor="date_shipping" className="block text-sm font-medium text-gray-700">
                                           Data Entrega
                                       </label>
                                       {errors.date_shipping && <div>{errors.date_shipping}</div>}
                                       <div className="mt-1">
                                           <InputMask
                                               required
                                               type="text"
                                               id="date_shipping"
                                               name="date_shipping"
                                               autoComplete="date"
                                               mask="99-99-9999"
                                               value={data.date_shipping}
                                               onChange={e => setData('date_shipping', e.target.value)}
                                               className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                           ></InputMask>
                                       </div>
                                   </div>
                                   </div>
                                   <div className="grid grid-cols-1 col-span-2 gap-4">
                                       <div className="">
                                           <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                               Status da entrega
                                           </label>
                                           {errors.status && <div>{errors.status}</div>}
                                           <select name="status"
                                                   id="status"
                                                   onChange={e => setData('status', e.target.value)}
                                                   value={data.status}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               {status.map((s, index) => {
                                                   return (
                                                       <option key={index} value={s.value}>
                                                           {s.label}
                                                       </option>
                                                   );
                                               })}

                                           </select>
                                           {errors.status && <div className="text-red-600">{errors.status}</div>}
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
               <div className="shadow mt-6 p-4 flex flex-row-reverse">
                   <div className="basis-1/3">
                       <Link href={route('service_items.sales.show',{id:service_item.service_id})}
                             className="shadow-xl float-right mt-3 w-full  items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-600 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:text-sm">
                           Voltar
                       </Link>
                   </div>
               </div>
           </Auth>
       </>
    );
}
