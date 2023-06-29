<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExternalServices extends Model
{
    protected $table = 'atelier_service_external';
    protected $fillable = [
        'order_id',
        'user_id',
        'sale_id',
        'center_id',
        'manufacturer_id',
        'total',
        'status',
        'pay',
        'scheduled',
        'date',
        'month',
        'year',
        'date_shipping',
        'os_number',
        'operador',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function items()
    {
        return $this->hasMany(ExternalServiceItems::class,'service_id');
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class,'manufacturer_id');

    }
    public function center()
    {
        return $this->belongsTo(Centro::class,'center_id');
    }

    public function scopeOfItems($query,$manufacturer_id)
    {
        return $query->whereHas('items', function ($query) {
            $query->where('status',2);
        })->where('manufacturer_id',$manufacturer_id);

    }

}
