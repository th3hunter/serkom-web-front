import { Permisos } from "./permisos";
import { UsuariosGrupos } from "./usuarios-grupos";

export interface GruposUsuarioPermisos {
    grupoUsuarioId: number; // integer
    permisoId: number; // integer
    permitirDenegar: boolean; // boolean

    fkPermisos: Permisos[];
    fkUsuarios: UsuariosGrupos[];
}
