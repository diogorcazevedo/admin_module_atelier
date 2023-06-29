<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOrdersItems extends Model
{
    protected $table = 'atelier_production_order_items';
    protected $fillable =[
        'production_order_id',
        'product_id',
        'jewel_id',
        'price',
        'aro',
        'obs',
        'codigo_fabricante',
        'entregue',
        'qtd'
    ];


    public function production_order()
    {
        return $this->belongsTo(ProductionOrders::class,'production_order_id');
    }

    public function jewel()
    {
        return $this->belongsTo(Jewel::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeOfProductionOrders($query, $manufacturer_id)
    {
        return $query->whereHas('prodution_orders', function ($query) use ($manufacturer_id) {
            $query->where('manufacturer_id',$manufacturer_id);
        })->where('entregue',0);

    }
    public function scopeOfProductionOrdersSemFabricante($query)
    {
        return $query->whereHas('prodution_orders', function ($query) {
        })->where('entregue',0);

    }
}
