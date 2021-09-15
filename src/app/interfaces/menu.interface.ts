import { ArchivoModel } from "../models/archivo.model";

export interface MenuModel {
    id?: string,
    nombre: string,
    cantPersonas?: number,
    valor?: number,
    disponibilidad: boolean,
    descripcion: string,
    imagenUrl: ArchivoModel[],
    categoria: string
}