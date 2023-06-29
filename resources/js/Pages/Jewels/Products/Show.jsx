import React, {useState} from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import { PaperClipIcon,LinkIcon } from '@heroicons/react/20/solid'
import moment from "moment/moment";
import SlideOrders from "@/Pages/Jewels/Products/Components/SlideOrders";
import SlideProductionOrders from "@/Pages/Jewels/Products/Components/SlideProductionOrders";
import SlideTinyAdd from "@/Pages/Jewels/Products/Components/SlideTinyAdd";
import SlideChangeTinyIds from "@/Pages/Jewels/Products/Components/SlideChangeTinyIds";
import ModalChangePrice from "@/Pages/Jewels/Products/Components/ModalChangePrice";
import SlidePublish from "@/Pages/Jewels/Products/Components/SlidePublish";
import SlideGolds from "@/Pages/Jewels/Products/Components/SlideGolds";
import SlideGems from "@/Pages/Jewels/Products/Components/SlideGems";
import SlideWeight from "@/Pages/Jewels/Products/Components/SlideWeight";

export default function Index({   tiny_products,
                                  jewel,
                                  product,
                                  orders,orders_price,
                                  orders_count,
                                  production_orders,
                                  production_orders_count,
                                  init_price,
                                  current_price,
                                  gems,
                                  golds}) {

    const {auth} = usePage().props
    const { errors } = usePage().props
    const [stock, setStock] = useState(null)
    function orderDate(date){
        const d = new Date(date);
        return moment(d).format('DD-MM-YYYY');
        // const dt = moment(d).format('DD-MM-YYYY');
        // return dt.split('-').reverse().join('-')
    }

    function get_stock(id){
        axios.get(route('api.tiny.product.get_stock_products_by_id',{ id: id}))
            .then(res => {
                setStock(res.data)
            })
    }


    function tiny_list(tiny_products){
        return (
          <>
              {tiny_products?.map((item, index) => (
                  <li key={index}  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                          <LinkIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                                <a target="_blank" href={`https://erp.tiny.com.br/produtos#edit/${item.produto.id}`}>
                                    {item.produto.nome} - ID: {item.produto.id}
                                </a>
                            </span>
                          </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                          {get_stock(item.produto.id)}
                          <div className="overflow-hidden rounded-md bg-white shadow">
                              <ul role="list" className="divide-y divide-gray-200">
                                  {stock?.map((data,index) => (
                                      <li key={index} className="px-6 py-4">
                                          estoque {index + 1 }º depósito: {data.deposito.saldo} unidade(s)
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  </li>
              ))}
          </>
        );
    }

    function tiny_create(product){
        return <SlideTinyAdd product={product}/>
    }

    return (
        <>
            <Head title="Produto" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-normal text-gray-900">Product Information</h3>
                                <Link href={route('product.edit',{product:product.id})}>
                                    <p className="mt-1 max-w-2xl  leading-6 text-green-800">{product.name}</p>
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link href={route('product.images.index',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <img className="w-20 h-20  flex-shrink-0"
                                    src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+product.images[0]?.path}/>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Product Matriz</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jewel.name}</dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Peso aproximado</dt>
                                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">Ouro 18k (com liga metálica): {product.peso_fino} gramas</span>
                                    <span className="ml-4 flex-grow">Ouro 24k (fino): {product.peso_18k} gramas</span>
                                    <span className="ml-4 flex-shrink-0"><SlideWeight product={product}/> </span>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {product.description}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Faturamento</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orders_price)}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Variação de preço de venda</dt>
                                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">Inicial (<span className="font-normal text-gray-600 text-xs">{orderDate(init_price.created_at)}</span>): { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(init_price.offered_price)}</span>
                                    <span className="ml-4 flex-grow">Atual (<span className="font-normal text-gray-600 text-xs">{orderDate(current_price.updated_at)}</span>): { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(current_price.offered_price)}</span>
                                    <span className="ml-4 flex-shrink-0"> <ModalChangePrice product={product}/></span>
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Quantidade de pedidos</dt>
                                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{production_orders_count}</span>
                                    <span className="ml-4 flex-shrink-0">
                                         <SlideProductionOrders product={product} production_orders={production_orders}/>
                                  </span>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Quantidade de vendas</dt>
                                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{orders_count}</span>
                                    <span className="ml-4 flex-shrink-0">
                                       <SlideOrders product={product} orders={orders}/>
                                  </span>
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Disponibilidade Imediata</dt>
                                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{product.sale == 1? 'disponivel' : 'indisponível'}</span>
                                    <span className="flex-grow">Prazo produção: {product.prazo != null ? product.prazo : 15 } dias</span>
                                    <span className="ml-4 flex-shrink-0"><SlidePublish product={product}/> </span>
                                </dd>
                            </div>
                            <div className="bg-gray-50 py-6 flex flex-row-reverse px-3">
                                <div><SlideGolds product={product} golds={golds}/></div>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">lista: Ouro e matérias primas</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                         {product.golds?.map((data, index) => (
                                             <li key={index}  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                 <div className="flex w-0 flex-1 items-center">
                                                     <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                     <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                         <span className="truncate font-medium">{data.gold?.name}</span>
                                                     </div>
                                                 </div>
                                                 <div className="ml-4 flex-shrink-0">
                                                     Quantidade: {data.quantity} gramas
                                                 </div>
                                             </li>
                                         ))}
                                    </ul>
                                </dd>
                            </div>
                            <div className="bg-gray-50 py-6 flex flex-row-reverse px-3">
                                <div><SlideGems product={product} gems={gems}/></div>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Gemas</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                         {product.gems?.map((data, index) => (
                                             <li key={index}  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                 <div className="flex w-0 flex-1 items-center">
                                                     <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                     <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                         <span className="truncate font-medium">{data.gem?.name}</span>
                                                     </div>
                                                 </div>
                                                 <div className="ml-4 flex-shrink-0">
                                                     Quantidade: {data.quantity} - und
                                                 </div>
                                             </li>
                                         ))}
                                    </ul>
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {product.images?.map((image, index) => (
                                        <li key={index}  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <Link href={route('product.images.index',{product:product.id})}>
                                                    <img className="w-14 h-14  flex-shrink-0"
                                                         src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+image.path}/>
                                                </Link>

                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                        <a target="_blank" href={`https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/${image.path}`}>
                                                            {`https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/${image.path}`}
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href={route('product.image.download',{id:image.id})} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Identificadores</dt>
                                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">Tiny ID: {product.tiny_id}</span>
                                    <span className="ml-4 flex-grow">SKU: {product.sku}</span>
                                    <span className="ml-4 flex-grow">NCM: {product.ncm}</span>
                                    <span className="ml-4 flex-shrink-0"><SlideChangeTinyIds product={product}/></span>
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Produto no sistema Tiny</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {tiny_products.length === 0 ? tiny_create(product) : tiny_list(tiny_products)}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Auth>
        </>
    );
}

