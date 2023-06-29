<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{

    protected $table = 'product_stock';


    protected $fillable = [
        'product_id',
        'quantity',
        'offered_price',

    ];

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function product()
    {
        return $this->belongsTo(Product::class);

    }


    public function getOfferedPriceAttribute($value)
    {

     //   $pctm = 15.00;
      //  $value = $value - ($value / 100 * $pctm);
        return $value ;
    }
    /*

         public $preventAttrSet = true;

    public function getOfferedPriceAttribute($value) {
        if ($this->preventAttrSet) {
            $pctm = 15.00;
            $value = $value - ($value / 100 * $pctm);
            return $value;
        } else {
            return $value;
        }
    }
     */

}
