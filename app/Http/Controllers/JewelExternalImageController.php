<?php

namespace App\Http\Controllers;


use App\Models\JewelExternalImages;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;


class JewelExternalImageController extends Controller
{


    private JewelExternalImages $jewelExternalImages;

    public function __construct(JewelExternalImages $jewelExternalImages)

    {
        $this->jewelExternalImages = $jewelExternalImages;
    }


    public function download($id)
    {

        $image = $this->jewelExternalImages->find($id);


        if ($image->path == NULL){

            $file= public_path(). "/storage/images/".$image->id.'.'.$image->extension;
            $headers = array(
                'Content-Type: application/'.$image->extension,
            );

            if($image->extension == 'webp'){

                return Response::download($file, $image->id.'.'.'png', $headers);

            }else{
                return Response::download($file, $image->id.'.'.$image->extension, $headers);
            }

        }else{



            $headers = [
                'Content-Type'        => 'application/jpeg',
                'Content-Disposition' => 'attachment; filename="'.$image->id.'.'.$image->extension.'"',

            ];

            return Response::make(Storage::disk('s3')->get($image->path), 200, $headers);

        }


    }

}







