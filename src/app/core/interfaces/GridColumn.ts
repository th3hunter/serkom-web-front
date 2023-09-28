import { ComponentType } from '@angular/cdk/portal';
import { GridFilters } from './GridFilters';
import { OperatorType } from './Parameter';

export enum GridControlType {
    INPUT = 'input',
    PASSWORD = 'password',
    PROMPT = 'prompt',
    COMBOBOX = 'combobox',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datepicker',
    FILTEREDCOMBOBOX = 'filteredcombobox',
    AUTOCOMPLETE = 'autocomplete',
    TEXTAREA = 'textarea',
    LABEL = 'label',
    SEARCH = 'search',
    EMAIL = 'email',
    TOGGLEGROUP = 'togglegroup',
    READONLYPROMPT = 'readonlyprompt',
    BUTTON = 'button',
}

export enum GridDataType {
    STRING = 'string',
    INTEGER = 'integer',
    DECIMAL = 'decimal',
    BOOLEAN = 'boolean',
    DATE = 'date',
    DATETIME = 'datetime',
    TIME = 'time',
    IMAGE = 'image',
    MENU = 'menu',
}

export interface GridColumn {
    /**
     * Id de la columna
     */
    id: string;
    /**
     * Descripción de la columna
     */
    description: string;
    /**
     * Es llave primaria?
     */
    primaryKey?: boolean;
    /**
     * Esta columna no debe mostrarse
     */
    hidden?: boolean;
    /**
     * Esta columna está deshabilitada
     */
    disabled?: boolean;
    /**
     * Tipo de datos *GridDataType* de la columna
     */
    dataType?: GridDataType;
    /**
     * Tipo de control *GridControlType* de la columna
     */
    controlType?: GridControlType;
    default?: any;
    comboBox?: {
        restURL?: string;
        filters?: GridFilters;
        idField?: string;
        descriptionField?: string;
        staticList?: StaticList[];
    };
    /**
     * Para columnas tipo *Prompt*, define su comportamiento
     */
    prompt?: {
        /**
         * El componente a abrir al hacer Prompt
         */
        component: ComponentType<{}>;
        /**
         * La data a pasarse al componente
         */
        data?: any;
        /**
         * Callback que se ejecuta cuando se cierra el Prompt
         */
        onClose: (selectedRow: any, currentRow: any ) => void;
    };
    input?: {
        onIsValid: (row: any) => void;
    };
    /**
     * Prefijo para adjuntar al inicio del contenido de la columna. Ejemplo: Signo dolar ($).
     */
    prefix?: string;
    /**
     * Sufijo para adjuntar al final del contenido de la columna. Ejemplo: Metros (mts).
     */
    suffix?: string;
    /**
     * El operador a ejecutar cuando se envíe este filtro al API
     */
    operator?: OperatorType;
    /**
     * Longitud máxima de la columna. Si excede, se agregarán puntos suspensivos al final (...)
     */
    maxLenght?: number;
    /**
     * Callback para definir el *style* de una columna tipo Imagen
     */
    imageStyle?: (element: any, column?: GridColumn) => string;
    /**
     * Función que se llamará para manipular el string a mostrar
     */
    transform?: (row: any) => string;
    /**
     * Callback para definir el icono de una columna tipo Imagen
     */
    icon?: (element: any, column?: GridColumn) => string;
    /**
     * Contiene los atributos para mostrar un botón como columna
     */
    button?: {
        /**
         * El Material Icon a mostrar
         */
        icon: string;
        /**
         * Evento para ejecutar al hacer click en el botón
         */
        onClick?: (element: any) => void;
    };
}

export interface StaticList {
    id: string | number;
    description: string;
}
