import React from 'react';
import {Link} from '@inertiajs/react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import FormSearchGeneric from "@/Pages/Jewels/Components/FormSearchGeneric";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function get_collections(collections){

    let menuItemsCollection = [];

    {collections.map((collection) => (
        menuItemsCollection.push(
            <Menu.Item key={collection.id}>
                {({ active }) => (
                    <Link
                        href={route('jewels.index',{collection:collection.id,category:null})}
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900 z-50' : 'text-gray-700 z-50',
                            'block px-4 py-2 text-sm z-50'
                        )}
                    >
                        {collection.name}
                    </Link>
                )}
            </Menu.Item>
        )
    ))}
    return menuItemsCollection;
}

function get_categories(categories){

    let menuItemsCategories = [];

    {categories.map((category) => (
        menuItemsCategories.push(
            <Menu.Item key={category.id}>
                {({ active }) => (
                    <Link
                        href={route('jewels.index',{collection:0,category:category.id})}
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900 z-50' : 'text-gray-700 z-50',
                            'block px-4 py-2 text-sm z-50'
                        )}
                    >
                        {category.name}
                    </Link>
                )}
            </Menu.Item>
        )
    ))}
    return menuItemsCategories;
}


export default function SelectProductsByFilters({collections, categories}) {
    return (
        <>
            <div className="shadow mt-6 p-4 flex flex-row">
                <div className="basis-1/3">
                    <h2 className="px-4 text-2xl mt-2 font-light text-gray-900 sm:text-2xl ">Matriz Joias</h2>
                </div>
                <div className="basis-1/3">
                    <Menu as="div" className="relative inline-block text-left mt-2 mr-4 ">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                               coleções
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1 z-50">
                                    {get_collections(collections)}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left mt-2 mr-4 ">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                categories
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {get_categories(categories)}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className="basis-1/3 ">
                   <FormSearchGeneric rte="jewels.index" label="jewels"/>
                </div>
            </div>
        </>
    );
}
