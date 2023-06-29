<?php

namespace App\Http\Controllers;



use App\Models\Centro;
use App\Models\Manufacturer;
use App\Models\Order;
use App\Models\Service;
use App\Models\ServiceItems;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceSalesController extends Controller
{


    private Manufacturer $manufacturer;
    private User $user;
    private Order $order;
    private Centro $centro;
    private Service $service;
    private ServiceItems $serviceItems;


    public function __construct(Service         $service,
                                ServiceItems    $serviceItems,
                                Manufacturer    $manufacturer,
                                User            $user,
                                Order           $order,
                                Centro          $centro)

    {

        $this->manufacturer = $manufacturer;
        $this->user = $user;
        $this->order = $order;
        $this->centro = $centro;
        $this->service = $service;
        $this->serviceItems = $serviceItems;
    }


    public function index()
    {

        $services = $this->service->where('order_id', '!=', NULL)
                                    ->where('finished',0)
                                    ->with('manufacturer', 'user','center')
                                    ->orderByDesc('id')->get();

        return Inertia::render('Service/Sales/Index', [
            'services' => $services
        ]);
    }

    public function user(Request $request)
    {

        $search = $request->input('search');

        if (empty($search)) {
            $users  =   $this->user->orderBy('name')->take(0)->get();
        }else{
            $users = $this->user->ofSearch($search)->get();
        }

        return Inertia::render('Service/Sales/User',[
            'users'=>$users
        ]);
    }

    public function create($user)
    {
        $user = $this->user->find($user);
        $orders = $this->order->with(['items' => function ($q) {
            $q->with('product');
        }])
            ->where('user_id', $user->id)
            ->where('status', 2)
            ->get();
        $manufacturers = $this->manufacturer->orderBy('name')->get();
        $centers = $this->centro->orderBy('name')->get();
        $sales = $this->user->where('active', 1)->where('admin', 1)->get();

        return Inertia::render('Service/Sales/Create', [
            'manufacturers' => $manufacturers,
            'user' => $user,
            'orders' => $orders,
            'centers' => $centers,
            'sales' => $sales
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $date_shipping = date('Y-m-d', strtotime('+' . $data['scheduled'] . 'days', strtotime($data['date'])));


        $d = explode('-', $data['date']);
        $data['month'] = $d[1];
        $data['year'] = $d[0];
        $data['date'] = data_reverse_traco(data_reverse_traco_para_barra($data['date']));


        $this->service->create([
            'order_id' => $data['order_id'],
            'user_id' => $data['user_id'],
            'sale_id' => $data['sale_id'],
            'center_id' => $data['center_id'],
            'manufacturer_id' => $data['manufacturer_id'],
            'total' => $data['total'],
            'status' => 0,
            'pay' => 0,
            'scheduled' => $data['scheduled'],
            'date' => $data['date'],
            'month' => $data['month'],
            'year' => $data['year'],
            'date_shipping' => $date_shipping,
            'os_number' => $data['os_number'],
            'operador' => auth()->user()->id,
        ]);

        //return redirect()->route('service.edit',['id'=>service->id])->with('message','add com sucesso');
        return redirect()->route('service.sales.index')->with('message', 'add com sucesso');
    }

    public function edit($service)
    {
        $service = $this->service->find($service);
        $user = $this->user->find($service->user_id);
        $orders = $this->order->with(['items' => function ($q) {
            $q->with('product');
        }])
            ->where('user_id', $user->id)
            ->where('status', 2)
            ->get();
        $manufacturers = $this->manufacturer->orderBy('name')->get();
        $centers = $this->centro->orderBy('name')->get();

        return Inertia::render('Service/Sales/Edit', [
            'manufacturers' => $manufacturers,
            'user' => $user,
            'orders' => $orders,
            'centers' => $centers,
            'service' => $service
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $service = $this->service->find($data['id']);

        $d = explode('-', $data['date']);
        $data['month'] = $d[1];
        $data['year'] = $d[0];
        $data['date'] = data_reverse_traco(data_reverse_traco_para_barra($data['date']));
        $data['date_shipping'] = data_reverse_traco(data_reverse_traco_para_barra($data['date_shipping']));


        $service->update($data);

        return redirect()->back()->with('message', 'add com sucesso');
    }


    public function finished($id)
    {
        $service = $this->service->find($id);

        $serviceItems = $this->serviceItems->where('service_id',$service->id)->get();
        foreach ($serviceItems as $item){
            $item->entregue = 1;
            $item->status = 4;
            $item->save();
        }

        $service->status = 4;
        $service->finished = 1;
        $service->save();

        return redirect()->back()->with('message','finalizado com sucesso');
    }
}
