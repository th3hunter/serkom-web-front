import { Empresas } from "./empresas";

export interface Instancias {
    instanciaId: number;
    nombre: string;
    rutaServidor: string;
    estado: string;

    fkEmpresas: Empresas[];
}
