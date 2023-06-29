<?php


namespace App\Http\Requests;





use App\Entities\Image;
use App\Models\JewelsImages;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ImagesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */



    public function rules()
    {

        return [

             'image_type_id'      =>'required',

        ];

    }

    public function store()
    {
        $file           = $this->file('image');
        $image_type_id  = $this->input('image_type_id');
        $publish        = $this->input('publish');
        $extension      = $file->getClientOriginalExtension();

        $img = Image::create([
            'extension' =>  "webp",
            'publish' => $publish,
            'image_type_id' => $image_type_id,
        ]);


            $file = $this->file('image');
            $image = imagecreatefromstring(file_get_contents($file));
            Storage::disk('s3')->put("atelier/jewels/".$image->id.'.'.$extension,file_get_contents($file));

//            $img = Image::find($image->id);
//            $img->path = "atelier/jewels/".$img->id.'.'.$extension;
//            $img->extension = $extension;
//            $img->publish = '0';
//            $img->save();


    }


}
