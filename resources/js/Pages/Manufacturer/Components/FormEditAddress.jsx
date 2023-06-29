import { useForm} from '@inertiajs/react';
import React from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';

export default function FormEditAddress({manufacturer,states,city}) {

    const { data, setData, post, processing, errors} = useForm({
        name: manufacturer.name,
        zipcode: manufacturer.zipcode,
        address: manufacturer.address,
        number: manufacturer.number,
        complement: manufacturer.complement,
        neighborhood: manufacturer.neighborhood,
        city: city.name,
        state_id: manufacturer.state_id,

    })

    function submit(e) {
        e.preventDefault()
        post(route('manufacturer.update',{id:manufacturer.id}))
    }


    const searchCep = (setData,e) =>{

        const cep = e.target.value;
        const url_cep = 'https://viacep.com.br/ws/'+ cep + '/json/';
        axios.defaults.headers.common = null
        axios.get(url_cep).then(function (response) {

            const dt = {
                zipcode:e.target.value,
                address:response.data.logradouro,
                neighborhood:response.data.bairro,
                city:response.data.localidade,
                state:response.data.uf
            };


            setData(dt);

        }.bind(this)).catch(function (error) {
            console.log(error);
            // this.limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        });
    }

    return (
            <>
                <form onSubmit={submit}>
                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                        <div className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                                    CEP
                                </label>
                                <div className="mt-1">
                                    <InputMask
                                        type="text"
                                        id="zipcode"
                                        mask="99999999"
                                        // onBlur={searchCep}
                                        onBlur={(e) => searchCep(setData, e)}
                                        name="zipcode"
                                        value={data.zipcode}
                                        onChange={e => setData('zipcode', e.target.value)}
                                        autoComplete="zipcode"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    ></InputMask>
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                    Endereço
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        autoComplete="address"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                    Número
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        value={data.number}
                                        onChange={e => setData('number', e.target.value)}
                                        autoComplete="number"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                                    Complemento
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="complement"
                                        name="complement"
                                        value={data.complement}
                                        onChange={e => setData('complement', e.target.value)}
                                        autoComplete="complement"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                                    Bairro
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="neighborhood"
                                        name="neighborhood"
                                        value={data.neighborhood}
                                        onChange={e => setData('neighborhood', e.target.value)}
                                        autoComplete="neighborhood"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                                <div className="mt-1">
                                    <input
                                        required
                                        type="text"
                                        id="city"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        name="city"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                                <div className="mt-1">
                                    <select
                                        name="state_id"
                                        required="required"
                                        id="state_id"
                                        onChange={e => setData('state_id', e.target.value)}
                                        value={data.state_id}
                                        className="max-w-lg block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        {states.map((state, index) => {
                                            return (
                                                <option key={index} value={state.id}>
                                                    {state.uf}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.state_id && <div className="text-red-600">{errors.state_id}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end pt-6 ">
                            <button
                                type="submit"
                                className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
                                disabled={processing}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>


            </>

    )
}
