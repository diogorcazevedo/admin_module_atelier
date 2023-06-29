<?php

namespace App\Http\Controllers;


use App\Models\Category;
use App\Models\Centro;
use App\Models\ExternalServiceItems;
use App\Models\ExternalServices;
use App\Models\ImageType;
use App\Models\JewelExternal;
use App\Models\Manufacturer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceExternalItemsController extends Controller
{



    private Manufacturer $manufacturer;
    private User $user;
    private Centro $centro;
    private Category $category;
    private ImageType $imageType;
    private ExternalServices $externalServices;
    private ExternalServiceItems $externalServiceItems;
    private JewelExternal $external;

    public function __construct(ExternalServices $externalServices,
                                ExternalServiceItems $externalServiceItems,
                                Manufacturer $manufacturer,
                                User $user,
                                JewelExternal $external,
                                Centro $centro,
                                Category $category,
                                ImageType $imageType)

    {

        $this->manufacturer = $manufacturer;
        $this->user = $user;
        $this->centro = $centro;
        $this->external = $external;
        $this->category = $category;
        $this->imageType = $imageType;
        $this->externalServices = $externalServices;
        $this->externalServiceItems = $externalServiceItems;
    }

    public function show(Request $request, $id ,$category = null)
    {
        $search = $request->input('search');

       if($category != null){
            $products = $this->external->where('category_id',$category)->with('category','images')->orderBy('category_id')->get();
        }else{
            if (empty($search)) {
                $products = $this->external->with('category','images')->take(0)->get();
            }else{
                $products = $this->external->ofSearch($search)->with('category','images')->get();
            }
        }



        $service = $this->externalServices->with('items','user')->orderByDesc('id')->find($id);
        $user = $this->user->find($service->user_id);
        $service_items = $this->externalServiceItems->where('service_id',$id)
                                                        ->with('user')
                                                        ->with(['jewel_external' => function($q) {
                                                            $q->with(['images' => function($q) {
                                                                    $q->with('image_type');
                                                                }])->get();
                                                        }])->get();

        $categories     =   $this->category->orderBy('name')->get();
        $types          =   $this->imageType->where('sessao_id',9)->get();

        return Inertia::render('Service/External/Items/Show',[
            'service_items'     =>$service_items,
            'service'           =>$service,
            'user'              =>$user,
            'products'          =>$products,
            'search'            =>$search,
            'categories'        =>$categories,
            'types'             =>$types,
        ]);
    }
    public function edit($id)
    {

        $service_item   =   $this->externalServiceItems->find($id);
        $user           =   $this->user->find($service_item->user_id);
        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
        $centers        =   $this->centro->orderBy('name')->get();

        return Inertia::render('Service/External/Items/Edit',[
            'manufacturers'             =>$manufacturers,
            'user'                      =>$user,
            'centers'                   =>$centers,
            'service_item'              =>$service_item
        ]);
    }
    public function add($service_id,$product_id)
    {
        $jewel_external         = $this->external->find($product_id);
        $service                = $this->externalServices->find($service_id);

        $this->externalServiceItems->create([
            'service_id'            => $service->id,
            'user_id'               => $service->user_id,
            'jewel_external_id'     => $jewel_external->id,
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

        $service_item = $this->externalServiceItems->find($data['service_item_id']);
        $service_item->update([
            'manufacturer_id'       => $data['manufacturer_id'],
            'description'           => "",
            'total'                 => $data['total'],
            'status'                => $data['status'],
            'date'                  => $data['date'],
            'month'                 => $data['month'],
            'year'                  => $data['year'],
            'scheduled'             => $data['scheduled'],
            'date_shipping'         => $data['date_shipping'],
        ]);

        return redirect()->back()->with('message','Editado com sucesso');
    }
    public function destroy($id)
    {
        $item = $this->externalServiceItems->find($id);
        $this->externalServiceItems->destroy($item->id);
        return redirect()->back()->with('message','removido com sucesso');

    }

}

