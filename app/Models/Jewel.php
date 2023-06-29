<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Jewel extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $table = 'atelier_jewels';
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

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function components()
    {
        return $this->hasMany(JewelComponents::class);
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
        return $this->hasMany(JewelsImages::class);
    }

    public function scopeOfSearch($query, $search)
    {
        return $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('id', 'LIKE', '%' . $search . '%');
    }

//        public function jewels()
//    {
//        return $this->hasOne(Jewel::class,'criacao_id');
//    }

//    public function criacao_precos()
//    {
//        return $this->hasMany(CriacaoPrecos::class,'criacao_id');
//
//    }
//    public function criacao_configuracoes()
//    {
//        return $this->hasMany(CriacaoConfiguracoes::class,'criacao_id');
//
//    }
//


}
