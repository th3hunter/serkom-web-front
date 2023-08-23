import { Productos } from "./productos";
import { Suscripciones } from "./suscripciones";

export interface SuscripcionesProd {
    suscripcionId: number; // bigint
    detalleId: number; // integer
    productoId: number; // integer

    fkProducto?: Productos;
    fkSuscripcion?: Suscripciones;
}
