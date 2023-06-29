<?php

namespace App\Http\Controllers;


use App\Http\Services\JewelExternalImageService;
use App\Http\Services\JewelExternalListService;
use App\Models\Category;
use App\Models\ImageType;
use App\Models\JewelExternal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JewelExternalController extends Controller
{


    private JewelExternalImageService $jewelExternalImageService;
    private JewelExternalListService $jewelExternalListService;
    private JewelExternal $jewelExternal;

    public function __construct(JewelExternalImageService $jewelExternalImageService,
                                JewelExternalListService  $jewelExternalListService,
                                JewelExternal $jewelExternal)

    {

        $this->jewelExternalImageService = $jewelExternalImageService;
        $this->jewelExternalListService = $jewelExternalListService;
        $this->jewelExternal = $jewelExternal;
    }


    public function index(Request $request,$category = null)
    {

        $search = $request->input('search');
        $jewel_externals = $this->jewelExternalListService->filter($search,$category);
        $categories = Category::orderBy('name','asc')->get();


        return Inertia::render('JewelExternal/Index',[
            'jewel_externals'=>$jewel_externals,
            'search'=>$search,
            'categories'=>$categories,
        ]);

    }


    public function create(Category $category)
    {
        $url = URL::previous();
        $categories  = $category->orderBy('name')->get();

        return Inertia::render('JewelExternal/Create',[
            'categories'=>$categories,
            'url'=>$url,
        ]);
    }



    public function store(Request $request)
    {

        $data = $request->all();
        JewelExternal::create($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }



    public function edit(JewelExternal $jewelExternal, Category $category)
    {
        $url = URL::previous();
        $categories  = $category->orderBy('name')->get();

        return Inertia::render('JewelExternal/Edit',[
            'jewel_external'=>$jewelExternal,
            'categories'=>$categories,
            'url'=>$url,
        ]);
    }


    public function update(Request $request, JewelExternal $jewelExternal)
    {

        $data = $request->all();
        $data['slug'] = Str::slug($data['name'], "-");
        $jewelExternal->update($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function destroy(JewelExternal $jewelExternal)
    {
        $jewelExternal->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function images($id)
    {
        $jewelExternal = $this->jewelExternal->find($id);
        $types = ImageType::where('sessao_id',4)->get();
        $images = $jewelExternal->images();
        $images = $images->with('imageType')->get();

        return Inertia::render('JewelExternal/Images',[
            'images'=>$images,
            'jewelExternal'=>$jewelExternal,
            'types'=>$types,
        ]);

    }

    public function imageStore(Request $request,$id )
    {
        $jewel = $this->jewelExternal->find($id);
        $this->jewelExternalImageService->imageStore($request,$jewel);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function imageDestroy( $image)
    {
        $this->jewelExternalImageService->imageDestroy($image);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

}


