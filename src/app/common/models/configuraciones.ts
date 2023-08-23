import { TiposConfiguracion } from "./tipos-configuracion";

export interface Configuraciones  {
    tipoConfiguracionId: string;
    configuracionId: string;
    descripcion?: string;
    valor?: string;
    tipoDato?: string;
    lista?: string;
    listaId?: string;
    listaDescripcion?: string;

    fkTipoConfiguracion?: TiposConfiguracion;

    // Helpers
    items?: any[];
}
