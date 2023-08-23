import { Suscripciones } from "./suscripciones";
import { UsuariosGrupos } from "./usuarios-grupos";
import { UsuariosPermisos } from "./usuarios-permisos";

export interface Usuarios {
    usuarioId: number; // bigint
    nombre: string; // character varying(60)
    password: string | null; // character varying(255)
    email: string | null; // character varying(255)
    tipo: string | null; // character(3)
    estado: string | null; // character(1)

    // fkSesiones: Sesiones[];
    fkSuscripciones: Suscripciones[];
    fkGrupos: UsuariosGrupos[];
    fkPermisos: UsuariosPermisos[];

    // Helpers
    confirmarPassword: string;
}
