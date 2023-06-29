<?php

namespace App\Http\Controllers;


use App\Models\Centro;
use App\Models\Manufacturer;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\Product;
use App\Models\Service;
use App\Models\ServiceItems;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceSalesItemsController extends Controller
{

    private Manufacturer $manufacturer;
    private User $user;
    private Order $order;
    private Centro $centro;
    private Product $product;
    private OrderItems $orderItems;
    private Service $service;
    private ServiceItems $serviceItems;

    public function __construct(Service $service,
                                ServiceItems $serviceItems,
                                Manufacturer $manufacturer,
                                User $user,
                                Order $order,
                                OrderItems $orderItems,
                                Product $product,
                                Centro $centro)

    {

        $this->manufacturer = $manufacturer;
        $this->user = $user;
        $this->order = $order;
        $this->centro = $centro;
        $this->product = $product;
        $this->orderItems = $orderItems;
        $this->service = $service;
        $this->serviceItems = $serviceItems;
    }

    public function show($id)
    {

        $service = $this->service->with('items','user')
                                ->orderByDesc('id')->find($id);
        $user = $this->user->find($service->user_id);
        $order = $this->order->find($service->order_id);
        $order_items = $this->orderItems->where('order_id',$order->id)
                                        ->with(['product' => function($q) {
                                            $q->with('images');
                                        }])->get();;

        $service_items = $this->serviceItems->where('service_id',$id)
                                            ->with('user')
                                            ->with(['product' => function($q) {
                                                $q->with('images');
                                            }])->get();



        return Inertia::render('Service/Sales/Items/Show',[
            'service_items'   =>$service_items,
            'service'         =>$service,
            'user'            =>$user,
            'order_items'     =>$order_items,
        ]);
    }

//    public function create($user)
//    {
//        $user           =   $this->user->find($user);
//        $orders         =   $this->order->with(['items' => function($q) {
//                                            $q->with('product');
//                                        }])
//                                        ->where('user_id',$user->id)
//                                        ->where('status',2)
//                                        ->get();
//        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
//        $centers        =    $this->centro->orderBy('name')->get();
//
//        return Inertia::render('Service/Items/Create',[
//            'manufacturers' =>$manufacturers,
//            'user'          =>$user,
//            'orders'        =>$orders,
//            'centers'       =>$centers
//        ]);
//    }

    public function edit($id)
    {
        $service_item   =   $this->serviceItems->find($id);
        $user           =   $this->user->find($service_item->user_id);
        $orders         =   $this->order->with(['items' => function($q) {
                                                                $q->with('product');
                                                            }])
                                                    ->where('user_id',$user->id)
                                                    ->where('status',2)
                                                    ->get();
        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
        $centers        =   $this->centro->orderBy('name')->get();

        return Inertia::render('Service/Sales/Items/Edit',[
            'manufacturers'             =>$manufacturers,
            'user'                      =>$user,
            'orders'                    =>$orders,
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
            'order_id'              => $service->order_id,
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

