<?php
namespace App\Http\Controllers;



use App\Models\Jewel;
use App\Models\Manufacturer;
use App\Models\Product;
use App\Models\ProductManufacturer;
use Illuminate\Http\Request;


class ProductManufacturersController extends Controller
{


    public function create($product)
    {
        $manufacturers = Manufacturer::orderBy('name')->get();
        $product = Product::find($product);
        $jewel = Jewel::find($product->jewel_id);
        return view('admin.atelier.criacao.configuracoes.fabricantes.create',compact('manufacturers','component','jewel'));
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $configuracao_fabricante = J::where('manufacturer_id',$data['manufacturer_id'])->where('component_id',$data['component_id'])->get();

        if (count($configuracao_fabricante) < 1){
            ProductManufacturer::create($data);
        }

        return redirect()->back();


    }

    public function update(Request $request)
    {

        $data = $request->all();
        $id = $data['id'];
        $gem =ProductManufacturer::find($id);
        $gem->update($data);
        return redirect()->back();
    }



    public function destroy($id)
    {
        //
    }


}
