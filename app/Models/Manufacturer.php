<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{

    protected $table = 'atelier_manufacturers';

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

    public function gema_fabricante()
    {
        return $this->hasMany(GemaFabricante::class);
    }
    public function metal_fabricante()
    {
        return $this->hasMany(MetalFabricante::class,'fabricante_id','id');
    }
    public function criacao_configuracao_fabricante()
    {
        return $this->hasMany(CriacaoConfiguracaoFabricante::class);
    }
    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
    public function ordem_servicos()
    {
        return $this->hasMany(OrdemServicos::class);
    }
}
