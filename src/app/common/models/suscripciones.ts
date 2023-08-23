import { Empresas } from "./empresas";
import { Pagos } from "./pagos";
import { SuscripcionesProd } from "./suscripciones-prod";
import { Usuarios } from "./usuarios";

export interface Suscripciones {
    suscripcionId: number;
    usuarioTitularId: number;
    fechaIngreso: Date | string;
    codigoValidacion: number;
    uid: string;
    estado: string;

    fkEmpresas: Empresas[];
    fkPagos: Pagos[];
    fkProductos: SuscripcionesProd[];
    fkUsuario: Usuarios;
}
