import { Facturas } from "./facturas";

export interface FacturasImpuesto {
    facturaId: number; // numeric(10,0)
    detalleId: number; // integer
    impuestoId: number; // integer
    porcentaje: number; // numeric(7,2)
    valor: number; // numeric(9,2)
    subtotal: number; // numeric(9,2)

    fkFactura: Facturas;
}
