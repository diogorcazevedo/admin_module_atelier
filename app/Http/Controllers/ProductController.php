<?php

namespace App\Http\Controllers;


use App\Http\Requests\StockCreateRequest;
use App\Http\Services\ProductImageService;
use App\Http\Services\ProductListService;
use App\Http\Services\ProductStockService;
use App\Http\Services\TinyProductService;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Gems;
use App\Models\Gold;
use App\Models\ImageType;
use App\Models\Jewel;
use App\Models\OrderItems;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\ProductionOrdersItems;
use App\Models\Stock;
use App\Models\StockIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * @var ProductListService
     */
    private $productListService;
    /**
     * @var ProductImageService
     */
    private ProductImageService $productImageService;
    private Gold $gold;
    private Gems $gems;
    private Jewel $jewel;
    private Product $product;
    private ProductImages $productImages;
    private OrderItems $orderItems;
    private ProductionOrdersItems $productionOrdersItems;
    private StockIn $stockIn;
    private Stock $stock;
    private TinyProductService $tinyProductService;
    private ProductStockService $productStockService;


    public function __construct(ProductListService $productListService,
                                ProductImageService $productImageService,
                                ProductImages $productImages,
                                Gold $gold,
                                Gems $gems,
                                Jewel $jewel,
                                Product $product,
                                OrderItems $orderItems,
                                ProductionOrdersItems $productionOrdersItems,
                                StockIn $stockIn,
                                Stock $stock,
                                TinyProductService $tinyProductService,
                                ProductStockService $productStockService)

    {
        $this->productListService = $productListService;
        $this->productImageService = $productImageService;
        $this->gold = $gold;
        $this->gems = $gems;
        $this->jewel = $jewel;
        $this->product = $product;
        $this->productImages = $productImages;
        $this->orderItems = $orderItems;
        $this->productionOrdersItems = $productionOrdersItems;
        $this->stockIn = $stockIn;
        $this->stock = $stock;
        $this->tinyProductService = $tinyProductService;
        $this->productStockService = $productStockService;
    }

    public function index(Request $request,$collection = null,$category = null)
    {

        $search = $request->input('search');
        $golds  = $this->gold->orderBy('name')->get();
        $gems   = $this->gems->orderBy('name')->get();
        $products = $this->productListService->filter($search,$collection,$category);
        $categories = Category::orderBy('name','asc')->get();
        $collections = Collection::orderBy('name','asc')->get();


        return Inertia::render('Jewels/Products/Index',[
            'products'=>$products,
            'search'=>$search,
            'golds'=>$golds,
            'gems'=>$gems,
            'categories'=>$categories,
            'collections'=>$collections,
        ]);

    }

    public function jewel_products($jewel)
    {
        $jewel = $this->jewel->find($jewel);
        $golds  = $this->gold->orderBy('name')->get();
        $gems  = $this->gems->orderBy('name')->get();

        $products = $this->product->where('jewel_id',$jewel->id)
            ->with('images','jewel')
            ->with(['golds.gold'])
            ->with(['gems.gem'])
            ->get();

        return Inertia::render('Jewels/Products/JewelProducts',[
            'jewel'         =>$jewel,
            'products'      =>$products,
            'golds'         =>$golds,
            'gems'          =>$gems,
        ]);

    }

    public function show($product)
    {
        $product    = $this->product->find($product);
        $golds  = $this->gold->orderBy('name')->get();
        $gems   = $this->gems->orderBy('name')->get();
        $jewel      = $product->jewel;
        $product    = $this->product->where('id',$product->id)
                                    ->with('images','jewel','collection','category','stock')
                                    ->with(['golds.gold'])
                                    ->with(['gems.gem'])
                                    ->first();

        $orders = $this->orderItems->where('product_id',$product->id)
                                     ->with(['product' => function ($q) {
                                         $q->with('images');
                                     }])
                                      ->with(['order' => function ($q) {
                                          $q->with('seller')
                                              ->with('ponto')
                                              ->with('user')
                                              ->where('status',2);
                                      }])->get();

        $production_orders = $this->productionOrdersItems->where('product_id',$product->id)
                                                        ->with(['product' => function ($q) {
                                                            $q->with('images');
                                                        }])
                                                        ->with(['production_order' => function ($q) {
                                                            $q->with('manufacturer');
                                                        }])
                                                        ->with('jewel')
                                                        ->get();

        $init_price = $this->stockIn->where('product_id',$product->id)->first();
            if ($init_price == null){
                $init_price = $this->stock->where('product_id',$product->id)->first();
                if ($init_price == null){

                    $data['product_id'] = $product->id;
                    $data['unit_cost'] = 0;
                    $data['in_cost'] = 0;
                    $data['quantity'] = 0;
                    $data['offered_price'] = 0;

                    $this->productStockService->store($data,$product);
                }

            }

        $init_price = $this->stockIn->where('product_id',$product->id)->first();
        $current_price = $this->stock->where('product_id',$product->id)->first();

        if ($product->sku != null){
            $tiny_search = $this->tinyProductService->get_products_by_sku($product->sku);
            $tiny_products  = $tiny_search['retorno']['produtos'] ?? null;
        }else{
            $tiny_products = null;
        }



        return Inertia::render('Jewels/Products/Show',[
            'jewel'                     =>$jewel,
            'product'                   =>$product ,
            'orders'                    =>$orders ,
            'orders_count'              =>$orders->count(),
            'orders_price'              =>$orders->sum('price'),
            'production_orders'         =>$production_orders ,
            'production_orders_count'   =>$production_orders->count() ,
            'init_price'                =>$init_price,
            'current_price'             =>$current_price,
            'tiny_products'             =>collect($tiny_products),
            'golds'                     =>$golds,
            'gems'                      =>$gems,
        ]);


    }

    public function create($jewel)
    {
        $url        = URL::previous();
        $jewel      = $this->jewel->find($jewel);

        return Inertia::render('Jewels/Products/Create',[
            'jewel' =>$jewel,
            'url'   =>$url,
        ]);
    }

    public function store(Request $request)
    {

        $data               = $request->all();
        $data['slug']       = Str::slug($data['name'], "-");
        $data['line_up']    = Product::orderBy('line_up', 'desc')->first()->line_up + 3;
        $add                = $data['peso_fino'] + ($data['peso_fino'] / 100 * 25.00);
        $data['peso_18k']   = $add;

        $product = Product::create($data);
        $this->productStockService->store($data,$product);
        return redirect()->route('product.index',['collection'=>$product->collection_id,'category'=>null])->with('message', 'Operação realizada com sucesso');
    }



    public function edit(Product $product,Collection $collection, Category $category)
    {
        $url            = URL::previous();
        $product        = $this->product->where('id',$product->id)->with('images','jewel')->first();
        $categories     = $category->orderBy('name')->get();
        $collections    = $collection->orderBy('slug')->get();

        return Inertia::render('Jewels/Products/Edit',[
            'product'=>$product,
            'categories'=>$categories,
            'collections'=>$collections,
            'url'=>$url,
        ]);
    }


    public function update(Request $request, Product $product)
    {
        $data               = $request->all();

        if (isset($data['name'])){
            $data['slug']       = Str::slug($data['name'], "-");
        }

        if (isset($data['peso_fino'])){
            $add                = $data['peso_fino'] + ($data['peso_fino'] / 100 * 25.00);
            $data['peso_18k']   = $add;
        }

        $product->update($data);
       // return redirect()->route('product.index',['collection'=>$product->collection_id,'category'=>null])->with('message', 'Operação realizada com sucesso');
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('product.index',['collection'=>$product->collection_id,'category'=>null])->with('message', 'Operação realizada com sucesso');
    }


    public function images(Product $product)
    {

        $types = ImageType::where('sessao_id',4)->get();
        $images = $product->images();
        $images = $images->with('imageType')->get();

        return Inertia::render('Jewels/Products/Images',[
            'images'=>$images,
            'product'=>$product,
            'types'=>$types,
        ]);

    }

    public function imageStore(Request $request,Product $product)
    {
        $this->productImageService->imageStore($request,$product);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function imageDestroy( $image)
    {
        $this->productImageService->imageDestroy($image);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function price_change(Request $request,Product $product)
    {
        $data = $request->all();
        $product_stock = Stock::where('product_id',$data['product_id'])->first();
        $product_stock->offered_price = $data['offered_price'];
        $product_stock->save();

        $data['unit_cost'] = $data['offered_price'];
        $data['quantity'] = 1;
        $data['in_cost'] = ($data['unit_cost'] * $data['quantity']);
        StockIn::create($data);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function price_store(StockCreateRequest $stockCreateRequest)
    {
        $stockCreateRequest->persist();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function sku_change(Request $request)
    {
        $data = $request->all();
        $product            = Product::find($data['product_id']);
        $product->sku       = $data['sku'];
        $product->ncm       = $data['ncm'];
        $product->ean       = $data['ean'];
        $product->tiny_id   = $data['tiny_id'];
        $product->save();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function download($id)
    {

        $image = $this->productImages->find($id);
        $headers = [
            'Content-Type'        => 'application/jpeg',
            'Content-Disposition' => 'attachment; filename="'.$image->id.'.'.$image->extension.'"',
        ];

        return Response::make(Storage::disk('s3')->get($image->path), 200, $headers);

    }
}


