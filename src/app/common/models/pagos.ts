import { Facturas } from "./facturas";
import { Suscripciones } from "./suscripciones";

export interface Pagos {
    pagoId: number; // bigint
    suscripcionId: number; // bigint
    facturaId: number;
    fecha: Date | string;
    fechaHora: Date | string; // timestamp (6) without time zone
    valor: number; // numeric(7,2)
    estado: string; // character varying(20)

    fkSuscripcion: Suscripciones;
    fkFactura: Facturas;
}
