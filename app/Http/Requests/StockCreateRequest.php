<?php


namespace App\Http\Requests;

use App\Models\Stock;
use App\Models\StockIn;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;


class StockCreateRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */



    public function rules()
    {

        return [
        'product_id'            =>'required',
        'quantity'              =>'required',
        'unit_cost'             =>'required',
        'offered_price'         =>'required',


        ];
    }


    public function persist()
    {
        $data = $this->all();
        $data['in_cost'] = ($data['unit_cost'] * $data['quantity']);

        \DB::beginTransaction();
        try {
            $stock_in = StockIn::create($data);

            if (!isset($stock_in->product->stock)){

                $stock = new Stock;
                $stock->product_id = $stock_in->product->id;
                $stock->quantity = $stock_in->quantity;
                $stock->offered_price = $stock_in->offered_price;
                $stock->save();
            }else{
                $data['quantity'] =  $stock_in->quantity + $stock_in->product->stock->quantity;
                Stock::updateOrCreate(['product_id' => $data['product_id']], $data);
            }

            \DB::commit();
            Session::flash('admin', 'Salvo com sucesso');
        } catch (\Exception $e) {
            \DB::rollback();
            throw $e;
        }

    }

}
