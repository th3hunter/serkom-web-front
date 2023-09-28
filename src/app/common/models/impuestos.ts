import { TiposImpuesto } from "./tipos-impuesto";

export interface Impuestos {
    impuestoId: number; // integer
    codigo: string; // character varying(10)
    nombre: string; // character varying(60)
    porcentaje: number; // character(1)
    tipoCalculo: string; // character(1)
    paraVentas: boolean; // character(1)
    paraCompras: boolean; // character(1)
    cuentaContableUid: string; // character(1)
    codigoSri: string; // character(1)
    codigoPorcentajeSri: string; // character(1)
    tipoImpuestoId: number; // character(1)
    estado: string; // character(1)

    fkTipoImpuesto: TiposImpuesto;
}
