import { GruposUsuarioPermisos } from "./grupos-usuario-permisos";
import { UsuariosGrupos } from "./usuarios-grupos";

export interface GruposUsuario {
    grupoUsuarioId: number; // integer
    nombre: string; // character varying(60)
    codigo: string; // character varying(10)
    estado: string; // character(1)

    fkPermisos: GruposUsuarioPermisos[];
    fkUsuarios: UsuariosGrupos[];
}
