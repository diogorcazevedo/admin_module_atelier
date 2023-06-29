<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class JewelExternal extends Model
{

    protected $table = 'atelier_jewel_external';
    protected $fillable =[
        'id',
        'category_id',
        'collection_id',
        'supplier_id',
        'codigo',
        'peso',
        'cor',
        'name',
        'description',

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

    public function images()
    {
        return $this->hasMany(JewelExternalImages::class,'jewel_external_id');
    }

    public function scopeOfSearch($query, $search)
    {
        return $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('id', 'LIKE', '%' . $search . '%')->with('images');
    }
}
