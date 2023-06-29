<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JewelExternalImages extends Model
{

    protected $table="atelier_jewel_external_images";
    protected $fillable = [
        'type','image_type_id','extension','jewel_external_id','path','system'
    ];


    public function image_type()
    {
        return $this->belongsTo(ImageType::class,'image_type_id','id');
    }


    public function jewel_external()
    {
        return $this->belongsTo(JewelExternal::class,'jewel_external_id');
    }
}
