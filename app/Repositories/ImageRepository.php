<?php

namespace App\Repositories;



use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class ImageRepository
{


    /**
     * @var Image
     */
    private $image;

    public function __construct(Image $image)
    {
        $this->image = $image;
    }


    public function destroy($id)
    {
        $image = Image::find($id);

        Storage::disk('public')->delete('/images/'.$image->id.'.'.$image->extension);
        $this->image->destroy($id);
    }


}
