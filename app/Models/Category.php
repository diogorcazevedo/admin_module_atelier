<?php

namespace App\Models;

use App\Entities\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'slug',
        'line_up',

    ];


    public function getNameAttribute($value)
    {
        return mb_strtoupper($value);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = mb_strtoupper($value);
    }


    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function products()
    {
        return $this->hasMany(Product::class);

    }

}
