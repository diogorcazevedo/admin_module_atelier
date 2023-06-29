import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PointOfSale from "@/Pages/Users/Components/PointOfSale";

export default function SalesUserSlide({orders}) {
    const [open, setOpen] = useState(false)

    function check_status(order){
        return  <div  className="mb-6">

            <table className="border mt-4 min-w-full divide-y divide-x divide-gray-200">

                <tbody className="divide-y divide-x divide-gray-200 bg-white">
                {order.items.map((item) => (
                    <tr key={item.id} className="divide-x divide-y divide-gray-200">
                        <td className="text-xs">{order.data.split('-').reverse().join('/')}</td>
                        <td width="20%" className="p-2">
                            <img className="w-12 h-12  flex-shrink-0"
                                 src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+item.product.images[0]?.path}/>
                        </td>
                        <td width="40%">
                            <p className="text-xs" key={item.id}>{item.product.name}</p>
                        </td>
                        <td className="text-xs" width="20%"><PointOfSale pos={order.centro} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    }

    return (

   <>
       <button
           type="button"
           className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
           onClick={() => setOpen(true)}
       >
           compras
       </button>
       <Transition.Root show={open} as={Fragment}>
           <Dialog as="div" className="relative z-10" onClose={setOpen}>
               <div className="fixed inset-0" />

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
                                               <Dialog.Title className="text-lg font-medium text-teal-600"> LANÇAMENTOS </Dialog.Title>
                                               <div className="ml-3 flex h-7 items-center">
                                                   <button
                                                       type="button"
                                                       className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                       onClick={() => setOpen(false)}
                                                   >
                                                       <span className="sr-only">Close panel</span>
                                                       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                           <p className="bg-teal-900 p-4"> <span className="font-medium text-lg text-white leading-tight">Vendas</span></p>
                                               {orders.map((order) => (
                                                   <div key={order.id}>
                                                       {order.status == 2 &&
                                                           <div> {check_status(order)}</div>
                                                       }
                                                   </div>
                                               ))}
                                       </div>
                                       {/*
                                       <div className="relative mt-12 flex-1 px-4 sm:px-6">
                                           <p className="bg-gray-50 p-4"> <span className="font-medium text-lg text-gray-900 leading-tight">Propostas</span></p>
                                               {orders.map((order) => (
                                                   <div key={order.id}>
                                                       {order.status != 2 &&
                                                           <div> {check_status(order)}</div>
                                                       }
                                                   </div>
                                               ))}
                                       </div>
                                       */}
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
