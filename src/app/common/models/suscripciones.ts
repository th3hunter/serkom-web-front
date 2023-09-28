import { Empresas } from "./empresas";
import { Pagos } from "./pagos";
import { Usuarios } from "./usuarios";

export interface Suscripciones {
    suscripcionId: number;
    usuarioTitularId: number;
    fechaIngreso: Date | string;
    fechaProximoPago: Date | string;
    valorProximoPago: number;
    codigoValidacion: number;
    uid: string;
    estado: string;

    fkEmpresas: Empresas[];
    fkPagos: Pagos[];
    fkUsuario: Usuarios;
}
