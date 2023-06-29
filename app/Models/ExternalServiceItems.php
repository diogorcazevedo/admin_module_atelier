<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExternalServiceItems extends Model
{
    protected $table = 'atelier_service_external_items';

    protected $fillable =[
        'service_id',
        'user_id',
        'order_id',
        'jewel_external_id',
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

    public function jewel_external()
    {
        return $this->belongsTo(JewelExternal::class,'jewel_external_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}
