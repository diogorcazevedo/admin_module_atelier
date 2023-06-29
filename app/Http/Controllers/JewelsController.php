<?php
namespace App\Http\Controllers;


use App\Http\Services\JewelsImageService;
use App\Models\ImageType;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Jewel;
use App\Models\JewelsImages;
use App\Repositories\ImageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
class JewelsController extends Controller
{

    /**
     * @var ImageRepository
     */

    private $category;
    private $collection;
    private $jewel;
    private JewelsImageService $jewelsImageService;
    private JewelsImages $jewelsImages;


    public function __construct(Jewel $jewel,
                                Category $category,
                                Collection $collection,
                                JewelsImageService $jewelsImageService,
                                JewelsImages $jewelsImages)
    {
        $this->category = $category;
        $this->collection = $collection;
        $this->jewel = $jewel;
        $this->jewelsImageService = $jewelsImageService;
        $this->jewelsImages = $jewelsImages;
    }

    public function index(Request $request,$collection = null,$category = null )
    {

        $search = $request->input('search');

        if($collection != null AND $collection !=0){
            $jewels = $this->jewel->where('collection_id',$collection)->with('category','collection','images','products')->orderBy('category_id')->get();
        }elseif($category != null){
            $jewels = $this->jewel->where('category_id',$category)->with('category','collection','images','products')->orderBy('collection_id')->get();
        }else{
            if (empty($search)) {
                $jewels = $this->jewel->with('category','collection','images','products')->take(10)->get();
            }else{
                $jewels = $this->jewel->ofSearch($search)->with('category','collection','images','products')->get();
            }
        }

        $categories  =   $this->category->orderBy('name')->get();
        $collections =   $this->collection->orderBy('slug')->get();

        return Inertia::render('Jewels/Index',[
            'jewels'        =>$jewels,
            'search'        =>$search,
            'categories'    =>$categories,
            'collections'   =>$collections,
        ]);

    }


    public function create(Collection $collection, Category $category)
    {

        $categories  =   $category->orderBy('name')->get();
        $collections =   $collection->orderBy('slug')->get();

        return Inertia::render('Jewels/Create',[
            'categories'=>$categories,
            'collections'=>$collections,
        ]);

    }


    public function store(Request $request)
    {

        $data = $request->all();
        $jewel = $this->jewel->create($data);
        return redirect()->route('jewels.index',['collection'=>$jewel->collection_id])->with('message', 'Operação realizada com sucesso');
    }


    public function edit($id,Collection $collection, Category $category)
    {
        $jewel       =   $this->jewel->where('id',$id)->with('images')->first();
        $categories  =   $category->orderBy('name')->get();
        $collections =   $collection->orderBy('slug')->get();

        return Inertia::render('Jewels/Edit',[
            'jewel'=>$jewel,
            'categories'=>$categories,
            'collections'=>$collections,
        ]);
    }


    public function update(Request $request,$id)
    {
        $jewel = $this->jewel->find($id);
        $data = $request->all();
        $jewel->update($data);
        return redirect()->route('jewels.index',['collection'=>$jewel->collection_id])->with('message', 'Operação realizada com sucesso');
    }


    public function destroy($id)
    {
        $jewel = $this->jewel->find($id);
        $this->jewel->destroy($jewel->id);
        return redirect()->back();
    }


    public function images(Jewel $jewel)
    {
        //$types = ImageType::where('sessao_id',5)->get();
        $types = ImageType::where('id',504)->get();
        $images = $jewel->images();
        $images = $images->with('imageType')->get();

        return Inertia::render('Jewels/Images',[
            'jewel'=>$jewel,
            'types'=>$types,
            'images'=>$images,
        ]);
    }

    public function imageStore(Request $request,Jewel $jewel)
    {
        $this->jewelsImageService->imageStore($request,$jewel);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function imageDestroy($image)
    {
        $this->jewelsImageService->imageDestroy($image);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function download($id)
    {

        $image = $this->jewelsImages->find($id);
        $headers = [
            'Content-Type'        => 'application/jpeg',
            'Content-Disposition' => 'attachment; filename="'.$image->id.'.'.$image->extension.'"',

        ];

        return Response::make(Storage::disk('s3')->get($image->path), 200, $headers);


    }

}
