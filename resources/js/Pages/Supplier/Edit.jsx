import {Head, usePage} from '@inertiajs/react';
import React from 'react';
import Auth from '@/Layouts/Auth';
import FormEditRegister from "@/Pages/Supplier/Components/FormEditRegister";
import FormEditAddress from "@/Pages/Supplier/Components/FormEditAddress";

  export default function Edit({supplier,states,city}) {
      const {auth} = usePage().props
      const {flash} = usePage().props
      const {errors} = usePage().props

    return (

      <Auth auth={auth} errors={errors} >
          <Head title="supplier" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
              {flash.message && (
                  <div className="p-6 bg-teal-600 text-white">{flash.message}</div>
              )}
            <div className="rounded p-6 overflow-hidden shadow-lg">
              <div className="flex flex-row shadow mt-4 mb-4 p-6">
                  <div className="basis-3/4">
                      <h3 className="text-lg">EDITAR: {supplier.name} </h3>
                  </div>

              </div>
              <div className="flex flex-row">
                  <div className="basis-1/2">
                      <div className="p-4 m-2  shadow-lg">
                          <h3 className="text-lg p-2 bg-teal-900 text-white">Dados Cadastrais e Contato</h3>
                          <FormEditRegister supplier={supplier} />
                      </div>
                  </div>
                  <div className="basis-1/2">
                      <div className="p-4 m-2 shadow-lg">
                          <h3 className="text-lg p-2 bg-teal-900 text-white">Endereço</h3>
                          <FormEditAddress supplier={supplier} states={states} city={city}/>
                      </div>
                  </div>
              </div>
            </div>
          </div>
      </Auth>
    )
  }
