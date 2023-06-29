import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, useForm, usePage} from '@inertiajs/react';
import moment from "moment";
import InputMask from "react-input-mask";
export default function Create({manufacturers,user,orders,centers,sales}) {



    const {auth} = usePage().props
    const {data, setData, post, processing, errors} = useForm({
        order_id: "",
        user_id: user.id,
        sale_id: "",
        center_id: "",
        manufacturer_id: "",
        total: "",
        status: 0,
        pay: 0,
        scheduled: "",
        date: "",
        date_shipping: "",
        os_number:  "",
        obs:  "",
    })

    function orderDate(date){
        const d = new Date(date);
        const dt = moment(d).format('DD-MM-YYYY');
        return dt.split('-').reverse().join('-')

    }


    function submit(e) {
        e.preventDefault()
        post(route('service.sales.store'));

    }

    return (
       <>
           <Head title="Services"/>
           <Auth auth={auth} errors={errors}>
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                   <div className="rounded p-6 overflow-hidden shadow-lg">
                       <div className="shadow mt-6 p-4 flex flex-row">
                           <div className="basis-1/3">
                               <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Criar Ajustes de Venda CB - Ordem de Serviço</h2>
                           </div>
                       </div>
                       <form onSubmit={submit}>
                           <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                               <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
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
                                       <div className="">
                                           <select name="order_id"
                                                   required="required"
                                                   id="order_id"
                                                   onChange={e => setData('order_id', e.target.value)}
                                                   value={data.order_id}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               <option>Vendas</option>
                                               {orders.map((order, index) => {
                                                   return (
                                                       <option key={index} value={order.id}>
                                                           Data: {orderDate(order.data)}  valor: {order.total} Items: {order.items.map((item, index) => {
                                                           return (
                                                               <span key={index}>
                                                                         { item.product.name }
                                                                      </span>
                                                           );
                                                       })}

                                                       </option>
                                                   );
                                               })}
                                           </select>
                                           {errors.manufacturer_id && <div className="text-red-600">{errors.manufacturer_id}</div>}
                                       </div>
                                       <div className="">
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
                                       <div className="">
                                           <select name="sale_id"
                                                   required="required"
                                                   id="sale_id"
                                                   onChange={e => setData('sale_id', e.target.value)}
                                                   value={data.sale_id}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               <option>Vendedor ou Responsável</option>
                                               {sales.map((sale, index) => {
                                                   return (
                                                       <option key={index} value={sale.id}>
                                                           {sale.name}
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
                                   <div className="grid grid-cols-1 gap-4">
                                       <label htmlFor="pay" className="block text-sm font-medium text-gray-700">
                                           Pagamento
                                       </label>
                                       {errors.pay && <div>{errors.pay}</div>}
                                       <div className="">
                                           <select name="pay"
                                                   required="required"
                                                   id="pay"
                                                   onChange={e => setData('pay', e.target.value)}
                                                   value={data.pay}
                                                   className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                           >
                                               <option>Status Pagamento</option>
                                               <option value='0'>NÃO</option>
                                               <option value='1'>SIM</option>
                                           </select>
                                           {errors.manufacturer_id && <div className="text-red-600">{errors.manufacturer_id}</div>}
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
