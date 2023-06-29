<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id','name','alias', 'legal_entity_id','main','type'
    ];


    public function legal_entity()
    {
        return $this->morphOne(LegalEntity::class, 'legal_entityable');
    }


    //many to many
    public function documents()
    {
        return $this->morphToMany(Document::class, 'documentable');
    }

    public function images()
    {
        return $this->morphToMany(Image::class, 'imageable');
    }


    public function video()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }


    //one to many
    public function addresses()
    {
        return $this->morphMany(Address::class, 'addressable');
    }
    //one to many
    public function contacts()
    {
        return $this->morphMany(Contact::class, 'contactable');
    }



}
