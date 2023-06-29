<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;


use App\Models\ProductImages;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductImageService
{



    public function __construct(UserRepository $userRepository)
    {


    }

        public function imageStore($request,$product){

            $data = $request->all();
            $data['product_id'] = $product->id;
            $data['system'] = 2;
            $image = ProductImages::create($data);

            $file = $request->file('img');
            $extension =  $file->getClientOriginalExtension();
            Storage::disk('s3')->put("products/".$image->id.'.'.$extension,file_get_contents($file));
            Storage::disk('images')->put($image->id . '.' . $image->extension, File::get($file));

            $img = ProductImages::find($image->id);
            $img->path = "products/".$img->id.'.'.$extension;
            $img->extension = $extension;
            $img->publish = '0';
            $img->save();
        }

    public function imageDestroy($image)
    {
        $image = ProductImages::find($image);

        if(Storage::disk('public')->exists('/images/'.$image->id.'.'.$image->extension)) {
            Storage::disk('public')->delete('/images/'.$image->id.'.'.$image->extension);
        }
        if ($image->path != null){
            if(Storage::disk('s3')->exists($image->path)) {
                Storage::disk('s3')->delete($image->path);
            }
        }
        $image->delete();

    }

}
