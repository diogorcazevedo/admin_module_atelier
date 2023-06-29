<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPrices extends Model
{

    protected $table = 'atelier_product_prices';

    protected $fillable =[
        'id',
        'product_id',
        'price',

    ];


    public function products()
    {
        return $this->belongsTo(Product::class,'product_id');

    }


}
