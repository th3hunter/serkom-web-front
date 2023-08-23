import { Configuraciones } from "./configuraciones";

export interface TiposConfiguracion {
    tipoConfiguracionId: string
    descripcion: string;
    estado: string;

    fkConfiguraciones?: Configuraciones[];
}
