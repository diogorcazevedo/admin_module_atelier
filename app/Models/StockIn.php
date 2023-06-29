<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockIn extends Model
{



    protected $table = 'product_stock_in';


    protected $fillable = [
        'product_id',
        'quantity',
        'unit_cost',
        'in_cost',
        'offered_price',

    ];

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function product()
    {
        return $this->belongsTo(Product::class);

    }

}
