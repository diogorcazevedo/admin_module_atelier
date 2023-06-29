<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{

    protected $table="product_images";
    protected $fillable = [
        'type','image_type_id','extension','product_id','path','system'
    ];


    public function imageType()
    {
        return $this->belongsTo(ImageType::class,'image_type_id','id');
    }


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
