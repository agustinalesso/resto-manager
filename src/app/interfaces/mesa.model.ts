export interface MesaModel {
    id? : string;
    numero : number;
    nombre : string;
    activa : boolean;
    ocupada?: boolean;
    cantidadComensales?: number;
    pedidosSinEntregar?: number;
    pedidoactivo?: any[];
    pedidosCobrados?: any[];
    pedirCuenta?: boolean;
}