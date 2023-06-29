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
            <img width="100" src="https://www.carlabuaiz.co/img/logo.svg" alt="">
        </th>
        <th style="border:none !important;" >{{mb_strtoupper($product_order->manufacturer->id)}}</th>
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
        <th><small><small><small>NOME</small></small></small></th>
        <th><small><small><small>IMG </small></small></small></th>

    </tr>
    </thead>
    <tbody>


    @foreach($groupeds as $item)

        <tr>
            <td><small><small>Código</small></small></td>
            <td>
                <p> <small><small><small>
                                {{$item[0]['product']['name']}}
                                <br/>
                                {{$item[0]['product']['description']}}
                                <br/>
                                {{$item[0]['obs']}}
                            </small></small></small></p>
            </td>
            <td>
                @if(count($item[0]['product']['images']) > 0)
{{--                    <img className="w-14 h-14  flex-shrink-0" width="200px"--}}
{{--                         src={{"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$item[0]['product']['images'][0]['path']}}>--}}

                    @php
                        $dir = "https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$item[0]['product']['images'][0]['path'];

                           $extension = pathinfo(parse_url($dir, PHP_URL_PATH), PATHINFO_EXTENSION);

                           if ($extension == "webp"){
                               ob_start();
                                  $img = imagecreatefromwebp($dir);
                                  imagejpeg( $img, NULL, 100 );
                                  imagedestroy( $img );
                                  $i = ob_get_clean();

                             echo "<img width='200px' className='w-14 h-14 flex-shrink-0' src='data:image/jpeg;base64," . base64_encode( $i )."'>";

                           }else{

                               $url ="https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/".$item[0]['product']['images'][0]['path'];
                               echo "<img className='w-14 h-14  flex-shrink-0' width='200px' src=$url>";
                           }
                    @endphp
                @else
                    SEM FOTO
                @endif
            </td>
        </tr>
    @endforeach
    </tbody>
</table>

</body>
</html>
