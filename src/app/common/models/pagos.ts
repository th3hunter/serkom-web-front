import { Suscripciones } from "./suscripciones";

export interface Pagos {
    pagoId: number; // bigint
    suscripcionId: number; // bigint
    fechaHora: Date | string; // timestamp (6) without time zone
    valor: number; // numeric(7,2)
    estado: string; // character varying(20)

    suscripcion: Suscripciones;
}
