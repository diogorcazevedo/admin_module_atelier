import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, useForm, usePage} from '@inertiajs/react';
import moment from "moment";
import InputMask from "react-input-mask";
export default function Edit({service, manufacturers,centers}) {

    const {auth} = usePage().props
    const status = [
        { value: "", label: "-" },
        { value: 0, label: "NÃO ENTREGUE" },
        { value: 1, label: "ENTREGUE" },
    ];
    const pay = [
        { value: "", label: "-" },
        { value: 0, label: "NÃO PAGO" },
        { value: 1, label: "PAGO" },
    ];
    const {data, setData, post, processing, errors} = useForm({
        id:                     service.id ? service.id : "",
        user_id:                service.user_id ? service.user_id : "",
        sale_id:                service.sale_id ? service.sale_id : "",
        center_id:              service.center_id ? service.center_id : "",
        manufacturer_id:        service.manufacturer_id ? service.manufacturer_id : '',
        total:                  service.total ? service.total : '',
        status:                 service.status ? service.status : 0,
        pay:                    service.pay ? service.pay : 0,
        scheduled:              service.scheduled ? service.scheduled : '',
        date:                   moment(service.date).format('DD-MM-YYYY') ? moment(service.date).format('DD-MM-YYYY') : '',
        date_shipping:          moment(service.date_shipping).format('DD-MM-YYYY') ? moment(service.date_shipping).format('DD-MM-YYYY') : '',
        os_number:              service.os_number ? service.os_number : '',
        obs:                    service.obs ? service.obs : '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('service.legacy.update',{id:service.id}));
    }

    return (
       <>
           <Head title="Services"/>
           <Auth auth={auth} errors={errors}>
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                   <div className="rounded p-6 overflow-hidden shadow-lg">
                       <div className="shadow mt-6 p-4 flex flex-row">
                           <div className="basis-1/3">
                               <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Editar Ajustes em joias Antigas CB - Ordem de Serviço</h2>
                           </div>
                       </div>
                       <form onSubmit={submit}>
                           <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                               <div className="mt-6 mb-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                   <div className="col-span-3 sm:col-span-4">
                                       <label htmlFor="os_number" className="block text-sm font-medium text-gray-700">
                                          Número OS
                                       </label>
                                       {errors.os_number && <div>{errors.os_number}</div>}
                                       <div className="mt-1">
                                           <input
                                               name="os_number"
                                               type="text"
                                               value={data.os_number}
                                               className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                               onChange={e => setData('os_number', e.target.value)} />
                                       </div>
                                   </div>
                                   <div className="grid grid-cols-1 gap-4">
                                       <div className="">
                                           <label htmlFor="manufacturer_id" className="block text-sm font-medium text-gray-700">
                                               Oficina
                                           </label>
                                           {errors.manufacturer_id && <div>{errors.manufacturer_id}</div>}
                                           <select name="manufacturer_id"
                                                   required="required"
                                                   id="manufacturer_id"
                                                   onChange={e => setData('manufacturer_id', e.target.value)}
                                                   value={data.manufacturer_id}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md">
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
                                   <div className="grid grid-cols-1 gap-4">
                                       <div className="">
                                           <label htmlFor="center_id" className="block text-sm font-medium text-gray-700">
                                               Ponto de venda
                                           </label>
                                           {errors.center_id && <div>{errors.center_id}</div>}
                                           <select name="center_id"
                                                   required="required"
                                                   id="center_id"
                                                   onChange={e => setData('center_id', e.target.value)}
                                                   value={data.center_id}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               <option>Pontos de venda</option>
                                               {centers.map((center, index) => {
                                                   return (
                                                       <option key={index} value={center.id}>
                                                           {center.name}
                                                       </option>
                                                   );
                                               })}
                                           </select>
                                           {errors.manufacturer_id && <div className="text-red-600">{errors.manufacturer_id}</div>}
                                       </div>
                                   </div>
                                   <div className="col-span-3 sm:col-span-4">
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
                                   <div className="col-span-3 sm:col-span-4">
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
                                   <div className="col-span-3 sm:col-span-4">
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
                                   <div className="col-span-3 sm:col-span-4">
                                       <label htmlFor="date_shipping" className="block text-sm font-medium text-gray-700">
                                           Data da Entrega
                                       </label>
                                       {errors.date_shipping && <div>{errors.date_shipping}</div>}
                                       <div className="mt-1">
                                           <InputMask
                                               required
                                               type="text"
                                               id="date_shipping"
                                               name="date_shipping"
                                               autoComplete="date_shipping"
                                               mask="99-99-9999"
                                               value={data.date_shipping}
                                               onChange={e => setData('date_shipping', e.target.value)}
                                               className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                           ></InputMask>
                                       </div>
                                   </div>
                                   <div className="grid grid-cols-1 gap-4">
                                       <label htmlFor="pay" className="block text-sm font-medium text-gray-700">
                                           Pagamento
                                       </label>
                                       {errors.pay && <div>{errors.pay}</div>}

                                       <div className="">
                                           <select name="pay"
                                                   id="pay"
                                                   onChange={e => setData('pay', e.target.value)}
                                                   value={data.pay}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               {pay.map((p, index) => {
                                                   return (
                                                       <option key={index} value={p.value}>
                                                           {p.label}
                                                       </option>
                                                   );
                                               })}

                                           </select>
                                           {errors.pay && <div className="text-red-600">{errors.pay}</div>}
                                       </div>
                                   </div>
                                   <div className="grid grid-cols-1 gap-4">
                                       <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                           Status da entrega
                                       </label>
                                       {errors.status && <div>{errors.status}</div>}
                                       <div className="">
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
                                   <div className="grid grid-cols-1 gap-4">
                                       <label htmlFor="obs" className="block text-sm font-medium text-gray-700">
                                           Observações
                                       </label>
                                       {errors.obs && <div>{errors.obs}</div>}
                                       <div className="mt-1">
                                           <textarea
                                               rows="5"
                                               value={data.obs}
                                               onChange={e => setData('obs', e.target.value)}
                                               className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md">
                                            {data.obs}
                                        </textarea>
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
