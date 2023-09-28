import { FacturasDet } from "./facturas-det";
import { FacturasImpuesto } from "./facturas-impuestos";
import { Suscripciones } from "./suscripciones";

export interface Facturas {
    facturaId: number; // bigint
    noDocumento: string; // character varying(20)
    fecha: Date | string; // date
    fechaHora: Date | string; // timestamp (6) without time zone
    fechaVence: Date | string | null; // date
    fechaPago: Date | string | null; // date
    pagada: boolean | null; // boolean
    saldo: number | null; // numeric(9,2)
    total: number; // numeric(9,2)
    estado: string; // character varying(30)
    observacion: string | null; // character varying(1024)
    claveAcceso: string | null; // character varying(49)
    numAutorizacion: string | null; // character varying(120)
    respuestaSri: string | null; // text
    estadoAutorizacionSri: string | null; // character varying(30)
    fechaHoraAutorizacion: Date | string | null; // timestamp (6) without time zone
    suscripcionId: number; // bigint

    fkSuscripcion: Suscripciones;
    fkDetalle: FacturasDet[];
    fkImpuestos: FacturasImpuesto[];
}
