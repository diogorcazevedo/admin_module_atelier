import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from '@inertiajs/react';
import SlideGolds from "@/Pages/Jewels/Products/Components/SlideGolds";
import SlideGems from "@/Pages/Jewels/Products/Components/SlideGems";
import ModalChangePrice from "@/Pages/Jewels/Products/Components/ModalChangePrice";
import ModalStorePrice from "@/Pages/Jewels/Products/Components/ModalStorePrice";
import ProductList from "@/Pages/Jewels/Products/Components/ProductList";


export default function Index({products,jewel,golds,gems}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    function price(product) {
        if (product.stock?.offered_price) {
            return <ModalChangePrice product={product}/>
        }else{
            return <ModalStorePrice product={product}/>
        }
    }

    return (
        <>
            <Head title="Jewel Products" />
            <Auth auth={auth} errors={errors} >
                <div className="shadow mt-6 p-4 flex flex-row">
                    <div className="basis-2/3">
                        <h2 className="text-xl mt-2 font-normal leading-7 text-gray-900 sm:text-3xl sm:truncate">Composição da Joias</h2>
                    </div>
                    <div className="basis-1/3">
                        <Link href={route('product.create',{jewel:jewel.id})}
                              className="mt-3 w-full block items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            criar
                        </Link>
                    </div>
                </div>
                <div className="rounded py-6 px-6 overflow-hidden shadow-xl">
                    <ProductList products={products} golds={golds} gems={gems}/>
                </div>
                <div className="shadow mt-6 p-4 flex flex-row-reverse">
                    <div className="basis-1/3">
                        <Link href={route('jewels.index',{collection:jewel.collection_id})}
                              className="shadow-xl float-right mt-3 w-full  items-center justify-center py-2 px-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:text-sm">
                            Voltar
                        </Link>
                    </div>
                </div>
            </Auth>
        </>
    );
}
