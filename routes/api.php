<?php

use App\Http\Controllers\Api\TinyProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('tiny/product/store',                           [TinyProductController::class, 'store'])->name('api.tiny.product.store');
Route::get('tiny/product/get_stock_products_by_id/{id}',   [TinyProductController::class, 'get_stock_products_by_id'])->name('api.tiny.product.get_stock_products_by_id');
