import { Productos } from "../models/productos";
import { Suscripciones } from "../models/suscripciones";

export interface ConfirmarPagoContainer {
    suscripcion: Suscripciones;
    planes: Productos[];
}
