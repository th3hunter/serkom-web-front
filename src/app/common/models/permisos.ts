import { GruposUsuarioPermisos } from "./grupos-usuario-permisos";
import { UsuariosPermisos } from "./usuarios-permisos";

export interface Permisos {
    permisoId: number; // integer
    descripcion: string; // character varying(255)
    estado: string; // character(1)
    ruta: string; // character varying(255)

    fkPermisos: GruposUsuarioPermisos[];
    fkUsuarios: UsuariosPermisos[];
}
