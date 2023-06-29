<?php

namespace App\Http\Services;



class TinyProductService
{

    private TinyService $tinyService;

    public function __construct(TinyService $tinyService)

    {
        $this->tinyService = $tinyService;
    }



    public function get_products_by_sku($sku){
        $url = 'https://api.tiny.com.br/api2/produtos.pesquisa.php';
        $token = env("TINY_TOKEN_DRAZ_MATRIZ_PRAIA_DO_CANTO");
        $pesquisa = $sku;
        $data = "token=$token&pesquisa=$pesquisa&formato=JSON";
        $response = $this->tinyService->send($url, $data);
        return $this->getArrOutput($response);
    }


    public function get_product_stock_by_sku($id){
        $url = 'https://api.tiny.com.br/api2/produto.obter.estoque.php';
        $token = env("TINY_TOKEN_DRAZ_MATRIZ_PRAIA_DO_CANTO");
        $data = "token=$token&id=$id&formato=JSON";
        $response = $this->tinyService->send($url, $data);
        return $this->getArrOutput($response);
    }

    public function store($products){
        $url = 'https://api.tiny.com.br/api2/produto.incluir.php';
        $token = env("TINY_TOKEN_DRAZ_MATRIZ_PRAIA_DO_CANTO");
        $produto = $products;
        $data = "token=$token&produto=$produto&formato=JSON";
        return $this->tinyService->send($url, $data);

    }

    /**
     * @param string $response
     * @return mixed
     * @throws \Exception
     */
    private function getArrOutput(string $response): mixed
    {
        return json_decode($response, TRUE);
    }



}
