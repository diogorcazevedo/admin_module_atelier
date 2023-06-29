<?php
namespace App\Http\Controllers;


use App\Models\ComponentGem;
use Illuminate\Http\Request;

class JewelsGemsController extends Controller
{


    private ComponentGem $componentGem;

    public function __construct(ComponentGem $componentGem)
    {
        $this->componentGem = $componentGem;
    }


    public function add(Request $request)
    {
        $data = $request->all();
        $this->componentGem->create($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove($component_gold)
    {
        $this->componentGem->destroy($component_gold);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


}
