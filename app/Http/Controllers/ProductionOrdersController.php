<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Collection;
use App\Models\Jewel;
use App\Models\Manufacturer;
use App\Models\ProductionOrders;
use App\Models\ProductionOrdersItems;
use Barryvdh\Snappy\Facades\SnappyPdf as PDF;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionOrdersController extends Controller
{

    private ProductionOrders $productionOrders;
    private ProductionOrdersItems $productionOrdersItems;
    private Jewel $jewel;
    private Category $category;
    private Collection $collection;
    private Manufacturer $manufacturer;

    public function __construct(ProductionOrders $productionOrders,
                                ProductionOrdersItems $productionOrdersItems,
                                Jewel $jewel,
                                Category $category,
                                Collection $collection,
                                Manufacturer $manufacturer)

    {
        $this->productionOrders = $productionOrders;
        $this->productionOrdersItems = $productionOrdersItems;
        $this->jewel = $jewel;
        $this->category = $category;
        $this->collection = $collection;
        $this->manufacturer = $manufacturer;
    }


    public function index()
    {
        $production_orders = $this->productionOrders->where('finished',0)
                                                    ->with('manufacturer')
                                                    ->orderByDesc('id')->get();

        return Inertia::render('ProductionOrders/Index',[
            'production_orders'=>$production_orders
        ]);
    }

    public function create()
    {
        $manufacturers  =   $this->manufacturer->orderBy('name')->get();
        return Inertia::render('ProductionOrders/Create',[
            'manufacturers'=>$manufacturers
        ]);
    }

    public function show($id)
    {
        $production_order = $this->productionOrders->with('items')->orderByDesc('id')->find($id);
        $production_order_items = $this->productionOrdersItems
                                        ->where('production_order_id',$id)
                                        ->with('jewel')
                                        ->with(['product' => function($q) {
                                                $q->with('images');
                                            }])->get();

        return Inertia::render('ProductionOrders/Show',[
            'production_order_items'=>$production_order_items,
            'production_order'=>$production_order,
        ]);
    }

    public function edit(Request $request, $id,$collection = null,$category = null, )
    {
        $production_order = $this->productionOrders->with('items')->orderByDesc('id')->find($id);
        $production_order_items = $this->productionOrdersItems
            ->where('production_order_id',$id)
            ->with('jewel')
            ->with(['product' => function($q) {
                $q->with('images');
            }])->get();

        $search = $request->input('search');

        if($collection != null AND $collection !=0){
          $jewels = $this->jewel->where('collection_id',$collection)
                                ->with('category','collection','images')
                                ->with(['products' => function($q) {
                                    $q->with('images');
                                }])
                                ->orderBy('category_id')
                                ->get();
        }elseif($category != null){
            $jewels = $this->jewel->where('category_id',$category)
                                    ->with('category','collection','images')
                                    ->with(['products' => function($q) {
                                        $q->with('images');
                                    }])
                                    ->orderBy('collection_id')->get();
        }else{
            if (!empty($search)) {

                $jewels = $this->jewel->ofSearch($search)
                    ->with('category','collection','images')
                    ->with(['products' => function($q) {
                        $q->with('images');
                    }])
                    ->get();

            }else{
                $jewels = $this->jewel->with('category','collection','images')
                    ->with(['products' => function($q) {
                        $q->with('images');
                    }])
                    ->take(0)->get();

            }
        }

        $categories  =   $this->category->orderBy('name')->get();
        $collections =   $this->collection->orderBy('slug')->get();



        return Inertia::render('ProductionOrders/Edit',[
            'jewels'            =>$jewels,
            'search'            =>$search,
            'categories'        =>$categories,
            'collections'       =>$collections,
            'production_order'  =>$production_order,
            'production_order_items'=>$production_order_items,
        ]);

    }

    public function store(Request $request)
    {
        $data = $request->all();
        $dt                     = date('Y-m-d', strtotime('+'.$data['scheduled'].'days', strtotime(date('Y-m-d'))));
        $d                      = explode('-',$dt);
        $data['previsao']       = $dt;
        $data['previsao_mes']   = $d[1];
        $data['previsao_ano']   = $d[0];

        $production_order =$this->productionOrders->create([
            'manufacturer_id'       => $data['manufacturer_id'],
            'total'                 => $data['total'],
            'total_imposto'         => $data['total'],
            'gold_quantity'         => $data['gold_quantity'],
            'scheduled'             => $data['scheduled'],
            'operador'              =>auth()->user()->id,
            'data'                  =>date('Y-m-d'),
            'mes'                   =>date('m'),
            'ano'                   =>date('Y'),
            'previsao'              => $data['previsao'],
            'previsao_mes'          => $data['previsao_mes'],
            'previsao_ano'          => $data['previsao_ano'],
        ]);

        return redirect()->route('production.orders.edit',['id'=>$production_order->id])->with('message','add com sucesso');
    }

    public function update(Request $request)
    {
        $data = $request->all();
        for ($i = 0; $i < $data['qtd']; $i++) {
            $this->productionOrdersItems->create([
                'jewel_id'              => $data['jewel_id'],
                'production_order_id'   => $data['production_order_id'],
                'product_id'            => $data['product_id'],
                'price'                 => $data['price'],
                'qtd'                   => 1,
                'obs'                   => $data['obs'],
                'aro'                   => $data['aro'],
            ]);
        }

        $production_order = $this->productionOrders->find($data['production_order_id']);

        $gold_quantity = 0;
        foreach ($production_order->items as $item){
            $gold_quantity = $gold_quantity + $item->product->peso_fino;
        }
        $production_order->gold_quantity = $gold_quantity;
        $production_order->save();

        return redirect()->back()->with('message','add com sucesso');
    }

    public function destroy($product_id,$production_order_id)
    {

        $item = $this->productionOrdersItems->where('product_id',$product_id)
                                            ->where('production_order_id',$production_order_id)
                                            ->first();
        ProductionOrdersItems::destroy($item->id);
        return redirect()->back()->with('message','removido com sucesso');

    }
    public function summary($id)
    {
        $product_order = ProductionOrders::find($id);
        $peso = 0;
        $production_order_items = $this->productionOrdersItems->where('production_order_id',$id)->get();
        $groupeds = $production_order_items->groupBy('product_id')->all();


        foreach ($product_order->items as $item){
            $peso = $peso + isset($item->configuracao->peso_fino)?$item->configuracao->peso_fino:0;
        }

        $pdf = PDF::loadView('print.product_orders.summary', compact('product_order','peso','groupeds'));
        return $pdf->download($product_order->id.'.pdf');
    }

    public function images($id)
    {
        $product_order = ProductionOrders::find($id);
        $production_order_items = $this->productionOrdersItems->where('production_order_id',$id)->get();
        $groupeds = $production_order_items->groupBy('product_id')->all();

        $pdf = PDF::loadView('print.product_orders.images', compact('product_order','groupeds'));
        return $pdf->download($product_order->id.'_images_.pdf');
    }

    public function full($id)
    {
        $product_order = ProductionOrders::find($id);
        $peso = 0;
        $production_order_items = $this->productionOrdersItems->where('production_order_id',$id)->get();
        $groupeds = $production_order_items->groupBy('product_id')->all();


        foreach ($product_order->items as $item){
            $peso = $peso + isset($item->configuracao->peso_fino)?$item->configuracao->peso_fino:0;
        }

        $pdf = PDF::loadView('print.product_orders.full', compact('product_order','peso','groupeds'));
        return $pdf->download($product_order->id.'.pdf');
    }


    public function finished($id)
    {
        $production_order = $this->productionOrders->find($id);

        $production_order_items = $this->productionOrdersItems->where('production_order_id',$production_order->id)->get();
        foreach ($production_order_items as $item){
            $item->entregue = 1;
            $item->save();
        }

        $production_order->status = 4;
        $production_order->finished = 1;
        $production_order->save();

        return redirect()->back()->with('message','finalizado com sucesso');
    }



//    public function init($fabricante_id)
//    {
//        $fabricante = Fabricante::find($fabricante_id);
//        $pedido = Pedido::create([
//            'fabricante_id' =>$fabricante->id,
//            'operador'      =>auth()->user()->id,
//            'total'         => 1,
//            'total_imposto' => 1,
//        ]);
//
//        return redirect()->route('admin.atelier.pedidos.create',['pedido'=>$pedido->id]);
//    }






//
//    public function fechamento(Pedido $pedido)
//    {
//        $peso = 0;
//        foreach ($pedido->items as $item){
//            $peso = $peso + isset($item->configuracao->peso_fino)?$item->configuracao->peso_fino:0;
//        }
//        return view('admin.atelier.pedidos.fechamento',compact('pedido','peso'));
//    }





//    public function relatorio(Pedido $pedido)
//    {
//        $peso = 0;
//        foreach ($pedido->items as $item){
//            $peso = $peso + isset($item->configuracao->peso_fino)?$item->configuracao->peso_fino:0;
//        }
//
//        return view('admin.atelier.pedidos.relatorio',compact('pedido','peso'));
//    }

}
