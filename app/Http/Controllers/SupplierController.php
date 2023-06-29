<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\State;
use App\Models\Supplier;
use App\Repositories\SupplierRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{

    private SupplierRepository $supplierRepository;
    private Supplier $supplier;

    public function __construct(SupplierRepository $supplierRepository, Supplier $supplier)

    {
        $this->supplierRepository = $supplierRepository;
        $this->supplier = $supplier;
    }



    public function index()
    {
        $suppliers = $this->supplier->all();

        return Inertia::render('Supplier/Index',[
            'suppliers'=>$suppliers,
        ]);

    }



    public function show($id)
    {
        $supplier = $this->supplier->find($id);
        return Inertia::render('Supplier/Show',[
            'supplier'=>$supplier,
        ]);


    }


    public function create()
    {

        $states = State::all();
        return Inertia::render('Supplier/Create',[
            'states'=>$states,
        ]);

    }


    public function store(Request $request)
    {
        $data = $request->all();

        $request->validate([
            'name'                             => 'required|max:255',
            'main'                             => 'required',
        ]);


        $this->supplierRepository->store($data);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }



    public function edit($id)
    {

        $supplier = $this->supplier->find($id);
        $states = State::all();
        $city =City::find($supplier->city_id);

        return Inertia::render('Supplier/Edit',[
            'supplier'=>$supplier,
            'states'=>$states,
            'city'=>$city,
        ]);

    }


    public function update(Request $request, $id)
    {
        $data = $request->all();
        $supplier = $this->supplier->find($id);
        $supplier->update($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function destroy($id)
    {

    }

}







