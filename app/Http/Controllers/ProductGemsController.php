<?php
namespace App\Http\Controllers;



use App\Models\ProductGem;
use Illuminate\Http\Request;

class ProductGemsController extends Controller
{

    private ProductGem $productGem;

    public function __construct(ProductGem $productGem)
    {


        $this->productGem = $productGem;
    }


    public function add(Request $request)
    {
        $data = $request->all();
        $this->productGem->create($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove($component_gold)
    {
        $this->productGem->destroy($component_gold);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


}
