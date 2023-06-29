import {Head, usePage} from '@inertiajs/react';
import React from 'react';
import Auth from '@/Layouts/Auth';
import FormEditPassword from "@/Pages/Users/Components/FormEditPassword";
import FormEditAddress from "@/Pages/Users/Components/FormEditAddress";
import FormEditRegister from "@/Pages/Users/Components/FormEditRegister";

  export default function Edit({user,states,city}) {
      const {auth} = usePage().props
      const {flash} = usePage().props
      const {errors} = usePage().props

    return (

      <Auth auth={auth} errors={errors} >
          <Head title="Users" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
              <div className="flex flex-row shadow mt-4 mb-4 p-6">
                  <div className="basis-3/4">
                      <h3 className="text-lg">EDITAR: {user.name} </h3>
                  </div>
                  <div className="basis-1/4">
                      <FormEditPassword user={user}/>
                  </div>
              </div>
              {flash.message && (
                  <div className="bg-teal-600 text-white">{flash.message}</div>
              )}
              <div className="flex flex-row">
                  <div className="basis-1/2">
                      <div className="p-4 m-2  shadow-lg">
                          <h3 className="text-lg p-2 bg-teal-900 text-white">Dados Cadastrais e Contato</h3>
                          <FormEditRegister user={user} />
                      </div>
                  </div>
                  <div className="basis-1/2">
                      <div className="p-4 m-2 shadow-lg">
                          <h3 className="text-lg p-2 bg-teal-900 text-white">Endereço</h3>
                          <FormEditAddress user={user} states={states} city={city}/>
                      </div>
                  </div>
              </div>


          </div>
      </Auth>
    )
  }
