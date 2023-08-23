export interface Productos {
    productoId: number; // numeric(7,0)
    codigo: string; // character varying(30)
    nombre: string; // character varying(255)
    tipoProductoId: number; // integer
    pvp: number; // numeric(7,2)
    estado: string; // character varying(1)
    pagaIva: boolean; // boolean
    esServicio: boolean; // boolean
    costo: number;
    especialidadId: number;
    permiteCambiarPrecio: boolean;
    tipoServicio: string;
    cuentaContableCostoUid: string;
    cuentaContableInventarioUid: string;
    detalle: string;

    // Helpers
    seleccionado: boolean;
}
