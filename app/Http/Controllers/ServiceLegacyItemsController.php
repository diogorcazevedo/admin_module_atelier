<?php

namespace App\Http\Controllers;


use App\Models\Category;
use App\Models\Centro;
use App\Models\Collection;
use App\Models\ImageType;
use App\Models\Manufacturer;
use App\Models\Product;
use App\Models\Service;
use App\Models\ServiceItems;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceLegacyItemsController extends Controller
{



    private Manufacturer $manufacturer;
    private User $user;
    private Centro $centro;
    private Product $product;
    private Service $service;
    private ServiceItems $serviceItems;
    private Category $category;
    private Collection $collection;
    private ImageType $imageType;

    public function __construct(Service $service,
                                ServiceItems $serviceItems,
                                Manufacturer $manufacturer,
                                User $user,
                                Product $product,
                                Centro $centro,
                                Category $category,
                                Collection $collection,
                                ImageType $imageType)

    {

        $this->manufacturer = $manufacturer;
        $this->user = $user;
        $this->centro = $centro;
        $this->product = $product;
        $this->service = $service;
        $this->serviceItems = $serviceItems;
        $this->category = $category;
        $this->collection = $collection;
        $this->imageType = $imageType;
    }

    public function show(Request $request, $id ,$collection = null,$category = null)
    {
        $search = $request->input('search');

        if($collection != null AND $collection !=0){
            $products = $this->product->where('collection_id',$collection)->with('category','collection','images')->orderBy('category_id')->get();
        }elseif($category != null){
            $products = $this->product->where('category_id',$category)->with('category','collection','images')->orderBy('collection_id')->get();
        }else{
            if (empty($search)) {
                $products = $this->product->with('category','collection','images')->take(0)->get();
            }else{
                $products = $this->product->ofSearch($search)->with('category','collection','images')->get();
            }
        }


        $service = $this->service->with('items','user')
                                ->orderByDesc('id')->find($id);
        $user = $this->user->find($service->user_id);

        $service_items = $this->serviceItems->where('service_id',$id)
                                            ->with('user')
                                            ->with(['product' => function($q) {
                                                $q->with(['images' => function($q) {
                                                        $q->with('imageType');
                                                    }])->get();
                                            }])->get();

        $categories     =   $this->category->orderBy('name')->get();
        $collections    =   $this->collection->orderBy('slug')->get();
        $types          =   $this->imageType->where('sessao_id',4)->get();

        return Inertia::render('Service/Legacy/Items/Show',[
            'service_items'     =>$service_items,
            'service'           =>$service,
            'user'              =>$user,
            'products'          =>$products,
            'search'            =>$search,
            'categories'        =>$categories,
            'collections'       =>$collections,
            'types'             =>$types,
        ]);
    }
    public function edit($id)
    {
        $service_item   =   $this->serviceItems->find($id);
        $user           =   $this->user->find($service_item->user_id);
        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
        $centers        =   $this->centro->orderBy('name')->get();

        return Inertia::render('Service/Legacy/Items/Edit',[
            'manufacturers'             =>$manufacturers,
            'user'                      =>$user,
            'centers'                   =>$centers,
            'service_item'              =>$service_item
        ]);
    }
    public function add($service_id,$product_id)
    {
        $product                = $this->product->find($product_id);
        $service                = $this->service->find($service_id);

        $this->serviceItems->create([
            'service_id'            => $service->id,
            'user_id'               => $service->user_id,
            'product_id'            => $product->id,
            'manufacturer_id'       => $service->manufacturer_id,
            'description'           => "",
            'total'                 => $service->total,
            'status'                 =>$service->status,
            'scheduled'             => $service->scheduled,
            'date'                  => $service->date,
            'month'                 => $service->month,
            'year'                  => $service->year,
            'date_shipping'         => $service->date_shipping,
        ]);

        return redirect()->back()->with('message','add com sucesso');
    }
    public function update(Request $request)
    {
        $data = $request->all();

        $d                      = explode('-',$data['date']);
        $data['month']          = $d[1];
        $data['year']           = $d[0];
        $data['date']           = data_reverse_traco(data_reverse_traco_para_barra($data['date']));
        $data['date_shipping']  = data_reverse_traco(data_reverse_traco_para_barra($data['date_shipping']));

        $service_item = $this->serviceItems->find($data['service_item_id']);
        $service_item->update([
            'manufacturer_id'       => $data['manufacturer_id'],
            'description'           => "",
            'total'                 => $data['total'],
            'status'                => $data['status'],
            'date'                  => $data['date'],
            'month'                 => $data['month'],
            'year'                  => $data['year'],
            'date_shipping'         => $data['date_shipping'],
        ]);


        return redirect()->back()->with('message','Editado com sucesso');
    }
    public function destroy($id)
    {
        $item = $this->serviceItems->find($id);
        $this->serviceItems->destroy($item->id);
        return redirect()->back()->with('message','removido com sucesso');

    }

}

