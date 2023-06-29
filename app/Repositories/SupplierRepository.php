<?php

namespace App\Repositories;




use App\Models\City;
use App\Models\Supplier;

class SupplierRepository
{


    public function store($data)

    {
        $cel1 = str_replace('(', '', $data['cel']);
        $cel2 = str_replace(')', '', $cel1);
        $cel = '0'.$cel2;


        $city = City::where('name',$data['city'])->where('state_id',$data['state_id'])->first();

        return Supplier::create(
            [
                'name'            => $data['name'],
                'alias'           => $data['alias'],
                'cnpj'            => $data['cnpj'],
                'cel'             => $cel,
                'zipcode'         => $data['zipcode'],
                'address'         => $data['address'],
                'neighborhood'    => $data['neighborhood'],
                'number'          => $data['number'],
                'complement'      => $data['complement'],
                'city_id'         => $city->id,
                'state_id'        => $data['state_id'],
                'created_at'      => '2019-01-24 17:11:34',
            ]
        );

    }




}
