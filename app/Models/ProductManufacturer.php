<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class ProductManufacturer extends Model
{

    protected $table = 'atelier_product_manufacturer';

    protected $fillable =[
        'id',
        'jewel_id',
        'product_id',
        'supplier_id',
        'codigo',

    ];


    public function name(): Attribute
    {
        return new Attribute(
            get: fn ($value) => strtoupper($value),
            set: fn ($value) => strtoupper($value),
        );
    }

    public function description(): Attribute
    {
        return new Attribute(
            get: fn ($value) => strtoupper($value),
            set: fn ($value) => strtoupper($value),
        );
    }
    public function jewel()
    {
        return $this->belongsTo(Jewel::class,'criacao_id');

    }

    public function product()
    {
        return $this->hasOne(Product::class,'criacao_id');

    }

    public function product_prices()
    {
        return $this->hasMany(ProductPrices::class,'product_id');

    }


    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);

    }
    //many to many

    public function scopeOfSearch($query, $search)
    {
        return $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('id', 'LIKE', '%' . $search . '%');
    }

}
