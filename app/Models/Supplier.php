<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{

    protected $table = 'atelier_suppliers';

    protected $fillable = [
        'id',
        'name',
        'alias',
        'cnpj',
        'cel',
        'zipcode',
        'address',
        'number',
        'neighborhood',
        'complement',
        'city_id',
        'state_id',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
    public function state()
    {
        return $this->belongsTo(State::class);
    }


    public function getNameAttribute($value)
    {
        return mb_strtoupper($value);
    }
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = mb_strtoupper($value);
    }


}
