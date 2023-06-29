<?php
namespace App\Http\Controllers;



use App\Models\ProductGold;
use Illuminate\Http\Request;

class ProductGoldsController extends Controller
{


    private ProductGold $productGold;

    public function __construct(ProductGold $productGold)
    {


        $this->productGold = $productGold;
    }


    public function add(Request $request)
    {
        $data = $request->all();
        $this->productGold->create($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove($component_gold)
    {
        $this->productGold->destroy($component_gold);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


}
