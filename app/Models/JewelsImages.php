<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JewelsImages extends Model
{
    protected $table="atelier_jewels_images";
    protected $fillable = [
        'type','image_type_id','extension','jewel_id','path','system'
    ];


    public function imageType()
    {
        return $this->belongsTo(ImageType::class,'image_type_id','id');
    }


    public function jewel()
    {
        return $this->belongsTo(Jewel::class);
    }
}
