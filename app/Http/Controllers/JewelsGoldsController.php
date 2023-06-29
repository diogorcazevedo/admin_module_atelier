<?php
namespace App\Http\Controllers;




use App\Models\ComponentGold;
use Illuminate\Http\Request;

class JewelsGoldsController extends Controller
{

    private ComponentGold $componentGold;

    public function __construct(ComponentGold $componentGold)
    {

        $this->componentGold = $componentGold;
    }


    public function add(Request $request)
    {
        $data = $request->all();
        $this->componentGold->create($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove($component_gold)
    {
        $this->componentGold->destroy($component_gold);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


}
