import React from 'react';

export default function PointOfSale({pos}) {

    function pos_name(pos){
        switch (pos) {
            case 2:
                return <span>On-line</span>
            case 3:
                return <span>Eventos</span>
            case 4:
                return <span>Shopping Vitória</span>
            case 5:
                return <span>Curitiba</span>
            case 6:
                return <span>São Paulo</span>
            case 7:
                return <span>Campos</span>
            case 8:
                return <span>BH</span>
            case 9:
                return <span>LOOL</span>
            case 13:
                return <span>Praia do Canto</span>
            case 14:
                return <span>Casa Cor Rio</span>
            default:
                return <span>Consultar T.I.</span>
        }
    }
    return (
        <>
            {pos_name(pos)}
        </>
 );


}

