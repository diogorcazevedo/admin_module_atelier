<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOrders extends Model
{
    protected $table = 'atelier_production_orders';
    protected $fillable = [
        'manufacturer_id',
        'user_id',
        'total',
        'total_imposto',
        'ouro',
        'status',
        'credito',
        'operador',
        'desconto',
        'data',
        'pagamento',
        'parcelamento',
        'imposto',
        'frete',
        'notafiscal',
        'obs',
        'mes',
        'ano',
        'entregue',
        'qtd_ouro_24',
        'cotacao_ouro_24',
        'qtd_corrente_ouro',
        'indice_corrente_ouro',
        'cotacao_corrente_ouro',
        'previsao',
        'previsao_mes',
        'numero_os',
        'previsao_ano',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);

    }

    public function items()
    {
        return $this->hasMany(ProductionOrdersItems::class,'production_order_id');
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class,'manufacturer_id');

    }
//    public function compra()
//    {
//        return $this->hasOne(Compra::class,'pedido_id');
//
//    }

    public function scopeOfItems($query,$fabricante_id)
    {
        return $query->whereHas('items', function ($query) {
            $query->where('entregue',0);
        })->where('manufacturer_id',$fabricante_id);

    }

}
