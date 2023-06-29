<?php

namespace App\Http\Controllers;

use App\Models\Centro;
use App\Models\ExternalServiceItems;
use App\Models\ExternalServices;
use App\Models\Manufacturer;
use App\Models\User;
use Barryvdh\Snappy\Facades\SnappyPdf as PDF;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceExternalController extends Controller
{

    private Manufacturer $manufacturer;
    private User $user;
    private Centro $centro;
    private ExternalServices $externalServices;
    private ExternalServiceItems $externalServiceItems;


    public function __construct(ExternalServices $externalServices,
                                ExternalServiceItems $externalServiceItems,
                                Manufacturer $manufacturer,
                                User $user,
                                Centro $centro)

    {

        $this->manufacturer = $manufacturer;
        $this->user = $user;
        $this->centro = $centro;
        $this->externalServices = $externalServices;
        $this->externalServiceItems = $externalServiceItems;
    }


    public function index()
    {
        $services = $this->externalServices->with('manufacturer','user','center')
                                            ->where('finished',0)
                                            ->orderByDesc('id')
                                            ->get();

        return Inertia::render('Service/External/Index',[
            'services'=>$services
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

        return Inertia::render('Service/External/User',[
            'users'=>$users
        ]);
    }

    public function create($user)
    {
        $user           =   $this->user->find($user);
        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
        $centers        =   $this->centro->orderBy('name')->get();
        $sales          =   $this->user->where('active',1)->where('admin',1)->get();

        return Inertia::render('Service/External/Create',[
            'manufacturers' =>$manufacturers,
            'user'          =>$user,
            'centers'       =>$centers,
            'sales'         =>$sales
        ]);
    }
    public function store(Request $request)
    {
        $data                   = $request->all();
        $date_shipping          = date('Y-m-d', strtotime('+'.$data['scheduled'].'days', strtotime($data['date'])));

        $d                      = explode('-',$data['date']);

        $data['month']          = $d[1];
        $data['year']           = $d[2];

        $dt                     = data_reverse_traco(data_reverse_traco_para_barra($data['date']));
        $data['date']           = $dt;


        $this->externalServices->create([
            'user_id'               => $data['user_id'],
            'sale_id'               => $data['sale_id'],
            'center_id'             => $data['center_id'],
            'manufacturer_id'       => $data['manufacturer_id'],
            'total'                 => $data['total'],
            'status'                => 0,
            'pay'                   => 0,
            'scheduled'             => $data['scheduled'],
            'date'                  => $data['date'],
            'month'                 => $data['month'],
            'year'                  => $data['year'],
            'date_shipping'         => $date_shipping,
            'os_number'             => $data['os_number'],
            'operador'              =>auth()->user()->id,
        ]);

        //return redirect()->route('service.edit',['id'=>service->id])->with('message','add com sucesso');
        return redirect()->route('service.external.index')->with('message','add com sucesso');
    }
    public function edit($service)
    {
        $service            =   $this->externalServices->find($service);
        $user               =   $this->user->find($service->user_id);
        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
        $centers        =   $this->centro->orderBy('name')->get();

        return Inertia::render('Service/External/Edit',[
            'manufacturers'         =>$manufacturers,
            'user'                  =>$user,
            'centers'               =>$centers,
            'service'               =>$service
        ]);
    }
    public function update(Request $request,$id)
    {
        $data = $request->all();
        $service = $this->externalServices->find($data['id']);

        $d                      = explode('-',$data['date']);
        $data['month']          = $d[1];
        $data['year']           = $d[0];
        $data['date']           = data_reverse_traco(data_reverse_traco_para_barra($data['date']));
        $data['date_shipping']  = data_reverse_traco(data_reverse_traco_para_barra($data['date_shipping']));


        $service->update($data);

        return redirect()->back()->with('message','add com sucesso');
    }
    public function destroy($component_id,$service_id)
    {

        $item = $this->serviceItems->where('component_id',$component_id)
            ->where('service_id',$service_id)
            ->first();
        $this->serviceItems->destroy($item->id);
        return redirect()->back()->with('message','removido com sucesso');

    }
    public function summary($id)
    {
        $peso = 0;
        $service = $this->service->find($id);
        $service_items = $this->serviceItems->where('service_id',$id)->get();
        $groupeds = $service_items->groupBy('component_id')->all();

        foreach ($service->items as $item){
            $peso = $peso + isset($item->configuracao->peso_fino)?$item->configuracao->peso_fino:0;
        }

        $pdf = PDF::loadView('print.service.summary', compact('service','peso','groupeds'));
        return $pdf->download($service->id.'.pdf');
    }
    public function images($id)
    {
        $service = $this->service->find($id);
        $service_items = $this->serviceItems->where('service_id',$id)->get();
        $groupeds = $service_items->groupBy('component_id')->all();

        $pdf = PDF::loadView('print.service.images', compact('service','groupeds'));
        return $pdf->download($service->id.'_images_.pdf');
    }
    public function full($id)
    {
        $peso = 0;
        $service = $this->service->find($id);
        $service_items = $this->serviceItems->where('service_id',$id)->get();
        $groupeds = $service_items->groupBy('component_id')->all();


        foreach ($service->items as $item){
            $peso = $peso + isset($item->configuracao->peso_fino)?$item->configuracao->peso_fino:0;
        }

        $pdf = PDF::loadView('print.service.full', compact('service','peso','groupeds'));
        return $pdf->download($service->id.'.pdf');
    }

    public function finished($id)
    {
        $external_service = $this->externalServices->find($id);

        $external_service_items = $this->externalServiceItems->where('service_id',$external_service->id)->get();
        foreach ($external_service_items as $item){
            $item->entregue = 1;
            $item->status = 4;
            $item->save();
        }

        $external_service->status = 4;
        $external_service->finished = 1;
        $external_service->save();

        return redirect()->back()->with('message','finalizado com sucesso');
    }
}
