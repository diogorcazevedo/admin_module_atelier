<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\State;
use App\Models\Manufacturer;
use App\Repositories\ManufacturerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManufacturerController extends Controller
{


    private ManufacturerRepository $manufacturerRepository;
    private Manufacturer $manufacturer;

    public function __construct(ManufacturerRepository $manufacturerRepository, Manufacturer $manufacturer)

    {

        $this->manufacturerRepository = $manufacturerRepository;
        $this->manufacturer = $manufacturer;
    }



    public function index()
    {
        $manufacturers = $this->manufacturer->all();

        return Inertia::render('Manufacturer/Index',[
            'manufacturers'=>$manufacturers
        ]);
    }


    public function show($id)
    {
        $manufacturer = $this->manufacturer->find($id);

        return Inertia::render('Manufacturer/Show',[
            'manufacturer'=>$manufacturer
        ]);
    }


    public function create()
    {
        $states = State::all();

        return Inertia::render('Manufacturer/Create',[
            'states'=>$states,
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->all();

        $request->validate([
            'name'                          => 'required|max:255',
            'city'                          => 'required',
            'state'                         => 'required',
        ]);

        $this->manufacturerRepository->store($data);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }



    public function edit($id)
    {
        $manufacturer = $this->manufacturer->find($id);
        $states = State::all();
        $city =City::find($manufacturer->city_id);

        return Inertia::render('Manufacturer/Edit',[
            'manufacturer'=>$manufacturer,
            'states'=>$states,
            'city'=>$city,
        ]);


    }


    public function update(Request $request, $id)
    {
        $data = $request->all();
        $manufacturer = $this->manufacturer->find($id);
        $manufacturer->update($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function destroy($id)
    {

    }

}







