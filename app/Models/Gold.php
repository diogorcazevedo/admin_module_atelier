<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;


class Gold extends Model
{

    protected $table = 'atelier_golds';

    protected $fillable = [
        'name'
    ];

    public function name(): Attribute
    {
        return new Attribute(
            get: fn ($value) => strtoupper($value),
            set: fn ($value) => strtoupper($value),
        );
    }

    public function golds()
    {
        return $this->hasMany(ComponentGold::class,'component_id');
    }


}
