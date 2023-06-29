<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class ProductGem extends Model
{

    protected $table = 'atelier_product_gem';
    protected $fillable =[
        'product_id',
        'gem_id',
        'size',
        'quantity'

    ];

    public function gem()
    {
        return $this->belongsTo(Gems::class);

    }

    public function product()
    {
        return $this->belongsTo(Product::class);

    }

}
