<?php

namespace App\Http\Services;


use App\Models\Stock;
use App\Models\StockIn;

class ProductStockService
{


    public function store($data,$product)
    {
        $data['product_id'] = $product->id;

        if (!isset($data['unit_cost'])){
            $data['unit_cost'] = 0;
            $data['in_cost'] = 0;
            $data['quantity'] = 0;
            $data['offered_price'] = 0;
        }else{
            $data['in_cost'] = ($data['unit_cost'] * $data['quantity']);
            $data['offered_price'] = str_replace(",", ".", $data['offered_price']);
        }


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
        } catch (\Exception $e) {
            \DB::rollback();
            throw $e;
        }
    }


}
