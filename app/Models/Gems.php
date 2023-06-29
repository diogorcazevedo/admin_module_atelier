<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;


class Gems extends Model
{

    protected $table = 'atelier_gems';

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

    public function gems()
    {
        return $this->hasMany(ComponentGem::class,'component_id');
    }


}
