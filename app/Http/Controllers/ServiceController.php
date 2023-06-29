<?php

namespace App\Http\Controllers;


use App\Models\Category;
use App\Models\Centro;
use App\Models\Collection;
use App\Models\Jewel;
use App\Models\Manufacturer;
use App\Models\Order;
use App\Models\ServiceItems;
use App\Models\Service;
use App\Models\User;
use Barryvdh\Snappy\Facades\SnappyPdf as PDF;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{


    private Jewel $jewel;
    private Category $category;
    private Collection $collection;
    private Manufacturer $manufacturer;
    private User $user;
    private Order $order;
    private Centro $centro;
    private Service $service;
    private ServiceItems $serviceItems;


    public function __construct(Service $service,
                                ServiceItems $serviceItems,
                                Jewel $jewel,
                                Category $category,
                                Collection $collection,
                                Manufacturer $manufacturer,User $user,
                                Order $order,
                                Centro $centro)

    {

        $this->jewel = $jewel;
        $this->category = $category;
        $this->collection = $collection;
        $this->manufacturer = $manufacturer;
        $this->user = $user;
        $this->order = $order;
        $this->centro = $centro;
        $this->service = $service;
        $this->serviceItems = $serviceItems;
    }


    public function index()
    {
        $services = $this->service->with('manufacturer','user','center')
                                                        ->orderByDesc('id')->get();
        return Inertia::render('Service/Index',[
            'services'=>$services
        ]);
    }

//    public function user(Request $request)
//    {
//
//        $search = $request->input('search');
//
//        if (empty($search)) {
//            $users  =   $this->user->orderBy('name')->take(0)->get();
//        }else{
//            $users = $this->user->ofSearch($search)->get();
//        }
//
//        return Inertia::render('Service/User',[
//            'users'=>$users
//        ]);
//    }
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

}
