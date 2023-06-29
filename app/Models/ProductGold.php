<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class ProductGold extends Model
{

    protected $table = 'atelier_product_gold';
    protected $fillable =[
        'product_id',
        'gold_id',
        'quantity'

    ];

    public function gold()
    {
        return $this->belongsTo(Gold::class);

    }

    public function product()
    {
        return $this->belongsTo(Product::class);

    }


}
