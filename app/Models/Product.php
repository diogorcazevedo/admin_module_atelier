<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{

    protected $table = 'products';
    protected $fillable =[
        'id',
        'jewel_id',
        'ouro_id',
        'category_id',
        'collection_id',
        'codigo',
        'peso',
        'cor',
        'name',
        'description',
        'recommended',
        'featured',
        'line_up',
        'destaque',
        'prazo',
        'publish',
        'sale',
        'slug',
        'peso_18k',
        'peso_fino',
        'sku',
        'ncm',
        'ean',
        'tiny_id',






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


    public function category()
    {
        return $this->belongsTo(Category::class);

    }
    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
    public function jewel()
    {
        return $this->belongsTo(Jewel::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImages::class);
    }

    public function golds()
    {
        return $this->hasMany(ProductGold::class,'product_id');
    }

    public function gems()
    {
        return $this->hasMany(ProductGem::class,'product_id');
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);

    }
    public function stock_in()
    {
        return $this->hasMany(StockIn::class);

    }

    public function scopeOfSearch($query, $search)
    {
        return $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('id', 'LIKE', '%' . $search . '%')
            ->with('images','stock','jewel')
            ->with(['golds.gold'])
            ->with(['gems.gem']);
    }
}
