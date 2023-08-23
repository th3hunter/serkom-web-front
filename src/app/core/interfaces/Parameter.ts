/**
 * Interface para implementar envíio de parámetros al API para filtrar listados
 */
export interface Parameter {
    /**
     * Nombre del parámetro
     */
    name: string;
    /**
     * Valor del parámetro
     */
    value?: string | number | Date | boolean;
    /**
     * Valor final para un rango. Ejemplo: Fecha desde - hasta.
     */
    valueTo?: string | number | Date;
    /**
     * Rango de valores . Usado para el Operador IN.
     */
    valueRange?: any[];
    /**
     * Tipo de datos *DataType* del parámetro
     */
    dataType?: DataType;
    /**
     * Operador para ejecutar el filtrado
     */
    operator?: OperatorType;
    /**
     * Indica si debe incluirse este parámetro en los filtros automáticos, o se lo hará de forma manual en el API.
     */
    includeInAutomaticFilter?: boolean;
    /**
     * Indica si en el servidor de Base de Datos debe transformarse el string a minúsculas
     */
    lowerCaseOnServer?: boolean;
}

/**
 * Tipo de datos de los parámetros a enviar
 */
export enum DataType {
    STRING,
    NUMBER,
    DATE,
    BOOL
}

/**
 * Operadores para ejecutar el filtrado
 */
export enum OperatorType
{
    EQUAL,
    NOT_EQUAL,
    GREATER_THAN,
    GREATER_OR_EQUAL_THAN,
    LESS_THAN,
    LESS_OR_EQUAL_THAN,
    LIKE,
    BETWEEN,
    FULLTEXTSEARCH,
    IN
}
