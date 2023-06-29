import {Head, usePage,useForm,Link} from '@inertiajs/react';
import React from 'react';
import Auth from '@/Layouts/Auth';

  export default function Edit({jewel,categories,collections}) {
      const {auth} = usePage().props

      const {data, setData, post, processing, errors} = useForm({
          name: jewel.name,
          description: jewel.description,
          category_id: jewel.category_id,
          collection_id: jewel.collection_id,
      })

      function submit(e) {
          e.preventDefault()
          post(route("jewels.update",{'id':jewel.id}));

      }
    return (

      <Auth auth={auth} errors={errors} >
          <Head title="jewel" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
              <div className="rounded p-6 overflow-hidden shadow-lg">
                  <div className="shadow mt-6 p-4 flex flex-row">
                      <div className="basis-1/2">
                          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Editar Joia</h2>
                      </div>
                      <div className="basis-1/2">
                          <Link href={route('jewels.images.index',{jewel:jewel.id})} className="float-right inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                              <img className="w-14 h-14  flex-shrink-0"
                                   src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+jewel.images[0]?.path}/>
                          </Link>
                      </div>
                  </div>
                  <form onSubmit={submit}>
                      <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                              <div className="col-span-3 sm:col-span-4">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                      Nome
                                  </label>
                                  {errors.name && <div>{errors.name}</div>}
                                  <div className="mt-1">
                                      <input
                                          type="text"
                                          id="name"
                                          value={data.name}
                                          onChange={e => setData('name', e.target.value)}
                                          name="name"
                                          autoComplete="name"
                                          className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                      />
                                  </div>
                              </div>
                              <div className="col-span-3 sm:col-span-4">
                                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                      Descrição
                                  </label>
                                  {errors.description && <div>{errors.description}</div>}
                                  <div className="mt-1">
                                      <input
                                          type="text"
                                          id="description"
                                          name="description"
                                          value={data.description}
                                          onChange={e => setData('description', e.target.value)}
                                          autoComplete="description"
                                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="mt-6 grid grid-cols-2 gap-4">
                              <div className="">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                      Coleções
                                  </label>
                                  <select name="collection_id"
                                          required="required"
                                          id="collection_id"
                                          onChange={e => setData('collection_id', e.target.value)}
                                          value={data.collection_id}
                                          className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                  >
                                      <option>Coleções</option>
                                      {collections.map((collection, index) => {
                                          return (
                                              <option key={index} value={collection.id}>
                                                  {collection.name}
                                              </option>
                                          );
                                      })}
                                  </select>
                                  {errors.collection_id && <div className="text-red-600">{errors.collection_id}</div>}
                              </div>
                              <div className="">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                      Categorias
                                  </label>
                                  <select name="category_id"
                                          required="required"
                                          id="category_id"
                                          onChange={e => setData('category_id', e.target.value)}
                                          value={data.category_id}
                                          className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                                  >
                                      <option>Categorias</option>
                                      {categories.map((category, index) => {
                                          return (
                                              <option key={index} value={category.id}>
                                                  {category.name}
                                              </option>
                                          );
                                      })}
                                  </select>
                                  {errors.category_id && <div className="text-red-600">{errors.category_id}</div>}
                              </div>
                          </div>
                          <div className="mt-16 grid grid-cols-3  gap-4 sm:items-end">
                              <div>
                                  {/*<Link href={route('jewels.edit',{id:jewel.id})}*/}
                                  {/*    className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-danger-500">*/}
                                  {/*    excluir*/}
                                  {/*</Link>*/}
                              </div>

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
    )
  }
