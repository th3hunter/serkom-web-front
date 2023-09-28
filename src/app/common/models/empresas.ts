import { EmpresasPrd } from "./empresas-prd";
import { Instancias } from "./instancias";
import { Suscripciones } from "./suscripciones";

export interface Empresas {
    empresaId: number; // bigint
    suscripcionId: number; // bigint
    nombre: string; // character varying(255)
    razonSocial: string; // character varying(255)
    ruc: string; // character varying(13)
    direccion: string; // character varying(255)
    telefonos: string; // character varying(30)
    instanciaId: number | null; // integer
    estado: string; // character varying(20)
    costoTotal: number;

    fkSuscripcion: Suscripciones;
    fkProductos: EmpresasPrd[];
    fkInstancia: Instancias;
}
