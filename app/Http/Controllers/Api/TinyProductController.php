<?php
namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Services\TinyProductService;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class TinyProductController extends Controller
{
    private TinyProductService $tinyProductService;
    private Product $product;

    public function __construct(TinyProductService $tinyProductService,
                                Product $product)

    {
        $this->tinyProductService = $tinyProductService;
        $this->product = $product;
    }


    public function store(Request $request){

        $data = $request->all();

        $product                = $this->product->find($data['id']);
        $product->sku           = $data['sequencia'];
        $product->tiny_import   = 1;
        $product->save();

        $category               = ucfirst($product->category->name);
        $category               = ucfirst(strtolower($category));


        $produtos['produtos'][] = [
            "produto" => [
                "sequencia"                 => $data['sequencia'],
                "product_id"                => $data['product_id'],
                "codigo"                    => $data['codigo'],
                "ncm"                       => $data['ncm'],
                "nome"                      => $data['nome'],
                "unidade"                   => $data['unidade'],
                "preco"                     => $data['preco'],
                "preco_promocional"         => $data['preco_promocional'],
                "origem"                    => $data['origem'],
                "situacao"                  => $data['situacao'],
                "tipo"                      => $data['tipo'],
                "marca"                     => $data['marca'],
//                "tipo_embalagem"          => $data['tipo_embalagem'],
//                "altura_embalagem"        => $data['altura_embalagem'],
//                "comprimento_embalagem"   => $data['comprimento_embalagem'],
//                "largura_embalagem"       => $data['largura_embalagem'],
//                "diametro_embalagem"      => $data['diametro_embalagem'],
                "categoria"                 => $category,
                "garantia"                  => $data['garantia'],
                "cest"                      => $data['cest'],
                //"valor_max"=> "100.00",
//                    "motivo_isencao"=> "motivo isenção da ANVISA",
//                    "tags"=> [
//                        "1234",
//                        "5678",
//                        "91011"
//                    ],
                "anexos"=> [
                    [
                        "anexo"=> isset($product->images[0])? "https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$product->images[0]->path:''
                    ]
                ],
                "imagens_externas"=> [
                    [
                        "imagem_externa"=> [
                            "url"=> isset($product->images[0])? "https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$product->images[0]->path:''
                        ]
                    ]
                ],
                "seo"=> [
                    "seo_title"         => $data['nome'],
                    "seo_keywords"      => $data['nome'],
                    "link_video"        => "",
                    "seo_description"   => "",
                    "slug"              =>  Str::slug($data['name'], "-")
                ]
            ]
        ];


        $products = json_encode($produtos,JSON_PRETTY_PRINT);
        $this->tinyProductService->store($products);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }



    public function get_stock_products_by_id($id){

        $tiny_stock = $this->tinyProductService->get_product_stock_by_sku($id);
        $tiny_stock = $tiny_stock['retorno']['produto']['depositos'] ?? null;
        return (collect($tiny_stock));
    }
}
