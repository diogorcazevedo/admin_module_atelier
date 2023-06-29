<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

</head>
<style>
    #customers {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #customers td, #customers th {
        border: #CCCCCC 1px solid;
        text-align: center;
    }



    #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
    }

</style>
<body>

<table id="customers" width="100%">
    <thead>
    <tr>
        <th width="20%" style="border:none !important;" >
            <img width="100" src="https://www.carlabuaiz.co/imgs/2.png" alt="">
        </th>
        <th style="border:none !important;" >{{mb_strtoupper($product_order->manufacturer->name)}}</th>
        <th style="border:none !important;" >PEDIDO : {{mb_strtoupper($product_order->id)}}</th>
    </tr>
    </thead>
</table>
<br/>
<br/>

<table id="customers" width="100%">

    <thead>
    <tr>
        <th><small><small><small>CÓDIGO FORNECEDOR</small></small></small></th>
        <th><small><small><small>IMG </small></small></small></th>
        <th><small><small><small>NOME</small></small></small></th>
        <th><small><small><small>VALOR UNITÁRIO</small></small></small></th>
        <th><small><small><small>QUANTIDADE</small></small></small></th>
        <th><small><small><small>PRAZO</small></small></small></th>
    </tr>
    </thead>
    <tbody>
    @php
        $groupeds = $product_order->items->unique('component_id');
    @endphp
    @foreach($groupeds as $item)
        <tr>
            <td><small><small>{{$item->criacao->codigo}}</small></small></td>
            <td >
                @if(count($item->criacao->images)>0)
                    <img class="img-thumbnail" src="{{url('storage/images/'.$item->criacao->images->first()->id.'.'.$item->criacao->images->first()->extension)}}?t=234234234234" alt=""  width="60px"/>
                @else
                    SEM FOTO
                @endif
            </td>
            <td>
                <p> <small><small><small>
                                {{$item->criacao->name}}
                                <br/>
                                {{$item->criacao->description}}
                                <br/>
                                {{$item->obs}}
                            </small></small></small></p>
            </td>
            <td>
                <p><small><small> {{(isset($item->configuracao)?$item->configuracao->peso_fino * $pedido->items->where('configuracao_id',$item->configuracao->id)->count():'')}}</small> </small></p>
            </td>
            <td>
                <p><small><small>R$ {{number_format($item->price,2,',','.')}}</small></small></p>
            </td>
            <td>
                <p><small><small>{{$pedido->items->where('criacao_id',$item->criacao->id)->count()}}</small> </small></p>
            </td>
            <td>
                <p><small><small>{{$pedido->obs}}</small></small> </p>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
<table id="customers" width="100%">
    <tbody>
    <tr class="cart_menu">
        <td colspan="6">
            <p style="text-align: right; margin-right: 5px;"><small><small>PESO ESTIMADDO DE OURO: {{$peso}}</small></small></p>
        </td>
    </tr>
    <tr class="cart_menu">
        <td colspan="6">
                <p style="text-align: right; margin-right: 5px;"><small><small>TOTAL: R$ {{number_format($pedido->total,2,',','.')}}</small></small></p>
        </td>
    </tr>
    <tr class="cart_menu">
        <td colspan="6">
                <p style="text-align: right; margin-right: 5px;"><small><small>TOTAL COM IMPOSTO: R$ {{number_format($pedido->total_imposto,2,',','.')}}</small></small></p>
        </td>
    </tr>
    </tbody>
</table>

</body>
</html>
