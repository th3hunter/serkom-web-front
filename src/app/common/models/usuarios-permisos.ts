import { Permisos } from "./permisos";
import { Usuarios } from "./usuarios";

export interface UsuariosPermisos {
    usuarioId: number; // bigint
    permisoId: number; // integer
    permitirDenegar: boolean | null; // boolean

    fkPermiso: Permisos;
    fkUsuario: Usuarios;
}
