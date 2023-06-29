<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceItems extends Model
{
    protected $table = 'atelier_service_items';

    protected $fillable =[
        'service_id',
        'user_id',
        'order_id',
        'product_id',
        'manufacturer_id',
        'description',
        'total',
        'status',
        'scheduled',
        'date',
        'month',
        'year',
        'date_shipping',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}
