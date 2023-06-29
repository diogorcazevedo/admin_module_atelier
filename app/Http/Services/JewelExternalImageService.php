<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;



use App\Models\JewelExternalImages;
use Illuminate\Support\Facades\Storage;

class JewelExternalImageService
{


        public function imageStore($request,$jewel){

            $data = $request->all();
            $data['jewel_external_id'] = $jewel->id;
            $data['system'] = 2;
            $image = JewelExternalImages::create($data);
            $file = $request->file('img');
            $extension =  $file->getClientOriginalExtension();
            Storage::disk('s3')->put("atelier/jewels/external/".$image->id.'.'.$extension,file_get_contents($file));
            $img = JewelExternalImages::find($image->id);
            $img->path = "atelier/jewels/external/".$img->id.'.'.$extension;
            $img->extension = $extension;
            $img->publish = '0';
            $img->save();
        }

    public function imageDestroy($image)
    {
        $image = JewelExternalImages::find($image);
        if(Storage::disk('s3')->exists($image->path)) {
            Storage::disk('s3')->delete($image->path);
        }
        $image->delete();

    }

}
