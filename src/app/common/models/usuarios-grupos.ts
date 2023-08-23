import { GruposUsuario } from "./grupos-usuario";
import { Usuarios } from "./usuarios";

export interface UsuariosGrupos {
    usuarioId: number; // bigint
    grupoUsuarioId: number; // integer

    fkGrupoUsuario: GruposUsuario;
    fkUsuario: Usuarios;
}
