import React, {Fragment, useState} from 'react'
import {Dialog, Transition,Listbox} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {Link, useForm, usePage} from "@inertiajs/react";

export default function SlideCreateProductImages({product,images,types}) {
    const [open, setOpen] = useState(false)
    const { errors } = usePage().props

    const { data, setData, post, progress,processing } = useForm({
        image_type_id: '',
        img: '',
    })

    function renderImage(image){
        let imgTag =   <img
            src={"/online/storage/images/" + image.id + '.' + image.extension}
            className="w-full h-full object-center object-cover group-hover:opacity-75"
        />;

        if (image.path != null) {
            imgTag =   <img
                src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+image.path}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
            />;
        }
        return imgTag
    }

    function submit(e) {
        e.preventDefault()
        post(route('product.image.store',{product:product.id}))
    }


    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
            >
                <img className="w-24 h-24  flex-shrink-0"
                     src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+product.images[0]?.path}/>
            </button>
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
                                                    <Dialog.Title className="text-lg font-medium text-teal-600">
                                                        Adicionar nova imagem
                                                    </Dialog.Title>
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
                                            <div className="shadow mt-2 p-4 flex flex-row">
                                                <form onSubmit={submit}>
                                                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                        <div className="flex flex-row">
                                                            <div className="basis-2/4">
                                                                <div className="mr-4">
                                                                    <div className="sm:col-span-1">
                                                                        <select
                                                                            name="image_type_id"
                                                                            required="required"
                                                                            id="image_type_id"
                                                                            onChange={e => setData('image_type_id', e.target.value)}
                                                                            value={data.image_type_id}
                                                                            className="max-w-lg block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                        >
                                                                            <option></option>
                                                                            {types?.map((type, index) => {
                                                                                return (
                                                                                    <option key={type.id} value={type.id}>
                                                                                        {type.name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                        {errors.image_type_id && <div className="text-red-600">{errors.image_type_id}</div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="basis-1/4">
                                                                <div>
                                                                    <div className="sm:col-span-1">
                                                                        <input
                                                                            type="file"
                                                                            defaultValue={data.img}
                                                                            onChange={e => setData('img', e.target.files[0])}
                                                                        />
                                                                        {progress && (
                                                                            <progress value={progress.percentage} max="100">
                                                                                {progress.percentage}%
                                                                            </progress>
                                                                        )}
                                                                        {errors.img && <div className="text-red-600">{errors.img}</div>}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="basis-1/4">
                                                                <div className="flex justify-end">
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
                                                                        disabled={processing}>
                                                                        Salvar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="shadow mt-2 p-4 flex flex-row">
                                                <div className="p-6 lg:max-w-7xl lg:mx-auto">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="p-6 font-light text-gray-900 shadow"> {product.name}</h2>
                                                    </div>
                                                    <div className="mt-8 relative">
                                                        <div className="relative w-full pb-6 -mb-6 overflow-x-auto">
                                                            <ul role="list">
                                                                {images?.map((image) => (
                                                                    <li key={image.id} className="w-64 inline-flex flex-col text-center lg:w-auto shadow p-6">
                                                                        <div className="group relative">
                                                                            <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                                                                                {renderImage(image)}
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-xs text-gray-700 mt-4">
                                                                            {image.image_type.name}
                                                                        </p>
                                                                        <div className="mt-4 flex justify-between">
                                                                            <div>
                                                                                <Link
                                                                                    href={route('product.image.destroy',{image:image.id})}
                                                                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                                                >
                                                                                    destroy
                                                                                </Link>
                                                                            </div>
                                                                            <div>
                                                                                <a
                                                                                    href={route('product.image.download',{id:image.id})}
                                                                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-900 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                                                >
                                                                                    download
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
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
