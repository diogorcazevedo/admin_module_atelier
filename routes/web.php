<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\JewelExternalController;
use App\Http\Controllers\JewelExternalImageController;
use App\Http\Controllers\JewelsController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductGemsController;
use App\Http\Controllers\ProductGoldsController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductionOrdersController;
use App\Http\Controllers\ProductManufacturersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceExternalController;
use App\Http\Controllers\ServiceExternalItemsController;
use App\Http\Controllers\ServiceLegacyController;
use App\Http\Controllers\ServiceLegacyItemsController;
use App\Http\Controllers\ServiceSalesController;
use App\Http\Controllers\ServiceSalesItemsController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TinyProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified','check'])->name('dashboard');


Route::middleware(['auth', 'verified','check'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/home', [HomeController::class, 'index'])->name('home')->middleware(['auth', 'verified','check']);

Route::middleware(['auth', 'verified','check'])->group(function () {
    Route::get('manufacturer/index',             [ManufacturerController::class, 'index'])->name('manufacturer.index');
    Route::get('manufacturer/show/{id}',         [ManufacturerController::class, 'show'])->name('manufacturer.show');
    Route::get('manufacturer/create',            [ManufacturerController::class, 'create'])->name('manufacturer.create');
    Route::post('manufacturer/store',            [ManufacturerController::class, 'store'])->name('manufacturer.store');
    Route::get('manufacturer/edit/{id}',         [ManufacturerController::class, 'edit'])->name('manufacturer.edit');
    Route::post('manufacturer/update/{id}',      [ManufacturerController::class, 'update'])->name('manufacturer.update');
    Route::get('manufacturer/destroy/{id}',      [ManufacturerController::class, 'destroy'])->name('manufacturer.destroy');


    Route::get('supplier/index',                [SupplierController::class, 'index'])->name('supplier.index');
    Route::get('supplier/show/{id}',            [SupplierController::class, 'show'])->name('supplier.show');
    Route::get('supplier/create',               [SupplierController::class, 'create'])->name('supplier.create');
    Route::post('supplier/store',               [SupplierController::class, 'store'])->name('supplier.store');
    Route::get('supplier/edit/{id}',            [SupplierController::class, 'edit'])->name('supplier.edit');
    Route::post('supplier/update/{id}',         [SupplierController::class, 'update'])->name('supplier.update');
    Route::get('supplier/destroy/{id}',         [SupplierController::class, 'destroy'])->name('supplier.destroy');



    Route::get('jewel/images/{jewel}',                  [JewelsController::class, 'images'])->name('jewels.images.index');
    Route::post('jewel/image/store/{jewel}',            [JewelsController::class, 'imageStore'])->name('jewels.image.store');
    Route::get('jewel/image/destroy/{image}',           [JewelsController::class, 'imageDestroy'])->name('jewels.image.destroy');
    Route::get('jewel/image/download/{image}',          [JewelsController::class, 'download'])->name('jewels.image.download');


    Route::any('jewel/index/{collection?}/{category?}',  [JewelsController::class, 'index'])->name('jewels.index');
    Route::get('jewel/show/{id}',                        [JewelsController::class, 'show'])->name('jewels.show');
    Route::get('jewel/create',                           [JewelsController::class, 'create'])->name('jewels.create');
    Route::post('jewel/store',                           [JewelsController::class, 'store'])->name('jewels.store');
    Route::get('jewel/edit/{id}',                        [JewelsController::class, 'edit'])->name('jewels.edit');
    Route::post('jewel/update/{id}',                     [JewelsController::class, 'update'])->name('jewels.update');
    Route::get('jewel/destroy/{id}',                     [JewelsController::class, 'destroy'])->name('jewels.destroy');


    Route::any('product/index/{collection?}/{category?}',             [ProductController::class, 'index'])->name('product.index');
    Route::get('product/show/{product}',                              [ProductController::class, 'show'])->name('product.show');
    Route::get('product/jewel_products/index/{jewel}',                [ProductController::class, 'jewel_products'])->name('product.jewel_products.index');
    Route::get('product/create/{jewel}',                              [ProductController::class, 'create'])->name('product.create');
    Route::post('product/store',                                      [ProductController::class, 'store'])->name('product.store');
    Route::get('product/edit/{product}',                              [ProductController::class, 'edit'])->name('product.edit');
    Route::post('product/update/{product}',                           [ProductController::class, 'update'])->name('product.update');
    Route::get('product/destroy/{product}',                           [ProductController::class, 'destroy'])->name('product.destroy');

    Route::post('product/sku_change',                                 [ProductController::class, 'sku_change'])->name('product.sku.change')->middleware(['auth', 'verified']);

    Route::get('product/images/index/{product}',                      [ProductController::class, 'images'])->name('product.images.index');
    Route::post('product/image/store/{product}',                      [ProductController::class, 'imageStore'])->name('product.image.store');
    Route::get('product/image_destroy/{image}',                       [ProductController::class, 'imageDestroy'])->name('product.image.destroy');

    Route::post('product/price_change/{product}',                     [ProductController::class, 'price_change'])->name('product.price.change');
    Route::post('product/price_store/{product}',                      [ProductController::class, 'price_store'])->name('product.price.store');
    Route::get('product/image/download/{id}',                         [ProductImageController::class, 'download'])->name('product.image.download');

    Route::post('product/gold/add',                                   [ProductGoldsController::class, 'add'])->name('product.gold.add');
    Route::get('product/gold/remove/{product_gold}',                  [ProductGoldsController::class, 'remove'])->name('product.gold.remove');

    Route::post('product/gem/add',                                    [ProductGemsController::class, 'add'])->name('product.gem.add');
    Route::get('product/gem/remove/{product_gem}',                    [ProductGemsController::class, 'remove'])->name('product.gem.remove');

    Route::get('product/manufacturer/create/{component}',             [ProductManufacturersController::class, 'create'])->name('jewels.component.manufacturer.create');
    Route::post('product/manufacturer/store',                         [ProductManufacturersController::class, 'store'])->name('jewels.component.manufacturer.store');
    Route::post('product/manufacturer/update/{id}',                   [ProductManufacturersController::class, 'update'])->name('jewels.component.manufacturer.update');


    Route::get('production/orders/index',                                       [ProductionOrdersController::class, 'index'])->name('production.orders.index');
    Route::get('production/orders/show/{id}',                                   [ProductionOrdersController::class, 'show'])->name('production.orders.show');
    Route::get('production/orders/finished/{id}',                               [ProductionOrdersController::class, 'finished'])->name('production.orders.finished');
    Route::get('production/orders/create',                                      [ProductionOrdersController::class, 'create'])->name('production.orders.create');
    Route::post('production/orders/store',                                      [ProductionOrdersController::class, 'store'])->name('production.orders.store');
    Route::any('production/orders/edit/{id}/{collection?}/{category?}',         [ProductionOrdersController::class, 'edit'])->name('production.orders.edit');
    Route::post('production/orders/update/{id}',                                [ProductionOrdersController::class, 'update'])->name('production.orders.update');
    Route::get('production/orders/destroy/{product_id}/{production_order_id}',  [ProductionOrdersController::class, 'destroy'])->name('production.orders.destroy');
    Route::get('production/orders/summary/{id}',                                [ProductionOrdersController::class, 'summary'])->name('production.orders.summary');
    Route::get('production/orders/full/{id}',                                   [ProductionOrdersController::class, 'full'])->name('production.orders.full');
    Route::get('production/orders/images/{id}',                                 [ProductionOrdersController::class, 'images'])->name('production.orders.images');


    Route::get('service/index',                                             [ServiceController::class, 'index'])->name('service.index');
//    Route::any('service/user',                                              [ServiceController::class, 'user'])->name('service.user');
    Route::get('service/destroy/{component_id}/{service_id}',               [ServiceController::class, 'destroy'])->name('service.destroy');
    Route::get('service/summary/{id}',                                      [ServiceController::class, 'summary'])->name('service.summary');
    Route::get('service/full/{id}',                                         [ServiceController::class, 'full'])->name('service.full');
    Route::get('service/images/{id}',                                       [ServiceController::class, 'images'])->name('service.images');


    //serviços de vendas atuais
    Route::get('service/sales/index',                                           [ServiceSalesController::class, 'index'])->name('service.sales.index');
    Route::any('service/sales/user',                                            [ServiceSalesController::class, 'user'])->name('service.sales.user');
    Route::get('service/sales/create/{user}',                                   [ServiceSalesController::class, 'create'])->name('service.sales.create');
    Route::post('service/sales/store',                                          [ServiceSalesController::class, 'store'])->name('service.sales.store');
    Route::any('service/sales/edit/{id}/{collection?}/{category?}',             [ServiceSalesController::class, 'edit'])->name('service.sales.edit');
    Route::post('service/sales/update/{id}',                                    [ServiceSalesController::class, 'update'])->name('service.sales.update');
    Route::get('service/sales/finished/{id}',                                   [ServiceSalesController::class, 'finished'])->name('service.sales.finished');

    Route::get('service_items/sales/show/{id}',                                 [ServiceSalesItemsController::class, 'show'])->name('service_items.sales.show');
    Route::get('service_items/sales/add/{service_id}/{product_id}',             [ServiceSalesItemsController::class, 'add'])->name('service_items.sales.add');
    Route::any('service_items/sales/edit/{id}',                                 [ServiceSalesItemsController::class, 'edit'])->name('service_items.sales.edit');
    Route::post('service_items/sales/update/{id}',                              [ServiceSalesItemsController::class, 'update'])->name('service_items.sales.update');
    Route::get('service_items/sales/destroy/{id}/{service}',                    [ServiceSalesItemsController::class, 'destroy'])->name('service_items.sales.destroy');


    //serviços legados
    Route::get('service/legacy/index',                                           [ServiceLegacyController::class, 'index'])->name('service.legacy.index');
    Route::any('service/legacy/user',                                            [ServiceLegacyController::class, 'user'])->name('service.legacy.user');
    Route::get('service/legacy/create/{user}',                                   [ServiceLegacyController::class, 'create'])->name('service.legacy.create');
    Route::post('service/legacy/store',                                          [ServiceLegacyController::class, 'store'])->name('service.legacy.store');
    Route::any('service/legacy/edit/{id}/{collection?}/{category?}',             [ServiceLegacyController::class, 'edit'])->name('service.legacy.edit');
    Route::post('service/legacy/update/{id}',                                    [ServiceLegacyController::class, 'update'])->name('service.legacy.update');
    Route::get('service/legacy/finished/{id}',                                   [ServiceLegacyController::class, 'finished'])->name('service.legacy.finished');

    Route::any('service_items/legacy/show/{id}/{collection?}/{category?}',       [ServiceLegacyItemsController::class, 'show'])->name('service_items.legacy.show');
    Route::get('service_items/legacy/add/{service_id}/{product_id}',             [ServiceLegacyItemsController::class, 'add'])->name('service_items.legacy.add');
    Route::any('service_items/legacy/edit/{id}',                                 [ServiceLegacyItemsController::class, 'edit'])->name('service_items.legacy.edit');
    Route::post('service_items/legacy/update/{id}',                              [ServiceLegacyItemsController::class, 'update'])->name('service_items.legacy.update');
    Route::get('service_items/legacy/destroy/{id}/{service}',                    [ServiceLegacyItemsController::class, 'destroy'])->name('service_items.legacy.destroy');



    //serviços externos

    Route::get('service/external/index',                                           [ServiceExternalController::class, 'index'])->name('service.external.index');
    Route::any('service/external/user',                                            [ServiceExternalController::class, 'user'])->name('service.external.user');
    Route::get('service/external/create/{user}',                                   [ServiceExternalController::class, 'create'])->name('service.external.create');
    Route::post('service/external/store',                                          [ServiceExternalController::class, 'store'])->name('service.external.store');
    Route::any('service/external/edit/{id}/{category?}',                           [ServiceExternalController::class, 'edit'])->name('service.external.edit');
    Route::post('service/external/update/{id}',                                    [ServiceExternalController::class, 'update'])->name('service.external.update');
    Route::get('service/external/destroy/{component_id}/{service_id}',             [ServiceExternalController::class, 'destroy'])->name('service.external.destroy');
    Route::get('service/external/finished/{id}',                                   [ServiceExternalController::class, 'finished'])->name('service.external.finished');


    Route::get('service/external/summary/{id}',                                    [ServiceExternalController::class, 'summary'])->name('service.external.summary');
    Route::get('service/external/full/{id}',                                       [ServiceExternalController::class, 'full'])->name('service.external.full');
    Route::get('service/external/images/{id}',                                     [ServiceExternalController::class, 'images'])->name('service.external.images');

    Route::any('service_items/external/show/{id}/{category?}',                     [ServiceExternalItemsController::class, 'show'])->name('service_items.external.show');
    Route::get('service_items/external/add/{service_id}/{product_id}',             [ServiceExternalItemsController::class, 'add'])->name('service_items.external.add');
    Route::any('service_items/external/edit/{id}',                                 [ServiceExternalItemsController::class, 'edit'])->name('service_items.external.edit');
    Route::post('service_items/external/update/{id}',                              [ServiceExternalItemsController::class, 'update'])->name('service_items.external.update');
    Route::get('service_items/external/destroy/{id}/{service}',                    [ServiceExternalItemsController::class, 'destroy'])->name('service_items.external.destroy');


    Route::any('jewel/external/index/{collection?}/{category?}',                    [JewelExternalController::class, 'index'])->name('jewel.external.index');
    Route::get('jewel/external/create',                                             [JewelExternalController::class, 'create'])->name('jewel.external.create');
    Route::post('jewel/external/store',                                             [JewelExternalController::class, 'store'])->name('jewel.external.store');
    Route::get('jewel/external/edit/{jewel}',                                       [JewelExternalController::class, 'edit'])->name('jewel.external.edit');
    Route::post('jewel/external/update/{jewel}',                                    [JewelExternalController::class, 'update'])->name('jewel.external.update');
    Route::get('jewel/external/destroy/{jewel}',                                    [JewelExternalController::class, 'destroy'])->name('jewel.external.destroy');

    Route::get('jewel/external/images/index/{jewel}',                               [JewelExternalController::class, 'images'])->name('jewel.external.images.index');
    Route::post('jewel/external/image/store/{jewel}',                               [JewelExternalController::class, 'imageStore'])->name('jewel.external.image.store');
    Route::get('jewel/external/image_destroy/{image}',                              [JewelExternalController::class, 'imageDestroy'])->name('jewel.external.image.destroy');

    Route::post('jewel/external/price_change/{jewel}',                              [JewelExternalController::class, 'price_change'])->name('jewel.external.price.change');
    Route::post('jewel/external/price_store/{jewel}',                               [JewelExternalController::class, 'price_store'])->name('jewel.external.price.store');
    Route::get('jewel/external/image/download/{id}',                                [JewelExternalImageController::class, 'download'])->name('jewel.external.image.download');


    Route::any('user/index',                                          [UserController::class, 'index'])->name('user.index');
    Route::get('user/create',                                         [UserController::class, 'create'])->name('user.create');
    Route::post('user/store',                                         [UserController::class, 'store'])->name('user.store');
    Route::get('user/edit/{user}',                                    [UserController::class, 'edit'])->name('user.edit');
    Route::post('user/update/{user}',                                 [UserController::class, 'update'])->name('user.update');
    Route::get('user/destroy/{user}',                                 [UserController::class, 'destroy'])->name('user.destroy');
    Route::get('user/password/{user}',                                [UserController::class, 'password'])->name('user.password');
    Route::get('user/update_password/{user}',                         [UserController::class, 'update_password'])->name('user.update.password');
    Route::get('user/birthdays',                                      [UserController::class, 'birthdays'])->name('user.birthdays');
    Route::get('user/print_address/{user}',                           [UserController::class, 'print_address'])->name('user.print.address');


});

//
//Route::get('material/index',                                            ['as'=>'material.index',                                'uses'=> 'Admin\Atelier\MaterialController@index']);
//Route::get('material/create',                                           ['as'=>'material.create',                               'uses'=> 'Admin\Atelier\MaterialController@create']);
//Route::post('material/store',                                           ['as'=>'material.store',                                'uses'=> 'Admin\Atelier\MaterialController@store']);
//Route::get('material/edit/{material}',                                  ['as'=>'material.edit',                                 'uses'=> 'Admin\Atelier\MaterialController@edit']);
//Route::get('material/show/{material}',                                  ['as'=>'material.show',                                 'uses'=> 'Admin\Atelier\MaterialController@show']);
//Route::post('material/update/{material}',                               ['as'=>'material.update',                               'uses'=> 'Admin\Atelier\MaterialController@update']);
//Route::get('material/destroy/{material}',                               ['as'=>'material.destroy',                              'uses'=> 'Admin\Atelier\MaterialController@destroy']);
//Route::get('material/images/{gema}',                                    ['as'=>'material.images',                               'uses'=> 'Admin\Atelier\MaterialController@images']);
//Route::post('material/image/store/{id}',                                ['as'=>'material.image.store',                          'uses'=> 'Admin\Atelier\MaterialController@imageStore']);
//Route::get('material/image/destroy/{image}/{id}',                       ['as'=>'material.image.destroy',                        'uses'=> 'Admin\Atelier\MaterialController@imageDestroy']);
//
//
//Route::get('gema/index',                                                ['as'=>'gema.index',                                    'uses'=> 'Admin\Atelier\GemaController@index']);
//Route::get('gema/create',                                               ['as'=>'gema.create',                                   'uses'=> 'Admin\Atelier\GemaController@create']);
//Route::post('gema/store',                                               ['as'=>'gema.store',                                    'uses'=> 'Admin\Atelier\GemaController@store']);
//Route::get('gema/edit/{gema}',                                          ['as'=>'gema.edit',                                     'uses'=> 'Admin\Atelier\GemaController@edit']);
//Route::get('gema/show/{gema}',                                          ['as'=>'gema.show',                                     'uses'=> 'Admin\Atelier\GemaController@show']);
//Route::post('gema/update/{gema}',                                       ['as'=>'gema.update',                                   'uses'=> 'Admin\Atelier\GemaController@update']);
//Route::get('gema/destroy/{gema}',                                       ['as'=>'gema.destroy',                                  'uses'=> 'Admin\Atelier\GemaController@destroy']);
//Route::get('gema/images/{gema}',                                        ['as'=>'gema.images',                                   'uses'=> 'Admin\Atelier\GemaController@images']);
//Route::post('gema/image/store/{id}',                                    ['as'=>'gema.image.store',                              'uses'=> 'Admin\Atelier\GemaController@imageStore']);
//Route::get('gema/image/destroy/{image}/{id}',                           ['as'=>'gema.image.destroy',                            'uses'=> 'Admin\Atelier\GemaController@imageDestroy']);
//
//
//Route::get('gem_stock/index/{id}',                                      ['as'=>'gem_stock.index',                               'uses'=> 'Admin\Atelier\GemStockController@index'])->middleware('can:access_control_permission');
//Route::get('gem_stock/change/{id}',                                     ['as'=>'gem_stock.alterar_preco',                       'uses'=> 'Admin\Atelier\GemStockController@alterar_preco'])->middleware('can:access_control_permission');
//Route::post('gem_stock/alterar/{id}',                                   ['as'=>'gem_stock.alterar',                             'uses'=> 'Admin\Atelier\GemStockController@alterar'])->middleware('can:access_control_permission');
//Route::get('gem_stock/create/{id}',                                     ['as'=>'gem_stock.create',                              'uses'=> 'Admin\Atelier\GemStockController@create'])->middleware('can:access_control_permission');
//Route::post('gem_stock/store/{id}',                                     ['as'=>'gem_stock.store',                               'uses'=> 'Admin\Atelier\GemStockController@store'])->middleware('can:access_control_permission');
//Route::get('gem_stock/in/destroy/{stockIn}',                            ['as'=>'gem_stock.in.destroy',                          'uses'=> 'Admin\Atelier\GemStockController@in_destroy'])->middleware('can:access_control_permission');
//Route::get('gem_stock/out/destroy/{stockOut}',                          ['as'=>'gem_stock.out.destroy',                         'uses'=> 'Admin\Atelier\GemStockController@out_destroy'])->middleware('can:access_control_permission');
//
//
//Route::get('gem_stock/fabricante_add/{gema}/{fabricante}',              ['as'=>'gem_stock.fabricante_add',                      'uses'=> 'Admin\Atelier\GemStockController@fabricante_add'])->middleware('can:access_control_permission');
//Route::get('gem_stock/fabricante_destroy/{gema}/{fabricante}',          ['as'=>'gem_stock.fabricante_destroy',                  'uses'=> 'Admin\Atelier\GemStockController@fabricante_destroy'])->middleware('can:access_control_permission');
//
//Route::get('gem_type/index',                                             ['as'=>'gem.type.index',                               'uses'=> 'Admin\Atelier\GemTypeController@index']);
//Route::get('gem_type/create',                                            ['as'=>'gem.type.create',                              'uses'=> 'Admin\Atelier\GemTypeController@create']);
//Route::post('gem_type/store',                                            ['as'=>'gem.type.store',                               'uses'=> 'Admin\Atelier\GemTypeController@store']);
//Route::get('gem_type/edit/{id}',                                         ['as'=>'gem.type.edit',                                'uses'=> 'Admin\Atelier\GemTypeController@edit']);
//Route::get('gem_type/show/{id}',                                         ['as'=>'gem.type.show',                                'uses'=> 'Admin\Atelier\GemTypeController@show']);
//Route::post('gem_type/update/{id}',                                      ['as'=>'gem.type.update',                              'uses'=> 'Admin\Atelier\GemTypeController@update']);
//Route::get('gem_type/destroy/{id}',                                      ['as'=>'gem.type.destroy',                             'uses'=> 'Admin\Atelier\GemTypeController@destroy']);
//Route::get('gem_type/images/{id}',                                       ['as'=>'gem.type.images',                              'uses'=> 'Admin\Atelier\GemTypeController@images']);
//Route::post('gem_type/image/store/{id}',                                 ['as'=>'gem.type.image.store',                         'uses'=> 'Admin\Atelier\GemTypeController@imageStore']);
//Route::get('gem_type/image/destroy/{image}/{id}',                        ['as'=>'gem.type.image.destroy',                       'uses'=> 'Admin\Atelier\GemTypeController@imageDestroy']);
//
//Route::get('gema_formato/index',                                         ['as'=>'gem.formato.index',                            'uses'=> 'Admin\Atelier\GemFormatoController@index']);
//Route::get('gema_formato/create',                                        ['as'=>'gem.formato.create',                           'uses'=> 'Admin\Atelier\GemFormatoController@create']);
//Route::post('gema_formato/store',                                        ['as'=>'gem.formato.store',                            'uses'=> 'Admin\Atelier\GemFormatoController@store']);
//Route::get('gema_formato/edit/{gema}',                                   ['as'=>'gem.formato.edit',                             'uses'=> 'Admin\Atelier\GemFormatoController@edit']);
//Route::get('gema_formato/show/{gema}',                                   ['as'=>'gem.formato.show',                             'uses'=> 'Admin\Atelier\GemFormatoController@show']);
//Route::post('gema_formato/update/{gema}',                                ['as'=>'gem.formato.update',                           'uses'=> 'Admin\Atelier\GemFormatoController@update']);
//Route::get('gema_formato/destroy/{gema}',                                ['as'=>'gem.formato.destroy',                          'uses'=> 'Admin\Atelier\GemFormatoController@destroy']);
//
//Route::get('gema_lapidacao/index',                                       ['as'=>'gem.lapidacao.index',                           'uses'=> 'Admin\Atelier\GemLapidacaoController@index']);
//Route::get('gema_lapidacao/create',                                      ['as'=>'gem.lapidacao.create',                          'uses'=> 'Admin\Atelier\GemLapidacaoController@create']);
//Route::post('gema_lapidacao/store',                                      ['as'=>'gem.lapidacao.store',                           'uses'=> 'Admin\Atelier\GemLapidacaoController@store']);
//Route::get('gema_lapidacao/edit/{gema}',                                 ['as'=>'gem.lapidacao.edit',                            'uses'=> 'Admin\Atelier\GemLapidacaoController@edit']);
//Route::get('gema_lapidacao/show/{gema}',                                 ['as'=>'gem.lapidacao.show',                            'uses'=> 'Admin\Atelier\GemLapidacaoController@show']);
//Route::post('gema_lapidacao/update/{gema}',                              ['as'=>'gem.lapidacao.update',                          'uses'=> 'Admin\Atelier\GemLapidacaoController@update']);
//Route::get('gema_lapidacao/destroy/{gema}',                              ['as'=>'gem.lapidacao.destroy',                         'uses'=> 'Admin\Atelier\GemLapidacaoController@destroy']);
//
//
//Route::get('gema_dimensao/index',                                        ['as'=>'gem.dimensao.index',                           'uses'=> 'Admin\Atelier\GemDimensaoController@index']);
//Route::get('gema_dimensao/create',                                       ['as'=>'gem.dimensao.create',                          'uses'=> 'Admin\Atelier\GemDimensaoController@create']);
//Route::post('gema_dimensao/store',                                       ['as'=>'gem.dimensao.store',                           'uses'=> 'Admin\Atelier\GemDimensaoController@store']);
//Route::get('gema_dimensao/edit/{gema}',                                  ['as'=>'gem.dimensao.edit',                            'uses'=> 'Admin\Atelier\GemDimensaoController@edit']);
//Route::get('gema_dimensao/show/{gema}',                                  ['as'=>'gem.dimensao.show',                            'uses'=> 'Admin\Atelier\GemDimensaoController@show']);
//Route::post('gema_dimensao/update/{gema}',                               ['as'=>'gem.dimensao.update',                          'uses'=> 'Admin\Atelier\GemDimensaoController@update']);
//Route::get('gema_dimensao/destroy/{gema}',                               ['as'=>'gem.dimensao.destroy',                         'uses'=> 'Admin\Atelier\GemDimensaoController@destroy']);
//
//
//Route::get('metal_type/index',                                           ['as'=>'metal.type.index',                             'uses'=> 'Admin\Atelier\MetalTypeController@index']);
//Route::get('metal_type/create',                                          ['as'=>'metal.type.create',                            'uses'=> 'Admin\Atelier\MetalTypeController@create']);
//Route::post('metal_type/store',                                          ['as'=>'metal.type.store',                             'uses'=> 'Admin\Atelier\MetalTypeController@store']);
//Route::get('metal_type/edit/{id}',                                       ['as'=>'metal.type.edit',                              'uses'=> 'Admin\Atelier\MetalTypeController@edit']);
//Route::get('metal_type/show/{id}',                                       ['as'=>'metal.type.show',                              'uses'=> 'Admin\Atelier\MetalTypeController@show']);
//Route::post('metal_type/update/{id}',                                    ['as'=>'metal.type.update',                            'uses'=> 'Admin\Atelier\MetalTypeController@update']);
//Route::get('metal_type/destroy/{id}',                                    ['as'=>'metal.type.destroy',                           'uses'=> 'Admin\Atelier\MetalTypeController@destroy']);
//
//
//Route::get('metal/index',                                                ['as'=>'metal.index',                                    'uses'=> 'Admin\Atelier\MetalController@index']);
//Route::get('metal/create',                                               ['as'=>'metal.create',                                   'uses'=> 'Admin\Atelier\MetalController@create']);
//Route::post('metal/store',                                               ['as'=>'metal.store',                                    'uses'=> 'Admin\Atelier\MetalController@store']);
//Route::get('metal/edit/{id}',                                            ['as'=>'metal.edit',                                     'uses'=> 'Admin\Atelier\MetalController@edit']);
//Route::get('metal/show/{id}',                                            ['as'=>'metal.show',                                     'uses'=> 'Admin\Atelier\MetalController@show']);
//Route::post('metal/update/{id}',                                         ['as'=>'metal.update',                                   'uses'=> 'Admin\Atelier\MetalController@update']);
//Route::get('metal/destroy/{id}',                                         ['as'=>'metal.destroy',                                  'uses'=> 'Admin\Atelier\MetalController@destroy']);
//
//
//Route::get('metal_stock/index/{id}',                                     ['as'=>'metal_stock.index',                              'uses'=> 'Admin\Atelier\MetalStockController@index'])->middleware('can:access_control_permission');
//Route::get('metal_stock/change/{id}',                                    ['as'=>'metal_stock.alterar_preco',                      'uses'=> 'Admin\Atelier\MetalStockController@alterar_preco'])->middleware('can:access_control_permission');
//Route::post('metal_stock/alterar/{id}',                                  ['as'=>'metal_stock.alterar',                            'uses'=> 'Admin\Atelier\MetalStockController@alterar'])->middleware('can:access_control_permission');
//Route::get('metal_stock/create/{id}',                                    ['as'=>'metal_stock.create',                             'uses'=> 'Admin\Atelier\MetalStockController@create'])->middleware('can:access_control_permission');
//Route::post('metal_stock/store/{id}',                                    ['as'=>'metal_stock.store',                              'uses'=> 'Admin\Atelier\MetalStockController@store'])->middleware('can:access_control_permission');
//Route::get('metal_stock/in/destroy/{stockIn}',                           ['as'=>'metal_stock.in.destroy',                         'uses'=> 'Admin\Atelier\MetalStockController@in_destroy'])->middleware('can:access_control_permission');
//Route::get('metal_stock/out/destroy/{stockOut}',                         ['as'=>'metal_stock.out.destroy',                        'uses'=> 'Admin\Atelier\MetalStockController@out_destroy'])->middleware('can:access_control_permission');
//
//
//Route::post('metal_stock/fabricante_add',                                ['as'=>'metal_stock.fabricante_add',                     'uses'=> 'Admin\Atelier\MetalStockController@fabricante_add'])->middleware('can:access_control_permission');
//Route::get('metal_stock/fabricante_remove/{id}',                         ['as'=>'metal_stock.fabricante_remove',                  'uses'=> 'Admin\Atelier\MetalStockController@fabricante_remove'])->middleware('can:access_control_permission');
//Route::get('metal_stock/fabricante_destroy/{metal}/{fabricante}',        ['as'=>'metal_stock.fabricante_destroy',                 'uses'=> 'Admin\Atelier\MetalStockController@fabricante_destroy'])->middleware('can:access_control_permission');
//
//
//
//Route::get('embalagem/index',                                            ['as'=>'embalagem.index',                                    'uses'=> 'Admin\Atelier\EmbalagemController@index']);
//Route::get('embalagem/create',                                           ['as'=>'embalagem.create',                                   'uses'=> 'Admin\Atelier\EmbalagemController@create']);
//Route::post('embalagem/store',                                           ['as'=>'embalagem.store',                                    'uses'=> 'Admin\Atelier\EmbalagemController@store']);
//Route::get('embalagem/edit/{id}',                                        ['as'=>'embalagem.edit',                                     'uses'=> 'Admin\Atelier\EmbalagemController@edit']);
//Route::get('embalagem/show/{id}',                                        ['as'=>'embalagem.show',                                     'uses'=> 'Admin\Atelier\EmbalagemController@show']);
//Route::post('embalagem/update/{id}',                                     ['as'=>'embalagem.update',                                   'uses'=> 'Admin\Atelier\EmbalagemController@update']);
//Route::get('embalagem/destroy/{id}',                                     ['as'=>'embalagem.destroy',                                  'uses'=> 'Admin\Atelier\EmbalagemController@destroy']);
//
//
//Route::get('embalagem_stock/index/{id}',                                 ['as'=>'embalagem_stock.index',                              'uses'=> 'Admin\Atelier\EmbalagemStockController@index'])->middleware('can:access_control_permission');
//Route::get('embalagem_stock/change/{id}',                                ['as'=>'embalagem_stock.alterar_preco',                      'uses'=> 'Admin\Atelier\EmbalagemStockController@alterar_preco'])->middleware('can:access_control_permission');
//Route::post('embalagem_stock/alterar/{id}',                              ['as'=>'embalagem_stock.alterar',                            'uses'=> 'Admin\Atelier\EmbalagemStockController@alterar'])->middleware('can:access_control_permission');
//Route::get('embalagem_stock/create/{id}',                                ['as'=>'embalagem_stock.create',                             'uses'=> 'Admin\Atelier\EmbalagemStockController@create'])->middleware('can:access_control_permission');
//Route::post('embalagem_stock/store/{id}',                                ['as'=>'embalagem_stock.store',                              'uses'=> 'Admin\Atelier\EmbalagemStockController@store'])->middleware('can:access_control_permission');
//Route::get('embalagem_stock/in/destroy/{stockIn}',                       ['as'=>'embalagem_stock.in.destroy',                         'uses'=> 'Admin\Atelier\EmbalagemStockController@in_destroy'])->middleware('can:access_control_permission');
//Route::get('embalagem_stock/out/destroy/{stockOut}' ,                    ['as'=>'embalagem_stock.out.destroy',                        'uses'=> 'Admin\Atelier\EmbalagemStockController@out_destroy'])->middleware('can:access_control_permission');
//


//
//
//Route::get('pedidos/index',                                             ['as'=>'pedidos.index',                                 'uses'=> 'Admin\Atelier\PedidosController@index'])->middleware('can:access_control_permission');
//Route::get('pedidos/fabricante',                                        ['as'=>'pedidos.fabricante',                            'uses'=> 'Admin\Atelier\PedidosController@fabricante'])->middleware('can:access_control_permission');
//Route::get('pedidos/init/{fabricante_id}',                              ['as'=>'pedidos.init',                                  'uses'=> 'Admin\Atelier\PedidosController@init'])->middleware('can:access_control_permission');
//Route::get('pedidos/create/{pedido}/{collection?}/{category?}',         ['as'=>'pedidos.create',                                'uses'=> 'Admin\Atelier\PedidosController@create'])->middleware('can:access_control_permission');
//Route::post('pedidos/add',                                              ['as'=>'pedidos.add',                                   'uses'=> 'Admin\Atelier\PedidosController@add'])->middleware('can:access_control_permission');
//Route::get('pedidos/remove/{id}',                                       ['as'=>'pedidos.remove',                                'uses'=> 'Admin\Atelier\PedidosController@remove'])->middleware('can:access_control_permission');
//Route::post('pedidos/update/{pedido}',                                  ['as'=>'pedidos.update',                                'uses'=> 'Admin\Atelier\PedidosController@update'])->middleware('can:access_control_permission');
//Route::get('pedidos/fechamento/{pedido}',                               ['as'=>'pedidos.fechamento',                            'uses'=> 'Admin\Atelier\PedidosController@fechamento'])->middleware('can:access_control_permission');
//Route::get('pedidos/relatorio/{pedido}',                                ['as'=>'pedidos.relatorio',                             'uses'=> 'Admin\Atelier\PedidosController@relatorio'])->middleware('can:access_control_permission');
//Route::get('pedidos/imprimir/{pedido}',                                 ['as'=>'pedidos.imprimir',                              'uses'=> 'Admin\Atelier\PedidosController@imprimir'])->middleware('can:access_control_permission');
//Route::get('pedidos/completo/{pedido}',                                 ['as'=>'pedidos.completo',                              'uses'=> 'Admin\Atelier\PedidosController@completo'])->middleware('can:access_control_permission');
//Route::get('pedidos/fotos/{pedido}',                                    ['as'=>'pedidos.fotos',                                 'uses'=> 'Admin\Atelier\PedidosController@fotos'])->middleware('can:access_control_permission');
//Route::get('pedidos/imprimir/{pedido}',                                 ['as'=>'pedidos.imprimir',                              'uses'=> 'Admin\Atelier\PedidosController@imprimir'])->middleware('can:access_control_permission');
//Route::get('pedidos/completo/{pedido}',                                 ['as'=>'pedidos.completo',                              'uses'=> 'Admin\Atelier\PedidosController@completo'])->middleware('can:access_control_permission');
//Route::get('pedidos/fotos/{pedido}',                                    ['as'=>'pedidos.fotos',                                 'uses'=> 'Admin\Atelier\PedidosController@fotos'])->middleware('can:access_control_permission');
//
//
//Route::get('pedido_report/index',                                       ['as'=>'pedidos.report.index',                      'uses'=> 'Admin\Atelier\PedidoReportsController@index'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pedidos_nao_enviados',                        ['as'=>'pedidos.report.nao_enviados',               'uses'=> 'Admin\Atelier\PedidoReportsController@nao_enviados'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pedidos_abertos',                             ['as'=>'pedidos.report.abertos',                    'uses'=> 'Admin\Atelier\PedidoReportsController@abertos'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pedidos_finalizados',                         ['as'=>'pedidos.report.finalizados',                'uses'=> 'Admin\Atelier\PedidoReportsController@finalizados'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pedido_por_fabricante/{fabricante}',          ['as'=>'pedidos.report.por_fabricante',             'uses'=> 'Admin\Atelier\PedidoReportsController@por_fabricante'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pedidos_mes/{year?}/{month?}',                ['as'=>'pedidos.report.pedidos.mes',                'uses'=> 'Admin\Atelier\PedidoReportsController@pedidos_mes'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pedidos_ano/{year?}',                         ['as'=>'pedidos.report.pedidos.ano',                'uses'=> 'Admin\Atelier\PedidoReportsController@pedidos_ano'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pagamentos_mes/{year?}/{month?}',             ['as'=>'pedidos.report.pagamentos.mes',             'uses'=> 'Admin\Atelier\PedidoReportsController@pagamentos_mes'])->middleware('can:access_control_permission');
//Route::get('pedido_report/pagamentos_ano/{year?}',                      ['as'=>'pedidos.report.pagamentos.ano',             'uses'=> 'Admin\Atelier\PedidoReportsController@pagamentos_ano'])->middleware('can:access_control_permission');
//
//
//Route::get('ordem_servico/images/{id}',                                     ['as'=>'ordem.servico.images',                      'uses'=> 'Admin\Atelier\OrdemServicoController@images'])->middleware('can:access_control_permission');
//Route::post('ordem_servico/image/store/{image}',                            ['as'=>'ordem.servico.image.store',                 'uses'=> 'Admin\Atelier\OrdemServicoController@imageStore'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/image/destroy/{image}/{id}',                      ['as'=>'ordem.servico.image.destroy',               'uses'=> 'Admin\Atelier\OrdemServicoController@imageDestroy'])->middleware('can:access_control_permission');
//
//
//Route::get('ordem_servico/index',                                           ['as'=>'ordem.servico.index',                       'uses'=> 'Admin\Atelier\OrdemServicoController@index'])->middleware('can:supervisor_permission');
//Route::get('ordem_servico/all',                                             ['as'=>'ordem.servico.listar.all',                  'uses'=> 'Admin\Atelier\OrdemServicoController@all'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/encaminhados_adm',                                ['as'=>'ordem.servico.encaminhados.adm',            'uses'=> 'Admin\Atelier\OrdemServicoController@encaminhados_adm'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/search',                                          ['as'=>'ordem.servico.search',                      'uses'=> 'Admin\Atelier\OrdemServicoController@search'])->middleware('can:access_control_permission');
//Route::post('ordem_servico/get_by_name',                                    ['as'=>'ordem.servico.get_by_name',                 'uses'=> 'Admin\Atelier\OrdemServicoController@get_by_name'])->middleware('can:access_control_permission');
//Route::post('ordem_servico/get_by_number',                                  ['as'=>'ordem.servico.get_by_number',               'uses'=> 'Admin\Atelier\OrdemServicoController@get_by_number'])->middleware('can:access_control_permission');
//Route::post('ordem_servico/get_by_product',                                 ['as'=>'ordem.servico.get_by_product',              'uses'=> 'Admin\Atelier\OrdemServicoController@get_by_product'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/listar_servicos/{auth}',                          ['as'=>'ordem.servico.listar.servicos',             'uses'=> 'Admin\Atelier\OrdemServicoController@listar_servicos'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/listar_servicos_concluidos/{auth}',               ['as'=>'ordem.servico.listar.servicos.concluidos',  'uses'=> 'Admin\Atelier\OrdemServicoController@listar_servicos_concluidos'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/listar_servicos_fabricante/{fabricante_id}',      ['as'=>'ordem.servico.listar.servicos.fabricante',  'uses'=> 'Admin\Atelier\OrdemServicoController@listar_servicos_fabricante'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/listar_paga/{paga}',                              ['as'=>'ordem.servico.listar.paga',                 'uses'=> 'Admin\Atelier\OrdemServicoController@listar_paga'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/listar_concluidos',                               ['as'=>'ordem.servico.listar.concluidos',           'uses'=> 'Admin\Atelier\OrdemServicoController@listar_concluidos'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/listar_em_producao',                              ['as'=>'ordem.servico.listar.producao',             'uses'=> 'Admin\Atelier\OrdemServicoController@listar_em_producao'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/fabricantes',                                     ['as'=>'ordem.servico.fabricantes',                 'uses'=> 'Admin\Atelier\OrdemServicoController@fabricantes'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/retorno/{id}',                                    ['as'=>'ordem.servico.retorno',                     'uses'=> 'Admin\Atelier\OrdemServicoController@retorno'])->middleware('can:access_control_permission');
////  Route::post('ordem_servico/store',                                      ['as'=>'ordem.servico.store',                       'uses'=> 'Admin\Atelier\OrdemServicoController@store'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/edit/{id}',                                       ['as'=>'ordem.servico.edit',                        'uses'=> 'Admin\Atelier\OrdemServicoController@edit'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/admin/{id}',                                      ['as'=>'ordem.servico.admin',                       'uses'=> 'Admin\Atelier\OrdemServicoController@admin'])->middleware('can:supervisor_permission');
//Route::post('ordem_servico/update/{id}',                                    ['as'=>'ordem.servico.update',                      'uses'=> 'Admin\Atelier\OrdemServicoController@update'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/destroy/{id}',                                    ['as'=>'ordem.servico.destroy',                     'uses'=> 'Admin\Atelier\OrdemServicoController@destroy'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/client/{vendedor}',                               ['as'=>'ordem.servico.client',                      'uses'=> 'Admin\Atelier\OrdemServicoController@client'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/order/{user}/{vendedor}/{collection}',            ['as'=>'ordem.servico.order',                       'uses'=> 'Admin\Atelier\OrdemServicoController@order'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/create_order_admin/{collection}',                 ['as'=>'ordem.servico.create.order.admin',          'uses'=> 'Admin\Atelier\OrdemServicoController@create_order_admin'])->middleware('can:access_control_permission');
//
//Route::get('ordem_servico/concluido/{servico}',                             ['as'=>'ordem.servico.concluido',                    'uses'=> 'Admin\Atelier\OrdemServicoController@concluido'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/imprimir/{servico}',                              ['as'=>'ordem.servico.imprimir',                    'uses'=> 'Admin\Atelier\OrdemServicoController@imprimir'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/venda/{order_id}/{order_item_id}/{product_id}',   ['as'=>'ordem.servico.venda',                       'uses'=> 'Admin\Atelier\OrdemServicoController@venda'])->middleware('can:access_control_permission');
//Route::get('ordem_servico/pagamento_status/{order}',                        ['as'=>'ordem.servico.pagamento.status',            'uses'=> 'Admin\Atelier\OrdemServicoController@pagamento_status'])->middleware('can:access_control_permission');
//
//
//
//Route::get('ordem_servico_andamento/show/{servico}',                        ['as'=>'ordem.servico.andamento.show',              'uses'=> 'Admin\Atelier\OrdemServicoAndamentoController@show'])->middleware('can:access_control_permission');
//Route::get('ordem_servico_andamento/create/{servico}/{auth}',               ['as'=>'ordem.servico.andamento.create',            'uses'=> 'Admin\Atelier\OrdemServicoAndamentoController@create'])->middleware('can:access_control_permission');
//Route::post('ordem_servico_andamento/store',                                ['as'=>'ordem.servico.andamento.store',             'uses'=> 'Admin\Atelier\OrdemServicoAndamentoController@store'])->middleware('can:access_control_permission');
//Route::get('ordem_servico_andamento/listar_mensagens/{auth}',               ['as'=>'ordem.servico.andamento.listar.mensagens',  'uses'=> 'Admin\Atelier\OrdemServicoAndamentoController@listar_mensagens'])->middleware('can:access_control_permission');
//
//Route::get('ordem_servico_report/index',                                            ['as'=>'ordem.servico.report.index',                'uses'=> 'Admin\Atelier\OrdemServicoReportsController@index'])->middleware('can:access_control_permission');
//Route::get('ordem_servico_report/ordem_servico_mes/{year?}/{month?}',               ['as'=>'ordem.servico.report.os.mes',               'uses'=> 'Admin\Atelier\OrdemServicoReportsController@ordem_servico_mes'])->middleware('can:access_control_permission');
//Route::get('ordem_servico_report/ordem_servico_ano/{year?}',                        ['as'=>'ordem.servico.report.os.ano',               'uses'=> 'Admin\Atelier\OrdemServicoReportsController@ordem_servico_ano'])->middleware('can:access_control_permission');
//Route::get('ordem_servico_report/pagamentos_mes/{year?}/{month?}/{fabricante?}',    ['as'=>'ordem.servico.report.pagamentos.mes',       'uses'=> 'Admin\Atelier\OrdemServicoReportsController@pagamentos_mes'])->middleware('can:access_control_permission');
//Route::get('ordem_servico_report/pagamentos_ano/{year?}/{fabricante?}',             ['as'=>'ordem.servico.report.pagamentos.ano',       'uses'=> 'Admin\Atelier\OrdemServicoReportsController@pagamentos_ano'])->middleware('can:access_control_permission');
//
//
//Route::get('orcamentos/images/{id}',                                     ['as'=>'orcamento.images',                 'uses'=> 'Admin\Atelier\OrcamentoController@images'])->middleware('can:access_control_permission');
//Route::post('orcamentos/image/store/{image}',                            ['as'=>'orcamento.image.store',            'uses'=> 'Admin\Atelier\OrcamentoController@imageStore'])->middleware('can:access_control_permission');
//Route::get('orcamentos/image/destroy/{image}/{id}',                      ['as'=>'orcamento.image.destroy',          'uses'=> 'Admin\Atelier\OrcamentoController@imageDestroy'])->middleware('can:access_control_permission');
//
//Route::get('orcamentos/index',                                           ['as'=>'orcamento.index',              'uses'=> 'Admin\Atelier\OrcamentoController@index'])->middleware('can:supervisor_permission');
//Route::get('orcamentos/all',                                             ['as'=>'orcamento.listar.all',         'uses'=> 'Admin\Atelier\OrcamentoController@all'])->middleware('can:access_control_permission');
//Route::get('orcamentos/listar/{auth}',                                   ['as'=>'orcamento.listar',             'uses'=> 'Admin\Atelier\OrcamentoController@listar'])->middleware('can:access_control_permission');
//Route::get('orcamentos/create',                                          ['as'=>'orcamento.create',             'uses'=> 'Admin\Atelier\OrcamentoController@create'])->middleware('can:access_control_permission');
//Route::post('orcamentos/store',                                          ['as'=>'orcamento.store',              'uses'=> 'Admin\Atelier\OrcamentoController@store'])->middleware('can:access_control_permission');
//Route::get('orcamentos/edit/{id}',                                       ['as'=>'orcamento.edit',               'uses'=> 'Admin\Atelier\OrcamentoController@edit'])->middleware('can:access_control_permission');
//Route::get('orcamentos/admin/{id}',                                      ['as'=>'orcamento.admin',              'uses'=> 'Admin\Atelier\OrcamentoController@admin'])->middleware('can:supervisor_permission');
//Route::post('orcamentos/update/{id}',                                    ['as'=>'orcamento.update',             'uses'=> 'Admin\Atelier\OrcamentoController@update'])->middleware('can:access_control_permission');
//Route::get('orcamentos/destroy/{id}',                                    ['as'=>'orcamento.destroy',            'uses'=> 'Admin\Atelier\OrcamentoController@destroy'])->middleware('can:access_control_permission');
//Route::get('orcamentos/client/{vendedor}',                               ['as'=>'orcamento.client',             'uses'=> 'Admin\Atelier\OrcamentoController@client'])->middleware('can:access_control_permission');
//Route::get('orcamentos/order/{user}/{vendedor}',                         ['as'=>'orcamento.order',              'uses'=> 'Admin\Atelier\OrcamentoController@order'])->middleware('can:access_control_permission');
//
//Route::get('orcamentos/imprimir/{orcamento}',                            ['as'=>'orcamento.imprimir',           'uses'=> 'Admin\Atelier\OrcamentoController@imprimir'])->middleware('can:access_control_permission');
//
//Route::get('orcamento_andamento/show/{orcamento}',                       ['as'=>'orcamento.andamento.show',              'uses'=> 'Admin\Atelier\OrcamentoAndamentoController@show'])->middleware('can:access_control_permission');
//Route::get('orcamento_andamento/create/{orcamento}/{auth}',              ['as'=>'orcamento.andamento.create',            'uses'=> 'Admin\Atelier\OrcamentoAndamentoController@create'])->middleware('can:access_control_permission');
//Route::post('orcamento_andamento/store',                                ['as'=>'orcamento.andamento.store',             'uses'=> 'Admin\Atelier\OrcamentoAndamentoController@store'])->middleware('can:access_control_permission');
//Route::get('orcamento_andamento/listar_mensagens/{auth}',               ['as'=>'orcamento.andamento.listar.mensagens',  'uses'=> 'Admin\Atelier\OrcamentoAndamentoController@listar_mensagens'])->middleware('can:access_control_permission');



require __DIR__.'/auth.php';
