import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon,PlusCircleIcon} from '@heroicons/react/24/outline'
import {useForm} from '@inertiajs/react'

export default function SlideTinyAdd({product}) {
    const [open, setOpen] = useState(false)

    const {data, setData, post, processing, errors} = useForm({

        id:                     product.id,
        name:                   product.name,
        sequencia:              '1000'+product.id,
        product_id:             '1000'+product.id,
        codigo:                 '1000'+product.id,
        ncm:                    "7113.19.00",
        nome:                   product.name,
        unidade:                "UN",
        preco:                  product.stock ? product.stock.offered_price : 0.01,
        preco_promocional:      product.stock ? product.stock.offered_price : 0.01,
        origem:                 "0",
        situacao:               "A",
        tipo:                   "P",
        marca:                  "Carla Buaiz Joias",
        tipo_embalagem:         "2",
        altura_embalagem:       "26.50",
        comprimento_embalagem:  "27.42",
        largura_embalagem:      "28.00",
        diametro_embalagem:     "0.00",

        garantia:                "10 anos",
        cest:                    "",

//--------------------TRATAR EM PHP-----------------//

        // "categoria"         => "tratar em php",
        // "valor_max"         => "100.00",
        // "motivo_isencao"    => "motivo isenção da ANVISA",
        // "tags"               => [   "1234",
                                    // "5678",
                                    // "91011"
                                    // ],
        //
        // "anexos"             => [["anexo"=> isset($product->images[0])? "https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$product->images[0]->path:'']],
        // "imagens_externas"   => [[ "imagem_externa"=> [ "url"=> isset($product->images[0])? "https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$product->images[0]->path:'']]],
        //
        // "seo"                => ["seo_title"=> $product->name,
                                    // "seo_keywords"=> $product->name,
                                    // "link_video"=> "",
                                    // "seo_description"=> "",
                                    // "slug"=> $product->slug
        //                          ]

        // $product->sku ='1000'.$product->id;
        // $product->tiny_import = 1;
        // $product->save();

//--------------------TRATAR EM PHP-----------------//

    })

    function submit(e) {
        e.preventDefault()
        setOpen(false);
        post(route('api.tiny.product.store'));

    }

    return (
        <>
            <div className="py-4 text-center px-8">
                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"*/}
                {/*    onClick={() => setOpen(true)}*/}
                {/*>*/}
                {/*    CRIAR PRODUTO NO SISTEMA TINY*/}
                {/*</button>*/}


                <button onClick={() => setOpen(true)}
                        className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <PlusCircleIcon
                        className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    <span className="text-gray-500 group-hover:text-gray-700 text-xs">CRIAR PRODUTO NO SISTEMA TINY</span>
                </button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0"/>
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
                                                    <Dialog.Title
                                                        className="text-lg font-medium text-teal-600"> Adicionar
                                                        Itens </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 justify-end">
                                                        <form onSubmit={submit}>
                                                            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                                                                            Nome
                                                                        </label>
                                                                        {errors.nome && <div>{errors.nome}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="nome"
                                                                                value={data.nome}
                                                                                onChange={e => setData('nome', e.target.value)}
                                                                                name="nome"
                                                                                autoComplete="nome"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="sequencia" className="block text-sm font-medium text-gray-700">
                                                                            Sequencia
                                                                        </label>
                                                                        {errors.sequencia && <div>{errors.sequencia}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="sequencia"
                                                                                value={data.sequencia}
                                                                                onChange={e => setData('sequencia', e.target.value)}
                                                                                name="sequencia"
                                                                                autoComplete="sequencia"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
                                                                            Tiny product id
                                                                        </label>
                                                                        {errors.product_id && <div>{errors.product_id}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="product_id"
                                                                                value={data.product_id}
                                                                                onChange={e => setData('product_id', e.target.value)}
                                                                                name="product_id"
                                                                                autoComplete="product_id"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                                                                            Código
                                                                        </label>
                                                                        {errors.codigo && <div>{errors.codigo}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="codigo"
                                                                                value={data.codigo}
                                                                                onChange={e => setData('codigo', e.target.value)}
                                                                                name="codigo"
                                                                                autoComplete="codigo"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="ncm" className="block text-sm font-medium text-gray-700">
                                                                            NCM
                                                                        </label>
                                                                        {errors.ncm && <div>{errors.ncm}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="ncm"
                                                                                value={data.ncm}
                                                                                onChange={e => setData('ncm', e.target.value)}
                                                                                name="ncm"
                                                                                autoComplete="ncm"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="unidade" className="block text-sm font-medium text-gray-700">
                                                                            Unidade
                                                                        </label>
                                                                        {errors.unidade && <div>{errors.unidade}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="unidade"
                                                                                value={data.unidade}
                                                                                onChange={e => setData('unidade', e.target.value)}
                                                                                name="unidade"
                                                                                autoComplete="unidade"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
                                                                            Preço
                                                                        </label>
                                                                        {errors.preco && <div>{errors.preco}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="preco"
                                                                                value={data.preco}
                                                                                onChange={e => setData('preco', e.target.value)}
                                                                                name="preco"
                                                                                autoComplete="preco"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="preco_promocional" className="block text-sm font-medium text-gray-700">
                                                                            Preço promocional
                                                                        </label>
                                                                        {errors.preco_promocional && <div>{errors.preco_promocional}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="preco_promocional"
                                                                                value={data.preco_promocional}
                                                                                onChange={e => setData('preco_promocional', e.target.value)}
                                                                                name="preco_promocional"
                                                                                autoComplete="preco_promocional"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="origem" className="block text-sm font-medium text-gray-700">
                                                                            Origem
                                                                        </label>
                                                                        {errors.origem && <div>{errors.origem}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="origem"
                                                                                value={data.origem}
                                                                                onChange={e => setData('origem', e.target.value)}
                                                                                name="origem"
                                                                                autoComplete="origem"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="situacao" className="block text-sm font-medium text-gray-700">
                                                                            Situação
                                                                        </label>
                                                                        {errors.situacao && <div>{errors.situacao}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="situacao"
                                                                                value={data.situacao}
                                                                                onChange={e => setData('situacao', e.target.value)}
                                                                                name="situacao"
                                                                                autoComplete="situacao"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                                                                            Tipo
                                                                        </label>
                                                                        {errors.tipo && <div>{errors.tipo}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="tipo"
                                                                                value={data.tipo}
                                                                                onChange={e => setData('tipo', e.target.value)}
                                                                                name="tipo"
                                                                                autoComplete="tipo"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                                                                            Marca
                                                                        </label>
                                                                        {errors.marca && <div>{errors.marca}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="marca"
                                                                                value={data.marca}
                                                                                onChange={e => setData('marca', e.target.value)}
                                                                                name="marca"
                                                                                autoComplete="marca"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="tipo_embalagem" className="block text-sm font-medium text-gray-700">
                                                                            Tipo Embalagem
                                                                        </label>
                                                                        {errors.tipo_embalagem && <div>{errors.tipo_embalagem}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="tipo_embalagem"
                                                                                value={data.tipo_embalagem}
                                                                                onChange={e => setData('tipo_embalagem', e.target.value)}
                                                                                name="tipo_embalagem"
                                                                                autoComplete="tipo_embalagem"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="altura_embalagem" className="block text-sm font-medium text-gray-700">
                                                                            Altura embalagem
                                                                        </label>
                                                                        {errors.altura_embalagem && <div>{errors.altura_embalagem}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="altura_embalagem"
                                                                                value={data.altura_embalagem}
                                                                                onChange={e => setData('altura_embalagem', e.target.value)}
                                                                                name="altura_embalagem"
                                                                                autoComplete="altura_embalagem"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="comprimento_embalagem" className="block text-sm font-medium text-gray-700">
                                                                            Comprimento embalagem
                                                                        </label>
                                                                        {errors.comprimento_embalagem && <div>{errors.comprimento_embalagem}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="comprimento_embalagem"
                                                                                value={data.comprimento_embalagem}
                                                                                onChange={e => setData('comprimento_embalagem', e.target.value)}
                                                                                name="comprimento_embalagem"
                                                                                autoComplete="comprimento_embalagem"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="largura_embalagem" className="block text-sm font-medium text-gray-700">
                                                                            Largura embalagem
                                                                        </label>
                                                                        {errors.largura_embalagem && <div>{errors.largura_embalagem}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="largura_embalagem"
                                                                                value={data.largura_embalagem}
                                                                                onChange={e => setData('largura_embalagem', e.target.value)}
                                                                                name="largura_embalagem"
                                                                                autoComplete="largura_embalagem"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="diametro_embalagem" className="block text-sm font-medium text-gray-700">
                                                                            Diâmetro embalagem
                                                                        </label>
                                                                        {errors.diametro_embalagem && <div>{errors.diametro_embalagem}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="diametro_embalagem"
                                                                                value={data.diametro_embalagem}
                                                                                onChange={e => setData('diametro_embalagem', e.target.value)}
                                                                                name="diametro_embalagem"
                                                                                autoComplete="diametro_embalagem"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="garantia" className="block text-sm font-medium text-gray-700">
                                                                            Garantia
                                                                        </label>
                                                                        {errors.garantia && <div>{errors.garantia}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="garantia"
                                                                                value={data.garantia}
                                                                                onChange={e => setData('garantia', e.target.value)}
                                                                                name="garantia"
                                                                                autoComplete="garantia"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-4">
                                                                        <label htmlFor="cest" className="block text-sm font-medium text-gray-700">
                                                                            CEST
                                                                        </label>
                                                                        {errors.cest && <div>{errors.cest}</div>}
                                                                        <div className="mt-1">
                                                                            <input
                                                                                type="text"
                                                                                id="cest"
                                                                                value={data.cest}
                                                                                onChange={e => setData('cest', e.target.value)}
                                                                                name="cest"
                                                                                autoComplete="cest"
                                                                                className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
                                            </div>
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
