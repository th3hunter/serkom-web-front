import { Facturas } from "./facturas";

export interface FacturasDet {
    facturaId: number; // numeric(10,0)
    detalleId: number; // integer
    productoId: number; // numeric(7,0)
    precio: number; // numeric(9,2)
    cantidad: number; // numeric(7,2)
    descuentoPct: number | null; // numeric(5,2)
    descuentoFijo: number | null; // numeric(9,2)
    importe: number; // numeric(9,2)
    fechaFactura: Date | string | null; // date

    fkFactura: Facturas;
}
