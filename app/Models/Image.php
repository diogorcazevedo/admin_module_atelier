<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
   // use SoftDeletes;
   // protected $dates = ['deleted_at'];


    protected $fillable = [
        'type','image_type_id','extension'
    ];

    public function imageable()
    {
        return $this->morphTo();
    }

    public function jewels()
    {
        return $this->morphedByMany(Jewel::class, 'imageable');
    }

    public function collections()
    {
        return $this->morphedByMany(Collection::class, 'imageable');
    }
    public function products()
    {
        return $this->morphedByMany(Product::class, 'imageable');
    }
    public function ordem_servicos()
    {
        return $this->morphedByMany(OrdemServicos::class, 'imageable');
    }
    public function orcamentos()
    {
        return $this->morphedByMany(Orcamento::class, 'imageable');
    }
    public function ordem_servico_andamentos()
    {
        return $this->morphedByMany(OrdemServicoAndamentos::class, 'imageable');
    }
    public function materiais()
    {
        return $this->morphedByMany(Material::class, 'imageable');
    }
    public function gemas()
    {
        return $this->morphedByMany(Gema::class, 'imageable');
    }
    public function clips()
    {
        return $this->morphedByMany(Clip::class, 'imageable');
    }
    public function topics()
    {
        return $this->morphedByMany(Topic::class, 'imageable');
    }
    public function users()
    {
        return $this->morphedByMany(User::class, 'imageable');
    }
    public function jewel_external()
    {
        return $this->morphedByMany(JewelExternal::class, 'imageable');
    }
    public function imageType()
    {
        return $this->belongsTo(ImageType::class);
    }



}
