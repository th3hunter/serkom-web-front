export enum TipoUsuario {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN',
}

export enum EstadoSuscripcion {
    POR_ACTIVAR_CUENTA = 'POR_ACTIVAR_CUENTA',
    POR_CONFIRMAR_PAGO = 'POR_CONFIRMAR_PAGO',
    VIGENTE = 'VIGENTE',
    PAUSADA = 'PAUSADA',
    EN_MORA = 'EN_MORA',
    ANULADA = 'ANULADA',
}

export enum TipoNotificacion {
    TEXTO = 'TEXTO',
    TAREA = 'TAREA',
}

export enum EstadoEmpresa {
    ACTIVA = 'ACTIVA',
    INICIALIZANDO = 'INICIALIZANDO',
    ANULADA = 'ANULADA',
}

export enum AccionNotificacion {
    DESCARGAR_ARCHIVO = 'DESCARGAR_ARCHIVO',
    REDIRIGIR_URL = 'REDIRIGIR_URL',
}

export enum FileContentType {
    EXCEL = 'EXCEL',
}

export enum FileExtension {
    EXCEL = 'EXCEL',
}

export enum TipoDatoConfiguracion {
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    DECIMAL = 'DECIMAL',
    DATE = 'DATE',
    BOOLEAN = 'BOOLEAN',
    HTML = 'HTML',
    IMAGE = 'IMAGE',
    FILE = 'FILE',
    LIST = 'LIST',
    CUENTA_CONTABLE = 'CUENTA_CONTABLE',
}

export enum TipoCalculoImpuesto {
    FIJO = 'FIJO',
    POR_LINEA = 'POR_LINEA',
    SUBTOTAL = 'SUBTOTAL',
    DESCUENTO = 'DESCUENTO',
    TOTAL = 'TOTAL',
}
