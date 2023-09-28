import { Empresas } from "./empresas";
import { Productos } from "./productos";

export interface EmpresasPrd {
    empresaId: number; // bigint
    detalleId: number; // integer
    productoId: number; // integer
    precio: number;
    cantidad: number;
    vigenteHasta?: Date | string;

    fkProducto?: Productos;
    fkEmpresa?: Empresas;
}
