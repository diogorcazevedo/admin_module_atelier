<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collection extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'description',
        'slug',
        'line_up',
        'publish',
        'destaque',

    ];

    public function getNameAttribute($value)
    {
        return mb_strtoupper($value);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = mb_strtoupper($value);
    }

    public function products()
    {
        return $this->hasMany(Product::class);

    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function images()
    {
        return $this->hasMany(CollectionImages::class);

    }

    //many to many
    public function documents()
    {
        return $this->morphToMany(Document::class, 'documentable');
    }
    /*
    public function images()
    {
        return $this->morphToMany(Image::class, 'imageable');
    }
    */
    public function video()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }


}
