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
    table { page-break-inside:auto }
    tr    { page-break-inside:avoid; page-break-after:auto }
</style>
<body>

<table id="customers" width="100%">
    <thead>
    <tr>
        <th width="20%" style="border:none !important;" >
            <img width="100" src="https://www.carlabuaiz.co/imgs/2.png" alt="">
        </th>
        <th style="border:none !important;" >OFICINA: {{mb_strtoupper($product_order->manufacturer->id)}}</th>
        <th style="border:none !important;" >PEDIDO : {{mb_strtoupper($product_order->id)}}</th>
    </tr>
    </thead>
</table>
<br/>
<br/>

{{--<table id="customers" width="100%">--}}

{{--    <thead>--}}
{{--    <tr>--}}
{{--        <th><small><small><small>CÓDIGO FORNECEDOR</small></small></small></th>--}}
{{--        <th><small><small><small>IMG </small></small></small></th>--}}
{{--        <th><small><small><small>NOME</small></small></small></th>--}}
{{--        <th><small><small><small>DESC</small></small></small></th>--}}
{{--        <th><small><small><small>OURO</small></small></small></th>--}}
{{--        <th><small><small><small>OBS</small></small></small></th>--}}
{{--        <th><small><small><small>EXTRA</small></small></small></th>--}}
{{--    </tr>--}}
{{--    </thead>--}}
{{--    <tbody>--}}


{{--    @foreach($product_order->items as $item)--}}

{{--        <tr>--}}
{{--            <td><small><small>{{(isset($item->configuracao)?$item->codigo_fabricante:'')}}</small></small></td>--}}
{{--            <td><small><small>codigo_fabricante</small></small></td>--}}
{{--            <td><small><small>imagem</small></small></td>--}}
{{--            <td >--}}
{{--                @if(isset($item->configuracao))--}}
{{--                @if(count($item->configuracao->images)>0)--}}
{{--                    <img class="img-thumbnail" src="{{url('storage/images/'.$item->configuracao->images->first()->id.'.'.$item->configuracao->images->first()->extension)}}?t=234234234234" alt=""  width="60px"/>--}}
{{--                @else--}}
{{--                        <small><small><small>  - </small></small></small>--}}
{{--                @endif--}}
{{--                @endif--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                <p>--}}
{{--                    <small><small><small>--}}
{{--                        {{$item->name}}--}}
{{--                    </small></small></small>--}}
{{--                </p>--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                <p>--}}
{{--                    <small><small><small>--}}
{{--                    {{$item->description}}--}}
{{--                    </small></small></small>--}}
{{--                </p>--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                <p>--}}
{{--                    <small><small><small>--}}
{{--                               ouro--}}
{{--                            </small></small></small>--}}
{{--                </p>--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                <p class="text-uppercase">--}}
{{--                <small><small><small>--}}
{{--                {{$item->obs}}--}}
{{--                </small></small></small>--}}
{{--                </p>--}}
{{--            </td>--}}
{{--            <td>--}}
{{--                @if($item->aro != NULL)--}}
{{--                <p><small><small>Aro:  {{$item->aro}} </small></small></p>--}}
{{--                @else--}}
{{--                    ---}}
{{--                @endif--}}
{{--            </td>--}}
{{--        </tr>--}}
{{--    @endforeach--}}
{{--    </tbody>--}}
{{--</table>--}}

{{--<br/>--}}
{{--<br/>--}}
{{--<div style=" page-break-before: always;"></div>--}}
<p> RESUMO</p>

<table id="customers" width="100%">

    <thead>
    <tr>
        <th><small><small><small>IMG </small></small></small></th>
        <th><small><small><small>NOME</small></small></small></th>
        <th><small><small><small>PESO</small></small></small></th>
        <th><small><small><small>QUANTIDADE</small></small></small></th>
    </tr>
    </thead>
    <tbody>

    @php
        $groupeds = $product_order->items->unique('component_id');
    @endphp

    @foreach($groupeds as $item)
        <tr>
{{--            <td >--}}
{{--                @if(count($item->images)>0)--}}
{{--                    <img class="img-thumbnail" src="{{url('storage/images/'.$item->images->first()->id.'.'.$item->criacao->images->first()->extension)}}?t=234234234234" alt=""  width="60px"/>--}}
{{--                @else--}}
{{--                    <small><small><small>  - </small></small></small>--}}
{{--                @endif--}}
{{--            </td>--}}
            <td>Images</td>
            <td>
                <p> <small><small><small>
                                {{$item->component->name}}
                            </small></small></small></p>
            </td>
            <td>
                <p><small><small> {{(isset($item->component)?$item->peso_fino * $product_order->items->where('component_id',$item->id)->count():'')}}</small> </small></p>
            </td>
            <td>
                <p><small><small>{{$product_order->items->where('component_id',$item->component->id)->count()}}</small> </small></p>
            </td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
    <tr>
        <td colspan="10"><p style="text-align: right;" >Peso estimado de ouro: {{$peso}}</p></td>
    </tr>
    </tfoot>
</table>

</body>
</html>
